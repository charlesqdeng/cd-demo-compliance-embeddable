require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Trusthub API base URL
const TRUSTHUB_BASE_URL = 'https://trusthub.twilio.com/v1';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const isvNotificationEmail = process.env.ISV_NOTIFICATION_EMAIL;
const client = twilio(accountSid, authToken);

// Store active inquiry sessions (in production, use Redis or database)
const inquirySessions = new Map();

// Initialize Compliance Embeddable for Toll-Free Verification
app.post('/api/embeddable/initialize', async (req, res) => {
    try {
        const { tollfreePhoneNumber, customerEmail } = req.body;

        console.log('Initializing embeddable for TFN:', tollfreePhoneNumber);

        // Validate toll-free number format - must be exactly one number
        if (!tollfreePhoneNumber ||
            tollfreePhoneNumber.includes(',') ||
            tollfreePhoneNumber.includes(';') ||
            tollfreePhoneNumber.trim().includes(' ')) {
            return res.status(400).json({
                success: false,
                message: 'Please enter only ONE toll-free number. Submit each number separately.'
            });
        }

        if (!tollfreePhoneNumber.match(/^\+1(800|888|877|866|855|844)\d{7}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid toll-free number. Must be in E.164 format and start with +1800, +1888, +1877, +1866, +1855, or +1844'
            });
        }

        // Initialize the inquiry via Twilio TrustHub API
        const initResponse = await client.request({
            method: 'POST',
            uri: `${TRUSTHUB_BASE_URL}/ComplianceInquiries/Tollfree/Initialize`,
            data: {
                TollfreePhoneNumber: tollfreePhoneNumber,
                NotificationEmail: isvNotificationEmail || customerEmail || '',
            }
        });

        const { inquiry_id, inquiry_session_token, registration_id } = initResponse;

        // Store session info
        inquirySessions.set(inquiry_id, {
            tollfreePhoneNumber,
            customerEmail: customerEmail || '',
            registrationId: registration_id,
            createdAt: new Date(),
        });

        console.log('Embeddable initialized:', inquiry_id);

        res.json({
            success: true,
            inquiryId: inquiry_id,
            sessionToken: inquiry_session_token,
            registrationId: registration_id,
            tollfreePhoneNumber: tollfreePhoneNumber
        });

    } catch (error) {
        console.error('Error initializing embeddable:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            status: error.status,
            moreInfo: error.moreInfo
        });
        res.status(500).json({
            success: false,
            error: error.message,
            code: error.code,
            message: 'Failed to initialize verification form. Please check server logs for details.'
        });
    }
});

// Resume an existing inquiry session
app.post('/api/embeddable/resume', async (req, res) => {
    try {
        const { inquiryId } = req.body;

        if (!inquirySessions.has(inquiryId)) {
            return res.status(404).json({
                success: false,
                message: 'Inquiry session not found'
            });
        }

        const session = inquirySessions.get(inquiryId);

        // Re-initialize to get a fresh token
        const initResponse = await client.request({
            method: 'POST',
            uri: `${TRUSTHUB_BASE_URL}/ComplianceInquiries/Tollfree/Initialize`,
            data: {
                TollfreePhoneNumber: session.tollfreePhoneNumber,
                NotificationEmail: isvNotificationEmail || session.customerEmail,
                InquiryId: inquiryId
            }
        });

        res.json({
            success: true,
            inquiryId: inquiryId,
            sessionToken: initResponse.inquiry_session_token,
            tollfreePhoneNumber: session.tollfreePhoneNumber
        });

    } catch (error) {
        console.error('Error resuming inquiry:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to resume verification session.'
        });
    }
});

// Webhook endpoint for inquiry status updates (optional)
app.post('/api/embeddable/webhook', async (req, res) => {
    try {
        console.log('Webhook received:', req.body);
        // Handle inquiry status updates here
        // You can notify customers, update database, etc.
        res.sendStatus(200);
    } catch (error) {
        console.error('Webhook error:', error);
        res.sendStatus(500);
    }
});

// Legacy direct API submission endpoint (keeping for reference)
app.post('/api/verification/submit', async (req, res) => {
    try {
        const {
            tollfreePhoneNumber,
            businessName,
            businessWebsite,
            businessType,
            businessRegistrationNumber,
            businessRegistrationAuthority,
            privacyPolicyUrl,
            termsOfServiceUrl,
            businessAddress,
            businessContactFirstName,
            businessContactLastName,
            businessContactEmail,
            businessContactPhone,
            useCase,
            useCaseDescription,
            messageVolume,
            optInType,
            optInWorkflow,
            optInImageUrls,
            messageContent,
            hasLinks,
            linkExamples,
            helpMessage,
            helpKeywords,
            stopMessage,
            stopKeywords,
            ageGated,
            additionalInformation
        } = req.body;

        console.log('Received verification request for TFN:', tollfreePhoneNumber, '- Business:', businessName);

        // Step 1: Create a Customer Profile (Primary Profile)
        let primaryProfileSid;
        try {
            const customerProfile = await client.trusthub.v1.customerProfiles.create({
                friendlyName: `${businessName} - TFN Verification`,
                email: businessContactEmail,
                policySid: 'RNb0d4771c2c98518d0d16886c50c3c114', // Secondary Customer Profile policy
                statusCallback: isvNotificationEmail ? `mailto:${isvNotificationEmail}` : undefined
            });

            primaryProfileSid = customerProfile.sid;
            console.log('Created Customer Profile:', primaryProfileSid);

            // Step 2: Create End User resource with business information
            const endUser = await client.trusthub.v1.endUsers.create({
                friendlyName: businessName,
                type: 'customer_profile_business_information',
                attributes: {
                    business_name: businessName,
                    business_type: businessType,
                    business_registration_number: businessRegistrationNumber || '',
                    business_registration_authority: businessRegistrationAuthority || '',
                    website_url: businessWebsite,
                    social_media_profile_urls: [privacyPolicyUrl, termsOfServiceUrl],
                    business_regions_of_operation: 'US',
                    business_industry: 'Technology' // You may want to make this a form field
                }
            });
            console.log('Created End User:', endUser.sid);

            // Step 3: Create Address resource
            const address = await client.trusthub.v1.addresses.create({
                friendlyName: `${businessName} Address`,
                customerName: businessName,
                street: businessAddress.street,
                city: businessAddress.city,
                region: businessAddress.state,
                postalCode: businessAddress.postalCode,
                isoCountry: businessAddress.country || 'US'
            });
            console.log('Created Address:', address.sid);

            // Step 4: Assign End User and Address to Customer Profile
            await client.trusthub.v1.customerProfiles(primaryProfileSid)
                .customerProfilesEntityAssignments
                .create({ objectSid: endUser.sid });
            console.log('Assigned End User to Profile');

            await client.trusthub.v1.customerProfiles(primaryProfileSid)
                .customerProfilesEntityAssignments
                .create({ objectSid: address.sid });
            console.log('Assigned Address to Profile');

            // Step 5: Submit the profile for review
            await client.trusthub.v1.customerProfiles(primaryProfileSid)
                .update({ status: 'pending-review' });
            console.log('Submitted Customer Profile for review');

        } catch (profileError) {
            console.error('Error creating customer profile:', profileError);
            return res.status(500).json({
                success: false,
                message: 'Failed to create customer profile. Please check your business information and try again.',
                error: profileError.message
            });
        }

        // Look up the phone number to get its SID
        let phoneNumberSid;
        try {
            const phoneNumbers = await client.incomingPhoneNumbers.list({
                phoneNumber: tollfreePhoneNumber
            });

            if (phoneNumbers.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: `Toll-free number ${tollfreePhoneNumber} not found in your Twilio account. Please purchase it first.`
                });
            }

            phoneNumberSid = phoneNumbers[0].sid;
            console.log('Found phone number SID:', phoneNumberSid);
        } catch (lookupError) {
            console.error('Error looking up phone number:', lookupError);
            return res.status(500).json({
                success: false,
                message: 'Failed to look up phone number. Please verify the number exists in your Twilio account.'
            });
        }

        // Validate toll-free number format - must be exactly one number
        if (!tollfreePhoneNumber ||
            tollfreePhoneNumber.includes(',') ||
            tollfreePhoneNumber.includes(';') ||
            tollfreePhoneNumber.trim().includes(' ')) {
            return res.status(400).json({
                success: false,
                message: 'Please enter only ONE toll-free number. Submit each number separately.'
            });
        }

        if (!tollfreePhoneNumber.match(/^\+1(800|888|877|866|855|844)\d{7}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid toll-free number. Must be in E.164 format and start with +1800, +1888, +1877, +1866, +1855, or +1844'
            });
        }

        // Build additional information string
        let additionalInfo = `Business Type: ${businessType}\n`;
        if (businessRegistrationNumber) {
            additionalInfo += `Registration Number: ${businessRegistrationNumber}\n`;
        }
        if (businessRegistrationAuthority) {
            additionalInfo += `Registration Authority: ${businessRegistrationAuthority}\n`;
        }
        additionalInfo += `Privacy Policy: ${privacyPolicyUrl}\n`;
        additionalInfo += `Terms of Service: ${termsOfServiceUrl}\n`;
        additionalInfo += `\nOpt-In Workflow:\n${optInWorkflow}\n`;
        additionalInfo += `\nHelp Message: ${helpMessage}\n`;
        if (helpKeywords) {
            additionalInfo += `Help Keywords: ${helpKeywords}\n`;
        }
        additionalInfo += `Stop Message: ${stopMessage}\n`;
        if (stopKeywords) {
            additionalInfo += `Stop Keywords: ${stopKeywords}\n`;
        }
        if (hasLinks && linkExamples) {
            additionalInfo += `\nLinks/Phone Numbers in Messages:\n${linkExamples}\n`;
        }
        additionalInfo += `Age-Gated Content: ${ageGated ? 'Yes' : 'No'}\n`;
        if (additionalInformation) {
            additionalInfo += `\nAdditional Notes:\n${additionalInformation}`;
        }

        const tollfreeVerification = await client.messaging.v1.tollfreeVerifications
            .create({
                tollfreePhoneNumberSid: phoneNumberSid,
                primaryProfileSid: primaryProfileSid,
                businessName: businessName,
                businessWebsite: businessWebsite,
                websiteUrl: privacyPolicyUrl,
                businessStreetAddress: businessAddress.street,
                businessStreetAddress2: businessAddress.street2 || '',
                businessCity: businessAddress.city,
                businessStateProvinceRegion: businessAddress.state,
                businessPostalCode: businessAddress.postalCode,
                businessCountry: businessAddress.country || 'US',
                businessContactFirstName: businessContactFirstName,
                businessContactLastName: businessContactLastName,
                businessContactEmail: businessContactEmail,
                businessContactPhone: businessContactPhone,
                notificationEmail: isvNotificationEmail || businessContactEmail,
                useCaseCategories: [useCase], // Must be an array
                useCaseSummary: useCaseDescription,
                productionMessageSample: messageContent,
                optInType: optInType,
                optInImageUrls: Array.isArray(optInImageUrls) && optInImageUrls.length > 0
                    ? optInImageUrls
                    : ['https://placeholder.com/verbal-consent'], // Placeholder for verbal/cases without images
                messageVolume: messageVolume,
                additionalInformation: additionalInfo
            });

        console.log('Verification created:', tollfreeVerification.sid);

        res.json({
            success: true,
            verificationSid: tollfreeVerification.sid,
            status: tollfreeVerification.status,
            message: 'Verification submitted successfully!'
        });

    } catch (error) {
        console.error('Error submitting verification:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to submit verification. Please check your information and try again.'
        });
    }
});

app.get('/api/verification/status/:sid', async (req, res) => {
    try {
        const { sid } = req.params;

        const verification = await client.messaging.v1.tollfreeVerifications(sid)
            .fetch();

        res.json({
            success: true,
            status: verification.status,
            sid: verification.sid,
            businessName: verification.businessName,
            createdAt: verification.dateCreated
        });

    } catch (error) {
        console.error('Error fetching verification status:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        twilioConfigured: !!(accountSid && authToken),
        isvEmailConfigured: !!isvNotificationEmail
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'embeddable.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 CD Demo TFN Verification Portal running on http://localhost:${PORT}`);
    console.log(`📱 Twilio Account SID: ${accountSid ? accountSid.substring(0, 10) + '...' : 'NOT CONFIGURED'}`);
});

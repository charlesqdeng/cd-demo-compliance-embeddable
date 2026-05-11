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

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const isvNotificationEmail = process.env.ISV_NOTIFICATION_EMAIL;
const client = twilio(accountSid, authToken);

app.post('/api/verification/submit', async (req, res) => {
    try {
        const {
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
            optInImageUrls,
            messageContent,
            helpMessage,
            stopMessage,
            ageGated,
            additionalInformation
        } = req.body;

        console.log('Received verification request:', businessName);

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
        additionalInfo += `Help Message: ${helpMessage}\n`;
        additionalInfo += `Stop Message: ${stopMessage}\n`;
        additionalInfo += `Age-Gated Content: ${ageGated ? 'Yes' : 'No'}\n`;
        if (additionalInformation) {
            additionalInfo += `\nAdditional Notes:\n${additionalInformation}`;
        }

        const tollfreeVerification = await client.messaging.v1.tollfreeVerifications
            .create({
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
                useCase: useCase,
                useCaseSummary: useCaseDescription,
                productionMessageSample: messageContent,
                optInType: optInType,
                optInImageUrls: optInImageUrls || [],
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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 CD Demo TFN Verification Portal running on http://localhost:${PORT}`);
    console.log(`📱 Twilio Account SID: ${accountSid ? accountSid.substring(0, 10) + '...' : 'NOT CONFIGURED'}`);
});

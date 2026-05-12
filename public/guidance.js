// Field-by-field guidance for toll-free verification
// Based on Twilio's requirements and best practices

// ⚠️ CRITICAL: ISV vs END-USER BUSINESS INFORMATION
// Toll-Free Verification requires the business information of the END-USER
// (i.e., the business engaging with the customer), NOT the ISV.
//
// ISVs must provide details representing the actual business interacting with
// the opted-in handset. Submissions missing end-user information or using ISV
// details WILL BE REJECTED, except in cases where:
// - The ISV is clearly the sole message content creator, AND
// - The ISV manages opt-in directly
//
// When in doubt: Use the END BUSINESS information that customers recognize!

const FIELD_GUIDANCE = {
    tollfreePhoneNumber: {
        label: 'Toll-Free Phone Number SID',
        required: true,
        example: '+18001234567',
        tips: [
            'Must be in E.164 format (include +1)',
            'Must start with +1800, +1888, +1877, +1866, +1855, or +1844',
            'The number must be purchased in your Twilio account first',
            'Only submit one number at a time',
            'This is Twilio\'s phone number SID - if the number moves accounts, the SID changes and verification no longer applies'
        ],
        commonMistakes: [
            'Forgetting the +1 prefix',
            'Using a number not in your Twilio account',
            'Trying to submit multiple numbers'
        ]
    },

    businessName: {
        label: 'Business Name',
        required: true,
        example: 'John\'s Coffee Shop',
        tips: [
            'Use the END BUSINESS name (the business engaging with customers)',
            'NOT the ISV name unless ISV is the sole content creator',
            'Use official legal business name',
            'Match the name on your business registration',
            'Include legal entity type if part of official name (LLC, Inc., etc.)'
        ],
        commonMistakes: [
            'Using ISV name instead of end-business name',
            'Using a DBA or "doing business as" name instead of legal name',
            'Abbreviations that don\'t match registration',
            'Using "N/A"'
        ],
        goodExamples: [
            '✅ John\'s Coffee Shop',
            '✅ Acme Healthcare LLC'
        ],
        badExamples: [
            '❌ [ISV Name] (unless ISV is sole content creator)',
            '❌ N/A'
        ]
    },

    businessType: {
        label: 'Business Type',
        required: true,
        options: {
            'PRIVATE_PROFIT': 'Private for-profit company',
            'PUBLIC_PROFIT': 'Publicly traded company',
            'NON_PROFIT': 'Non-profit organization',
            'SOLE_PROPRIETOR': 'Sole proprietor / Individual',
            'GOVERNMENT': 'Government entity'
        },
        tips: [
            'Select the type that matches your business registration',
            'If unsure, check your formation documents',
            'Sole proprietors don\'t need registration numbers'
        ]
    },

    businessRegistrationNumber: {
        label: 'Business Registration Number',
        required: 'Except for Sole Proprietor',
        example: '12-3456789 (EIN)',
        tips: [
            'Use your EIN (Employer Identification Number) for US businesses',
            'Also known as Tax ID or Federal Tax ID',
            'Found on IRS correspondence or formation documents',
            'Format: XX-XXXXXXX (include dashes)'
        ],
        commonMistakes: [
            'Using SSN instead of EIN',
            'Omitting dashes in the number'
        ]
    },

    businessWebsite: {
        label: 'Business Website',
        required: true,
        example: 'https://www.johnscoffeeshop.com',
        tips: [
            'Must include https:// or http://',
            'Website must be live and accessible',
            'Should clearly show your business information',
            'Include contact information and business details',
            'Social media links acceptable if no traditional website (Facebook, Instagram, Twitter)',
            'Social media pages must be set to PUBLIC for review'
        ],
        commonMistakes: [
            'Forgetting https:// prefix',
            'URL not live yet',
            'URL behind login/password',
            'Website showing ISV/aggregator address instead of end-business',
            'Private social media profiles that cannot be reviewed'
        ],
        goodExamples: [
            '✅ https://www.johnscoffeeshop.com',
            '✅ https://facebook.com/johnscoffeeshop (if no traditional website, set to public)'
        ],
        badExamples: [
            '❌ www.johnscoffeeshop.com (missing https://)',
            '❌ URL behind login/password',
            '❌ Website showing ISV address'
        ]
    },

    privacyPolicyUrl: {
        label: 'Privacy Policy URL',
        required: true,
        example: 'https://www.acmecorp.com/privacy',
        tips: [
            'Must be a separate, dedicated privacy policy page',
            'Should mention SMS/text messaging practices',
            'Include data collection and usage policies',
            'Must be publicly accessible'
        ],
        commonMistakes: [
            'Using generic terms of service page',
            'No mention of SMS communications',
            'Page not accessible or requires login'
        ]
    },

    termsOfServiceUrl: {
        label: 'Terms of Service URL',
        required: true,
        example: 'https://www.acmecorp.com/terms',
        tips: [
            'Must include SMS messaging terms',
            'Describe user responsibilities and service limitations',
            'Should be easily accessible from your website'
        ]
    },

    businessAddress: {
        label: 'Business Physical Address',
        required: true,
        example: '123 Main St, Seattle, WA, 98119',
        tips: [
            'Must be a physical address, not a P.O. Box',
            'Use the END BUSINESS address (not ISV address)',
            'Use the address on your business registration',
            'Include street, city, state/province, and postal code',
            'Address should match public business records',
            'This should be the physical location of the business sending messages'
        ],
        commonMistakes: [
            'Using P.O. Box or virtual office',
            'Using ISV address instead of end-business address',
            'Using "N/A"',
            'Residential address for registered business',
            'Incomplete address (missing suite/unit number)'
        ],
        goodExamples: [
            '✅ 123 Main St, Seattle, WA, 98119'
        ],
        badExamples: [
            '❌ N/A',
            '❌ ISV business address'
        ]
    },

    contactFirstName: {
        label: 'Business Contact First Name',
        required: true,
        example: 'Henry',
        tips: [
            'First name of the contact person at the business',
            'This should be a real person who can answer questions',
            'Used for verification purposes only - Twilio will not contact them'
        ]
    },

    contactLastName: {
        label: 'Business Contact Last Name',
        required: true,
        example: 'Saul',
        tips: [
            'Last name of the contact person at the business',
            'Must be a real, reachable contact',
            'Used for verification purposes only'
        ]
    },

    contactEmail: {
        label: 'Business Contact Email',
        required: true,
        example: 'hsaul@smokepiesbbq.com',
        tips: [
            'Use business email (not personal Gmail, Yahoo, etc.)',
            'Should be on the business domain',
            'This contact may be contacted by Twilio for clarification',
            'Used for verification purposes only'
        ],
        commonMistakes: [
            'Using personal email addresses (Gmail, Yahoo, Hotmail)',
            'Using ISV email instead of end-business email'
        ]
    },

    contactPhone: {
        label: 'Business Contact Phone Number',
        required: true,
        example: '+15555555555',
        tips: [
            'Must be in E.164 format (include country code)',
            'Phone number should be reachable',
            'Use format: +1XXXXXXXXXX for US numbers',
            'This is for the end-business contact, not ISV'
        ],
        commonMistakes: [
            'Forgetting the +1 country code',
            'Using non-E.164 format'
        ]
    },

    notificationEmail: {
        label: 'Notification Email (ISV Configuration)',
        required: true,
        example: 'notifications@isv.com',
        tips: [
            'This is configured by the ISV in the .env file',
            'Email address to receive verification result notifications',
            'ISV receives all approval/rejection notifications',
            'Not collected from end-customers',
            'Set ISV_NOTIFICATION_EMAIL in your .env configuration'
        ],
        note: 'This field is for ISV configuration only and should not be displayed to customers in the form'
    },

    useCaseCategory: {
        label: 'Use Case Category',
        required: true,
        examples: {
            'TWO_FACTOR_AUTHENTICATION': 'Login codes, security verification',
            'ACCOUNT_NOTIFICATIONS': 'Account updates, alerts, notifications',
            'CUSTOMER_CARE': 'Support, service updates, confirmations',
            'DELIVERY_NOTIFICATIONS': 'Shipping updates, delivery status',
            'MARKETING': 'Promotional messages, offers (requires explicit opt-in)'
        },
        tips: [
            'Choose the category that best matches your primary use',
            'Be specific - vague descriptions lead to rejection',
            'Marketing messages have stricter requirements',
            'If multiple uses, pick the most frequent one'
        ]
    },

    useCaseDescription: {
        label: 'Use Case Summary / Description',
        required: true,
        example: 'We send order confirmation SMS to customers after they complete a purchase on our e-commerce website. Messages include order number, estimated delivery date, and tracking link.',
        tips: [
            'Explain HOW messaging is used on this toll-free number',
            'Explain WHO receives messages (customers, employees, etc.)',
            'Explain WHEN messages are sent (after purchase, daily, etc.)',
            'Explain WHAT information is included in messages',
            'Be detailed and specific (2-4 sentences minimum)',
            'The more detailed information you provide, the better',
            'Avoid vague descriptions like "for business purposes"'
        ],
        commonMistakes: [
            'Too vague: "Customer notifications"',
            'Too short: "Marketing" - doesn\'t specify what type or what customers receive',
            'Not explaining the customer benefit',
            'Generic descriptions without specifics'
        ],
        goodExamples: [
            '✅ "This number is used to send out promotional offers and coupons to the customers of John\'s Coffee Shop"',
            '✅ "We send appointment reminders to patients 24 hours before their scheduled visit. Messages include doctor name, appointment time, location, and a link to reschedule if needed."',
            '✅ "Customers receive order confirmation immediately after purchase, followed by shipping updates with tracking numbers when items ship. Final delivery notifications are sent when package arrives."',
            '✅ "Two-factor authentication codes for secure login. When users sign in, they receive a 6-digit code valid for 10 minutes to verify their identity."'
        ],
        badExamples: [
            '❌ "Marketing" - too vague, doesn\'t specify type or content',
            '❌ "Send messages to customers" - no detail about what or when',
            '❌ "Business communications" - generic and unhelpful'
        ]
    },

    messageVolume: {
        label: 'Expected Monthly Message Volume',
        required: true,
        options: {
            '10': 'Up to 10 messages/month',
            '100': 'Up to 100 messages/month',
            '1000': 'Up to 1,000 messages/month',
            '10000': 'Up to 10,000 messages/month',
            '100000': 'Up to 100,000 messages/month',
            '250000': 'Up to 250,000 messages/month',
            '500000': 'Up to 500,000 messages/month',
            '750000': 'Up to 750,000 messages/month',
            '1000000': 'Up to 1,000,000 messages/month',
            '5000000': 'Up to 5,000,000 messages/month',
            '10000000+': '10,000,000+ messages/month'
        },
        tips: [
            'Provide realistic estimate based on customer base',
            'Choose the closest value from the available options',
            'If volume will increase, use where you expect to be in 6 months',
            'Underestimating may cause throttling later',
            'Volume affects review priority'
        ],
        commonMistakes: [
            'Using "N/A" instead of selecting a volume tier'
        ]
    },

    messageContent: {
        label: 'Production Message Sample',
        required: true,
        example: 'Your order #12345 has shipped! Track your package: https://track.example.com/12345. Reply STOP to unsubscribe.',
        tips: [
            'Provide PRODUCTION-LEVEL sample messages',
            'Show what the end-user/mobile handset will actually receive',
            'Include variable placeholders (order numbers, names, etc.)',
            'Must include opt-out instructions (STOP, UNSUBSCRIBE)',
            'Sample message MUST MATCH the use case category selected',
            'Keep under 160 characters if possible (single SMS)'
        ],
        commonMistakes: [
            'Generic placeholder text',
            'No opt-out language',
            'Message doesn\'t match the selected use case category',
            'Overly promotional language for non-marketing use'
        ],
        goodExamples: [
            '✅ "Thank you for being a loyal customer of John\'s Coffee Shop. Enjoy 10% off your next purchase. Reply STOP to opt out." (Marketing use case)',
            '✅ "Hi [Name], your appointment with Dr. Smith is tomorrow at 2pm. Reply C to confirm or R to reschedule. Reply STOP to opt out."',
            '✅ "Order #[ORDER_ID] confirmed! Estimated delivery: [DATE]. Track here: [LINK]. Questions? Call 1-800-XXX-XXXX. Reply STOP to unsubscribe."',
            '✅ "Your verification code is [CODE]. Valid for 10 minutes. Never share this code. Reply STOP to opt out."'
        ],
        badExamples: [
            '❌ "Your appointment is today at 10:00 AM" (when use case is Marketing - doesn\'t match use case)'
        ]
    },

    helpMessage: {
        label: 'HELP Message Response',
        required: true,
        example: 'For support, call 1-800-XXX-XXXX or email support@acmecorp.com. Reply STOP to unsubscribe.',
        tips: [
            'Provide clear contact information',
            'Include phone number and/or email',
            'Keep under 160 characters',
            'Include STOP instructions'
        ]
    },

    stopMessage: {
        label: 'STOP Message Response',
        required: true,
        example: 'You have been unsubscribed from Acme Corp messages. You will not receive further texts. Reply START to resubscribe.',
        tips: [
            'Confirm unsubscription clearly',
            'Optional: Mention how to re-subscribe',
            'Keep brief and clear',
            'Must honor STOP immediately'
        ]
    },

    optInType: {
        label: 'Opt-In Method',
        required: true,
        options: {
            'WEB_FORM': 'Checkbox on website form - User checks box to consent',
            'VERBAL': 'Spoken consent (phone or in-person) - IVR or spoken confirmation',
            'PAPER_FORM': 'Physical form with signature - In-store or mailed forms',
            'VIA_TEXT': 'Text message keyword campaign (e.g., "Text JOIN to 12345")',
            'MOBILE_QR_CODE': 'Scan QR code to opt-in - Links to form or pre-fills message'
        },
        tips: [
            'Must have EXPRESS WRITTEN CONSENT before sending messages (TCPA requirement)',
            'Opt-in must be obvious and separate from other agreements',
            'For marketing: end-user must positively affirm enrollment',
            'Cannot be pre-checked boxes',
            'Opt-in must be appropriate for your use case category',
            'Keep records of opt-ins',
            'IMPORTANT: OptInImageURLs must demonstrate the OptInType chosen'
        ],
        requirements: {
            'VERBAL': 'Must provide sample verbal consent collection script in OptInImageURLs document',
            'WEB_FORM': 'Must provide link to opt-in page in OptInImageURLs. Checkbox must be user-selectable, NOT pre-checked',
            'PAPER_FORM': 'Must provide the form in OptInImageURLs document',
            'VIA_TEXT': 'Must describe keyword campaign details in OptInImageURLs document',
            'MOBILE_QR_CODE': 'Must provide QR Code image in OptInImageURLs document'
        }
    },

    optInWorkflow: {
        label: 'Opt-In Process Description / Workflow',
        required: true,
        example: 'During checkout, customers check a box labeled "Send me SMS updates about my order" and click "Complete Purchase". The checkbox is unchecked by default.',
        tips: [
            'Briefly describe HOW the consumer/subscriber opts into receiving messages',
            'Describe step-by-step how customers consent',
            'Mention checkbox/button text exactly as customers see it',
            'Explain when opt-in occurs (checkout, signup, etc.)',
            'Clarify opt-in is not pre-checked',
            'Be as detailed as possible - the more detail the better',
            'For VIA_TEXT: Describe where keyword is found, what happens after texting it',
            'For VERBAL: Provide complete IVR script or spoken consent process'
        ],
        commonMistakes: [
            'Too vague on process details',
            'Not explaining where/when opt-in occurs',
            'Missing exact wording of consent language'
        ],
        goodExamples: [
            '✅ "On our signup page, users check an empty checkbox labeled \'I agree to receive SMS notifications about my account\' before clicking \'Create Account\'."',
            '✅ "Customers call our hotline and verbally confirm they want to receive text alerts by saying \'Yes\' when asked by our representative."',
            '✅ "Users text JOIN to our short code 12345. They receive a confirmation message asking them to reply YES to complete opt-in."',
            '✅ "Keyword: Coffee. The keyword is found on a sign at the register of John\'s Coffee Shop where customers can see the keyword and text in to the Toll-Free Number. Once the customer texts the keyword, they are provided a double opt in where they are asked to Reply Y to confirm they would like to receive promotional SMS"'
        ]
    },

    optInImageUrls: {
        label: 'Opt-In Image URLs',
        required: 'Required (except for some Verbal scenarios)',
        example: 'https://example.com/screenshots/checkout-opt-in.png',
        tips: [
            'Can be: link to web form, hosted screenshot, or hosted document',
            'Must demonstrate the Opt-In Type you selected',
            'Images/URLs must be publicly accessible (no login/password)',
            'Show the actual checkbox/button customers see',
            'Include surrounding context for clarity',
            'Multiple URLs okay (signup, confirmation, etc.)',
            'For VERBAL: Upload document with IVR script or consent process',
            'For WEB_FORM: Direct link to opt-in page OR screenshot of the page',
            'For PAPER_FORM: Scanned copy of physical form',
            'For VIA_TEXT: Document describing keyword campaign with screenshots',
            'For MOBILE_QR_CODE: Document or image containing the QR code'
        ],
        commonMistakes: [
            'URLs not publicly accessible (behind login/password)',
            'Links to secured Google Drives or non-public websites',
            'Generic mockups instead of actual implementation',
            'Missing clear opt-in language in screenshot',
            'Homepage URL instead of specific opt-in page',
            'URLs that don\'t resolve or are broken'
        ],
        goodExamples: [
            '✅ http://www.johnscoffeeshop.com/signupforsms (direct URL to opt-in sign-up page)',
            '✅ http://www.johnscoffeeshop.com/image123.png (hosted image showing opt-in)',
            '✅ http://www.johnscoffeeshop.com/document123.docx (hosted document with opt-in process)',
            '✅ Screenshot of SMS opt-in page showing checkbox and text'
        ],
        badExamples: [
            '❌ http://www.johnscoffeeshop.com (homepage only, not specific opt-in)',
            '❌ URLs behind login/password',
            '❌ URLs that don\'t resolve',
            '❌ "Customer receives a text of a point of sale receipt" (too vague, doesn\'t show consent)'
        ],
        verbalExample: 'For VERBAL opt-in, include complete IVR script like: "As part of our service we can send you automated monthly text alerts regarding [SERVICE]. We will send [X] messages per month. Message and data rates may apply. Reply HELP for help or STOP to opt out. Terms at [URL]. Please reply YES or NO to indicate if you would like this service." Customer: "Yes" IVR: "Great! We will send you a text to confirm enrollment."'
    },

    additionalInformation: {
        label: 'Additional Information',
        required: false,
        example: 'https://www.johnscoffeeshop.com/privacypolicy',
        tips: [
            'Optional field for any additional details',
            'Can include: privacy policies, AUPs, onboarding controls',
            'Use to justify multiple numbers with same business name/address',
            'Include links to additional documentation if helpful',
            'Provide context that doesn\'t fit in other fields'
        ],
        goodExamples: [
            '✅ http://www.johnscoffeeshop.com/privacypolicy',
            '✅ "We have 5 locations, each needs a dedicated toll-free number for local marketing"',
            '✅ Link to compliance documentation or additional verification materials'
        ]
    }
};

// Export for use in forms
if (typeof window !== 'undefined') {
    window.FIELD_GUIDANCE = FIELD_GUIDANCE;
}

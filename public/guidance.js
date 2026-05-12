// Field-by-field guidance for toll-free verification
// Based on Twilio's requirements and best practices

const FIELD_GUIDANCE = {
    tollfreePhoneNumber: {
        label: 'Toll-Free Phone Number',
        required: true,
        example: '+18001234567',
        tips: [
            'Must be in E.164 format (include +1)',
            'Must start with +1800, +1888, +1877, +1866, +1855, or +1844',
            'The number must be purchased in your Twilio account first',
            'Only submit one number at a time'
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
        example: 'Acme Corporation',
        tips: [
            'Use your official legal business name',
            'Match the name on your business registration',
            'Include legal entity type if part of official name (LLC, Inc., etc.)'
        ],
        commonMistakes: [
            'Using a DBA or "doing business as" name instead of legal name',
            'Abbreviations that don\'t match registration'
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
        example: 'https://www.acmecorp.com',
        tips: [
            'Must include https:// or http://',
            'Website must be live and accessible',
            'Should clearly show your business information',
            'Include contact information and business details'
        ],
        commonMistakes: [
            'Forgetting https:// prefix',
            'Using a personal social media profile',
            'Website under construction or not accessible'
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
        example: '123 Main Street, San Francisco, CA 94105',
        tips: [
            'Must be a physical address, not a P.O. Box',
            'Use the address on your business registration',
            'Include street, city, state/province, and postal code',
            'Address should match public business records'
        ],
        commonMistakes: [
            'Using P.O. Box or virtual office',
            'Residential address for registered business',
            'Incomplete address (missing suite/unit number)'
        ]
    },

    contactInformation: {
        label: 'Business Contact Information',
        required: true,
        example: 'John Doe, john@acmecorp.com, +14155551234',
        tips: [
            'Provide a real person who can answer questions',
            'Use business email (not personal Gmail, Yahoo, etc.)',
            'Phone number should be reachable',
            'This contact may be contacted by Twilio for clarification'
        ]
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
        label: 'Use Case Description',
        required: true,
        example: 'We send order confirmation SMS to customers after they complete a purchase on our e-commerce website. Messages include order number, estimated delivery date, and tracking link.',
        tips: [
            'Explain WHO receives messages (customers, employees, etc.)',
            'Explain WHEN messages are sent (after purchase, daily, etc.)',
            'Explain WHAT information is included in messages',
            'Be detailed and specific (2-4 sentences minimum)',
            'Avoid vague descriptions like "for business purposes"'
        ],
        commonMistakes: [
            'Too vague: "Customer notifications"',
            'Too short: "Marketing"',
            'Not explaining the customer benefit'
        ],
        goodExamples: [
            '✅ "We send appointment reminders to patients 24 hours before their scheduled visit. Messages include doctor name, appointment time, location, and a link to reschedule if needed."',
            '✅ "Customers receive order confirmation immediately after purchase, followed by shipping updates with tracking numbers when items ship. Final delivery notifications are sent when package arrives."',
            '✅ "Two-factor authentication codes for secure login. When users sign in, they receive a 6-digit code valid for 10 minutes to verify their identity."'
        ],
        badExamples: [
            '❌ "Send messages to customers"',
            '❌ "Business communications"',
            '❌ "Marketing"'
        ]
    },

    messageVolume: {
        label: 'Expected Monthly Message Volume',
        required: true,
        tips: [
            'Provide realistic estimate based on customer base',
            'Consider both current and near-future volume',
            'Underestimating may cause throttling later',
            'Volume affects review priority'
        ]
    },

    messageContent: {
        label: 'Sample Message Content',
        required: true,
        example: 'Your order #12345 has shipped! Track your package: https://track.example.com/12345. Reply STOP to unsubscribe.',
        tips: [
            'Provide realistic example messages',
            'Include variable placeholders (order numbers, names, etc.)',
            'Show actual content customers will receive',
            'Must include opt-out instructions (STOP, UNSUBSCRIBE)',
            'Keep under 160 characters if possible (single SMS)'
        ],
        commonMistakes: [
            'Generic placeholder text',
            'No opt-out language',
            'Overly promotional language for non-marketing use'
        ],
        goodExamples: [
            '✅ "Hi [Name], your appointment with Dr. Smith is tomorrow at 2pm. Reply C to confirm or R to reschedule. Reply STOP to opt out."',
            '✅ "Order #[ORDER_ID] confirmed! Estimated delivery: [DATE]. Track here: [LINK]. Questions? Call 1-800-XXX-XXXX. Reply STOP to unsubscribe."',
            '✅ "Your verification code is [CODE]. Valid for 10 minutes. Never share this code. Reply STOP to opt out."'
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
            'WEB_FORM': 'Checkbox on website form',
            'VERBAL': 'Spoken consent (phone or in-person)',
            'PAPER_FORM': 'Physical form with signature',
            'VIA_TEXT': 'Text message keyword (e.g., "Text JOIN to 12345")',
            'MOBILE_QR_CODE': 'Scan QR code to opt-in'
        },
        tips: [
            'Must have clear consent before sending messages',
            'Opt-in must be obvious and separate from other agreements',
            'Cannot be pre-checked boxes',
            'Keep records of opt-ins'
        ]
    },

    optInWorkflow: {
        label: 'Opt-In Process Description',
        required: true,
        example: 'During checkout, customers check a box labeled "Send me SMS updates about my order" and click "Complete Purchase". The checkbox is unchecked by default.',
        tips: [
            'Describe step-by-step how customers consent',
            'Mention checkbox/button text exactly',
            'Explain when opt-in occurs (checkout, signup, etc.)',
            'Clarify opt-in is not pre-checked'
        ],
        goodExamples: [
            '✅ "On our signup page, users check an empty checkbox labeled \'I agree to receive SMS notifications about my account\' before clicking \'Create Account\'."',
            '✅ "Customers call our hotline and verbally confirm they want to receive text alerts by saying \'Yes\' when asked by our representative."',
            '✅ "Users text JOIN to our short code 12345. They receive a confirmation message asking them to reply YES to complete opt-in."'
        ]
    },

    optInImageUrls: {
        label: 'Opt-In Screenshot URLs',
        required: 'Except for Verbal Consent',
        example: 'https://example.com/screenshots/checkout-opt-in.png',
        tips: [
            'Upload screenshots showing your opt-in process',
            'Images must be publicly accessible URLs',
            'Show the actual checkbox/button customers see',
            'Include surrounding context for clarity',
            'Multiple screenshots okay (signup, confirmation, etc.)'
        ],
        commonMistakes: [
            'Screenshots not publicly accessible',
            'Generic mockups instead of actual implementation',
            'Missing clear opt-in language in screenshot'
        ]
    }
};

// Export for use in forms
if (typeof window !== 'undefined') {
    window.FIELD_GUIDANCE = FIELD_GUIDANCE;
}

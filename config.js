const CONFIG = {
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || 'YOUR_ACCOUNT_SID',
        authToken: process.env.TWILIO_AUTH_TOKEN || 'YOUR_AUTH_TOKEN',
    },

    branding: {
        companyName: 'CD Demo',
        primaryColor: '#0263E0',
        secondaryColor: '#F22F46',
        logo: '/assets/logo.png'
    },

    compliance: {
        productType: 'TOLL_FREE_VERIFICATION',
        requiredFields: [
            'businessName',
            'businessAddress',
            'businessContactEmail',
            'businessContactPhone',
            'useCase',
            'messageContent',
            'optInProcess',
            'optOutProcess'
        ]
    },

    api: {
        baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
        endpoints: {
            submitVerification: '/api/verification/submit',
            checkStatus: '/api/verification/status'
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

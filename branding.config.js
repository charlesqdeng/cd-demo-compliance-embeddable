/**
 * Branding Configuration
 *
 * Customize your portal's appearance and branding here.
 * After making changes, restart the server and hard refresh your browser.
 */

const BRANDING = {
    // Company Information
    companyName: 'CD Demo',
    companyWebsite: 'https://cddemo.com',
    supportEmail: 'support@cddemo.com',

    // Color Scheme
    colors: {
        primary: '#0263E0',        // Main brand color (buttons, links, headers)
        primaryDark: '#014BB8',    // Darker shade for hover states
        secondary: '#F22F46',      // Accent color
        success: '#14B053',        // Success messages
        error: '#D61F1F',          // Error messages
        textDark: '#121C2D',       // Main text color
        textLight: '#606B85',      // Secondary text color
        background: '#F4F4F6',     // Light background
        border: '#E1E3EA',         // Border color
        white: '#FFFFFF'
    },

    // Typography
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen", "Ubuntu", "Cantarell", sans-serif',
        headerFont: 'inherit', // Use same as body, or specify different font
    },

    // Logo
    logo: {
        text: 'CD Demo',           // Text to display (if no image)
        imageUrl: null,            // Path to logo image (e.g., '/assets/logo.png'), or null to use text
        width: '150px',            // Logo width (if using image)
        height: 'auto'             // Logo height (if using image)
    },

    // Page Content
    content: {
        heroTitle: 'Toll Free Number Verification',
        heroSubtitle: 'Submit your verification documents securely and get your toll-free number approved quickly.',

        // Footer
        footerText: '© 2026 CD Demo. All rights reserved.',

        // Help Section
        helpTitle: 'Need Help?',
        helpCards: [
            {
                icon: '📚',
                title: 'Documentation',
                description: 'Learn about toll-free verification requirements and best practices.'
            },
            {
                icon: '💬',
                title: 'Support',
                description: 'Our team is here to help with any questions about the verification process.'
            },
            {
                icon: '⏱️',
                title: 'Status',
                description: 'Track your verification status and get real-time updates via email.'
            }
        ]
    },

    // Navigation
    navigation: [
        { label: 'Home', href: '#home' },
        { label: 'Verify Number', href: '#verify' },
        { label: 'Support', href: '#support' }
    ],

    // Footer Links
    footerLinks: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Contact Us', href: '#contact' }
    ],

    // Success Message
    successMessage: {
        title: 'Verification Submitted Successfully!',
        description: 'Thank you for submitting your toll-free number verification for {tfn}. We\'ll review your information and get back to you shortly.',
        buttonText: 'Submit Another Verification'
    }
};

// Export for Node.js (server-side)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BRANDING;
}

// Export for browser (client-side)
if (typeof window !== 'undefined') {
    window.BRANDING = BRANDING;
}

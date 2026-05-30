# Customization Guide

This guide explains how to customize the branding and appearance of your Toll-Free Verification Portal.

## Quick Customization

All branding can be customized in **one file**: [`branding.config.js`](branding.config.js)

## What You Can Customize

### 1. Company Information

```javascript
companyName: 'CD Demo',              // Your company name
companyWebsite: 'https://cddemo.com', // Your website
supportEmail: 'support@cddemo.com',   // Support email
```

### 2. Color Scheme

Change all colors to match your brand:

```javascript
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
}
```

**Color Examples:**

| Brand | Primary | Secondary |
|-------|---------|-----------|
| Blue Theme | `#0263E0` | `#F22F46` |
| Green Theme | `#10B981` | `#F59E0B` |
| Purple Theme | `#8B5CF6` | `#EC4899` |
| Red Theme | `#EF4444` | `#3B82F6` |

### 3. Logo

Choose between text or image logo:

```javascript
logo: {
    text: 'CD Demo',           // Text to display (if no image)
    imageUrl: null,            // Path to logo image, or null to use text
    width: '150px',            // Logo width (if using image)
    height: 'auto'             // Logo height (if using image)
}
```

**To use an image logo:**
1. Place your logo in `/public/assets/logo.png`
2. Update config:
```javascript
logo: {
    imageUrl: '/assets/logo.png',
    width: '150px',
    height: 'auto'
}
```

### 4. Typography

```javascript
typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    headerFont: 'inherit', // Use different font for headers if desired
}
```

**Popular Font Combinations:**

```javascript
// Modern/Tech
fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

// Professional
fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'

// Friendly
fontFamily: '"Nunito", "Open Sans", Arial, sans-serif'

// Corporate
fontFamily: '"IBM Plex Sans", "Helvetica", Arial, sans-serif'
```

### 5. Page Content

Customize all text on the page:

```javascript
content: {
    heroTitle: 'Toll Free Number Verification',
    heroSubtitle: 'Submit your verification documents securely...',
    footerText: '© 2026 CD Demo. All rights reserved.',
    helpTitle: 'Need Help?',
    // ... and more
}
```

### 6. Navigation & Footer Links

```javascript
navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Verify Number', href: '#verify' },
    { label: 'Support', href: '#support' }
],

footerLinks: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Contact Us', href: '#contact' }
]
```

## How to Apply Changes

### Method 1: Edit branding.config.js (Recommended)

1. Open [`branding.config.js`](branding.config.js)
2. Update the values you want to change
3. Save the file
4. Restart the server:
   ```bash
   npm start
   ```
5. Hard refresh your browser: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+F5** (Windows)

### Method 2: Environment Variables (Advanced)

For deployment environments, you can override branding via environment variables:

```bash
export COMPANY_NAME="My Company"
export PRIMARY_COLOR="#10B981"
```

Then update `branding.config.js` to read from `process.env`.

## Example Customizations

### Example 1: Green Tech Startup

```javascript
const BRANDING = {
    companyName: 'GreenTech Solutions',
    colors: {
        primary: '#10B981',
        primaryDark: '#059669',
        secondary: '#F59E0B',
        // ... rest default
    },
    content: {
        heroTitle: 'Verify Your Green Communications',
        heroSubtitle: 'Sustainable messaging compliance made easy.',
        // ...
    }
};
```

### Example 2: Financial Services

```javascript
const BRANDING = {
    companyName: 'SecureBank',
    colors: {
        primary: '#1E40AF',
        primaryDark: '#1E3A8A',
        secondary: '#DC2626',
        // ... rest default
    },
    typography: {
        fontFamily: '"IBM Plex Sans", Helvetica, Arial, sans-serif'
    },
    content: {
        heroTitle: 'Banking Communications Verification',
        heroSubtitle: 'Secure and compliant toll-free number verification for financial institutions.',
    }
};
```

### Example 3: Healthcare Provider

```javascript
const BRANDING = {
    companyName: 'HealthConnect',
    colors: {
        primary: '#0891B2',
        primaryDark: '#0E7490',
        secondary: '#EC4899',
        // ... rest default
    },
    content: {
        heroTitle: 'HIPAA-Compliant Messaging Verification',
        heroSubtitle: 'Verify your healthcare communication channels securely.',
    }
};
```

## Advanced Customization

### Custom CSS

For deeper styling changes, edit [`public/styles.css`](public/styles.css):

```css
/* Add custom styles after the existing CSS */

/* Example: Rounded corners */
.embeddable-container {
    border-radius: 16px;
}

/* Example: Shadow effects */
.info-card {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
```

### Custom JavaScript

For custom behavior, edit the page scripts:
- [`public/embeddable.js`](public/embeddable.js) - Embeddable version
- [`public/script.js`](public/script.js) - Custom form version

## Testing Your Customizations

1. **Visual Check:**
   - Open both pages: `/embeddable.html` and `/index.html`
   - Verify colors, text, and logo appear correctly
   - Test on mobile and desktop

2. **Color Contrast:**
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Ensure text is readable on backgrounds
   - Aim for WCAG AA compliance (4.5:1 contrast ratio)

3. **Browser Testing:**
   - Test in Chrome, Firefox, Safari, Edge
   - Check mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Changes Not Appearing?

1. **Hard refresh browser:** Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
2. **Check browser console (F12)** for JavaScript errors
3. **Verify `branding.config.js` syntax** - JSON-like format required
4. **Restart server** after making changes

### Colors Not Updating?

- Ensure hex codes are valid (e.g., `#0263E0` not `0263E0`)
- Check CSS variables are being applied in browser DevTools
- Clear browser cache

### Logo Not Showing?

- Verify image path is correct (relative to `/public/` folder)
- Check image file exists and is accessible
- Test image URL in browser address bar

## Deployment Notes

When deploying to production:

1. **Update company information** with real contact details
2. **Use production logo** (high-resolution)
3. **Test email notifications** work with your ISV email
4. **Update footer links** to real privacy policy and terms pages
5. **Set NODE_ENV=production** in environment variables

## Need More Help?

- Check existing styles in [`styles.css`](public/styles.css)
- Review HTML structure in [`embeddable.html`](public/embeddable.html) or [`index.html`](public/index.html)
- See [`branding.js`](public/branding.js) for how branding is applied

## Support

For customization questions or issues:
- Open an issue on GitHub
- Contact: support@cddemo.com
- Documentation: See [README.md](README.md)

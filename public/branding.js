// This file applies branding configuration to the page
// It reads from branding.config.js and updates the DOM dynamically

function applyBranding() {
    if (typeof BRANDING === 'undefined') {
        console.error('BRANDING configuration not loaded');
        return;
    }

    // Apply CSS variables for colors
    const root = document.documentElement;
    root.style.setProperty('--primary-color', BRANDING.colors.primary);
    root.style.setProperty('--primary-dark', BRANDING.colors.primaryDark);
    root.style.setProperty('--secondary-color', BRANDING.colors.secondary);
    root.style.setProperty('--success-color', BRANDING.colors.success);
    root.style.setProperty('--error-color', BRANDING.colors.error);
    root.style.setProperty('--text-dark', BRANDING.colors.textDark);
    root.style.setProperty('--text-light', BRANDING.colors.textLight);
    root.style.setProperty('--bg-light', BRANDING.colors.background);
    root.style.setProperty('--border-color', BRANDING.colors.border);

    // Apply font family
    document.body.style.fontFamily = BRANDING.typography.fontFamily;

    // Update company name in header
    const logoElement = document.querySelector('.logo h1');
    if (logoElement) {
        if (BRANDING.logo.imageUrl) {
            logoElement.innerHTML = `<img src="${BRANDING.logo.imageUrl}" alt="${BRANDING.companyName}" style="width: ${BRANDING.logo.width}; height: ${BRANDING.logo.height};">`;
        } else {
            logoElement.textContent = BRANDING.logo.text;
        }
    }

    // Update page title
    document.title = `${BRANDING.companyName} - Toll Free Number Verification`;

    // Update hero section
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        heroTitle.textContent = BRANDING.content.heroTitle;
    }

    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) {
        heroSubtitle.textContent = BRANDING.content.heroSubtitle;
    }

    // Update footer
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        const year = new Date().getFullYear();
        footerText.textContent = BRANDING.content.footerText.replace('2026', year);
    }

    // Update help section
    const helpTitle = document.querySelector('.help-section h3');
    if (helpTitle) {
        helpTitle.textContent = BRANDING.content.helpTitle;
    }

    const helpCards = document.querySelectorAll('.help-card');
    helpCards.forEach((card, index) => {
        if (BRANDING.content.helpCards[index]) {
            const config = BRANDING.content.helpCards[index];
            const title = card.querySelector('h4');
            const description = card.querySelector('p');

            if (title) {
                title.textContent = `${config.icon} ${config.title}`;
            }
            if (description) {
                description.textContent = config.description;
            }
        }
    });

    console.log(`✅ Branding applied: ${BRANDING.companyName}`);
}

// Apply branding when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyBranding);
} else {
    applyBranding();
}

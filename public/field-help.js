// Add helpful tooltips and guidance to form fields

function addFieldHelp() {
    if (typeof FIELD_GUIDANCE === 'undefined') {
        console.warn('FIELD_GUIDANCE not loaded');
        return;
    }

    // Helper function to create info icon with tooltip
    function createInfoIcon(guidance) {
        const icon = document.createElement('span');
        icon.className = 'info-icon';
        icon.innerHTML = '&#9432;'; // ℹ️ symbol
        icon.title = 'Click for help';

        icon.addEventListener('click', function(e) {
            e.preventDefault();
            showGuidanceModal(guidance);
        });

        return icon;
    }

    // Add help icons to form labels
    const fieldMappings = {
        'tollfreePhoneNumber': 'tollfreePhoneNumber',
        'tollfreeNumber': 'tollfreePhoneNumber',
        'businessName': 'businessName',
        'businessType': 'businessType',
        'businessRegistrationNumber': 'businessRegistrationNumber',
        'businessWebsite': 'businessWebsite',
        'privacyPolicyUrl': 'privacyPolicyUrl',
        'termsOfServiceUrl': 'termsOfServiceUrl',
        'street': 'businessAddress',
        'contactFirstName': 'contactInformation',
        'useCase': 'useCaseCategory',
        'useCaseDescription': 'useCaseDescription',
        'messageVolume': 'messageVolume',
        'messageContent': 'messageContent',
        'helpMessage': 'helpMessage',
        'stopMessage': 'stopMessage',
        'optInType': 'optInType',
        'optInWorkflow': 'optInWorkflow',
        'optInImageUrls': 'optInImageUrls'
    };

    Object.keys(fieldMappings).forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (!input) return;

        const guidanceKey = fieldMappings[fieldId];
        const guidance = FIELD_GUIDANCE[guidanceKey];
        if (!guidance) return;

        // Find the label
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            const infoIcon = createInfoIcon(guidance);
            label.appendChild(document.createTextNode(' '));
            label.appendChild(infoIcon);
        }
    });
}

// Show guidance in modal
function showGuidanceModal(guidance) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('guidance-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'guidance-modal';
        modal.className = 'guidance-modal';
        modal.innerHTML = `
            <div class="guidance-modal-content">
                <span class="guidance-modal-close">&times;</span>
                <div class="guidance-modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close button
        modal.querySelector('.guidance-modal-close').addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Populate modal content
    const body = modal.querySelector('.guidance-modal-body');
    let html = `<h3>${guidance.label}</h3>`;

    if (guidance.required) {
        html += `<p class="guidance-required">Required: ${guidance.required === true ? 'Yes' : guidance.required}</p>`;
    }

    if (guidance.example) {
        html += `<div class="guidance-section">
            <h4>Example:</h4>
            <code>${guidance.example}</code>
        </div>`;
    }

    if (guidance.tips && guidance.tips.length > 0) {
        html += `<div class="guidance-section">
            <h4>Tips:</h4>
            <ul>
                ${guidance.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>`;
    }

    if (guidance.commonMistakes && guidance.commonMistakes.length > 0) {
        html += `<div class="guidance-section guidance-mistakes">
            <h4>❌ Common Mistakes to Avoid:</h4>
            <ul>
                ${guidance.commonMistakes.map(mistake => `<li>${mistake}</li>`).join('')}
            </ul>
        </div>`;
    }

    if (guidance.goodExamples && guidance.goodExamples.length > 0) {
        html += `<div class="guidance-section guidance-good">
            <h4>✅ Good Examples:</h4>
            <ul>
                ${guidance.goodExamples.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
        </div>`;
    }

    if (guidance.badExamples && guidance.badExamples.length > 0) {
        html += `<div class="guidance-section guidance-bad">
            <h4>❌ Bad Examples:</h4>
            <ul>
                ${guidance.badExamples.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
        </div>`;
    }

    if (guidance.options) {
        html += `<div class="guidance-section">
            <h4>Options:</h4>
            <ul>
                ${Object.entries(guidance.options).map(([key, desc]) =>
                    `<li><strong>${key}:</strong> ${desc}</li>`
                ).join('')}
            </ul>
        </div>`;
    }

    if (guidance.examples) {
        html += `<div class="guidance-section">
            <h4>Use Case Examples:</h4>
            <ul>
                ${Object.entries(guidance.examples).map(([key, desc]) =>
                    `<li><strong>${key}:</strong> ${desc}</li>`
                ).join('')}
            </ul>
        </div>`;
    }

    body.innerHTML = html;
    modal.style.display = 'flex';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addFieldHelp);
} else {
    addFieldHelp();
}

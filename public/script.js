document.addEventListener('DOMContentLoaded', function() {
    initializeVerificationForm();
    checkServerHealth();
});

async function checkServerHealth() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        if (!data.twilioConfigured) {
            console.warn('Twilio credentials not configured. Please update .env file.');
        }
    } catch (error) {
        console.error('Server health check failed:', error);
    }
}

async function initializeVerificationForm() {
    const container = document.getElementById('twilio-compliance-embeddable');
    const loadingState = document.getElementById('loading-state');

    loadingState.style.display = 'none';

    container.innerHTML = `
        <form id="verification-form" class="verification-form">
            <h3>Toll-Free Number Information</h3>

            <div class="form-group">
                <label for="tollfreePhoneNumber">Toll-Free Phone Number *</label>
                <input type="tel" id="tollfreePhoneNumber" name="tollfreePhoneNumber" required
                    placeholder="+18001234567"
                    pattern="\\+1[8][0-9]{9}"
                    maxlength="12"
                    title="Enter exactly one toll-free number in E.164 format">
                <small>Enter exactly ONE toll-free number in E.164 format (e.g., +18001234567). Submit each number separately. Must start with +1800, +1888, +1877, +1866, +1855, or +1844</small>
            </div>

            <h3>Business Information</h3>

            <div class="form-group">
                <label for="businessName">Business Name *</label>
                <input type="text" id="businessName" name="businessName" required>
            </div>

            <div class="form-group">
                <label for="businessWebsite">Business Website *</label>
                <input type="url" id="businessWebsite" name="businessWebsite" required placeholder="https://example.com">
            </div>

            <div class="form-group">
                <label for="businessType">Business Type *</label>
                <select id="businessType" name="businessType" required>
                    <option value="">Select business type</option>
                    <option value="PRIVATE_PROFIT">Private For-Profit</option>
                    <option value="PUBLIC_PROFIT">Public For-Profit</option>
                    <option value="NON_PROFIT">Non-Profit</option>
                    <option value="SOLE_PROPRIETOR">Sole Proprietor</option>
                    <option value="GOVERNMENT">Government</option>
                </select>
            </div>

            <div class="form-row" id="registrationFields">
                <div class="form-group">
                    <label for="businessRegistrationNumber">Business Registration Number</label>
                    <input type="text" id="businessRegistrationNumber" name="businessRegistrationNumber" placeholder="EIN, Tax ID, or Registration Number">
                    <small>Required for all business types except Sole Proprietor</small>
                </div>
                <div class="form-group">
                    <label for="businessRegistrationAuthority">Registration Authority</label>
                    <input type="text" id="businessRegistrationAuthority" name="businessRegistrationAuthority" placeholder="e.g., EIN, IRS">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="privacyPolicyUrl">Privacy Policy URL *</label>
                    <input type="url" id="privacyPolicyUrl" name="privacyPolicyUrl" required placeholder="https://example.com/privacy">
                </div>
                <div class="form-group">
                    <label for="termsOfServiceUrl">Terms of Service URL *</label>
                    <input type="url" id="termsOfServiceUrl" name="termsOfServiceUrl" required placeholder="https://example.com/terms">
                </div>
            </div>

            <div class="form-group">
                <label for="street">Street Address *</label>
                <input type="text" id="street" name="street" required>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="city">City *</label>
                    <input type="text" id="city" name="city" required>
                </div>
                <div class="form-group">
                    <label for="state">State *</label>
                    <input type="text" id="state" name="state" required placeholder="CA">
                </div>
                <div class="form-group">
                    <label for="postalCode">Postal Code *</label>
                    <input type="text" id="postalCode" name="postalCode" required>
                </div>
            </div>

            <h3>Contact Information</h3>

            <div class="form-row">
                <div class="form-group">
                    <label for="contactFirstName">First Name *</label>
                    <input type="text" id="contactFirstName" name="contactFirstName" required>
                </div>
                <div class="form-group">
                    <label for="contactLastName">Last Name *</label>
                    <input type="text" id="contactLastName" name="contactLastName" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="contactEmail">Email *</label>
                    <input type="email" id="contactEmail" name="contactEmail" required>
                </div>
                <div class="form-group">
                    <label for="contactPhone">Phone Number *</label>
                    <input type="tel" id="contactPhone" name="contactPhone" required placeholder="+1234567890">
                </div>
            </div>

            <h3>Use Case Details</h3>

            <div class="form-group">
                <label for="useCase">Use Case Category *</label>
                <select id="useCase" name="useCase" required>
                    <option value="">Select a use case</option>
                    <option value="TWO_FACTOR_AUTHENTICATION">Two-Factor Authentication</option>
                    <option value="ACCOUNT_NOTIFICATIONS">Account Notifications</option>
                    <option value="CUSTOMER_CARE">Customer Care</option>
                    <option value="CHARITY_NONPROFIT">Charity/Non-Profit</option>
                    <option value="DELIVERY_NOTIFICATIONS">Delivery Notifications</option>
                    <option value="FRAUD_ALERT_MESSAGING">Fraud Alert Messaging</option>
                    <option value="EVENTS">Events</option>
                    <option value="HIGHER_EDUCATION">Higher Education</option>
                    <option value="K12">K-12 Education</option>
                    <option value="MARKETING">Marketing</option>
                    <option value="POLLING_AND_VOTING_NON_POLITICAL">Polling and Voting (Non-Political)</option>
                    <option value="POLITICAL_ELECTION_CAMPAIGNS">Political/Election Campaigns</option>
                    <option value="PUBLIC_SERVICE_ANNOUNCEMENT">Public Service Announcement</option>
                    <option value="SECURITY_ALERT">Security Alert</option>
                </select>
            </div>

            <div class="form-group">
                <label for="useCaseDescription">Describe Your Use Case *</label>
                <textarea id="useCaseDescription" name="useCaseDescription" rows="4" required
                    placeholder="Provide a detailed description of how you will use toll-free messaging..."></textarea>
            </div>

            <div class="form-group">
                <label for="messageVolume">Expected Monthly Message Volume *</label>
                <select id="messageVolume" name="messageVolume" required>
                    <option value="">Select message volume</option>
                    <option value="10">10 - 1,000 messages/month</option>
                    <option value="1000">1,000 - 10,000 messages/month</option>
                    <option value="10000">10,000 - 100,000 messages/month</option>
                    <option value="100000">100,000 - 250,000 messages/month</option>
                    <option value="250000">250,000+ messages/month</option>
                </select>
            </div>

            <div class="form-group">
                <label for="messageContent">Sample Message Content *</label>
                <textarea id="messageContent" name="messageContent" rows="3" required
                    placeholder="Example: Your order #12345 has shipped and will arrive on Friday."></textarea>
                <small>Provide 1-2 realistic examples of messages you'll send</small>
            </div>

            <div class="form-group">
                <label for="hasLinks">Do your messages contain links or phone numbers?</label>
                <select id="hasLinks" name="hasLinks">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
            </div>

            <div class="form-group" id="linksField" style="display: none;">
                <label for="linkExamples">Example Links/Phone Numbers</label>
                <textarea id="linkExamples" name="linkExamples" rows="2"
                    placeholder="https://example.com/track-order&#10;1-800-123-4567"></textarea>
                <small>Provide examples of URLs or phone numbers included in messages</small>
            </div>

            <div class="form-group">
                <label for="optInType">Opt-In Type *</label>
                <select id="optInType" name="optInType" required>
                    <option value="">Select opt-in type</option>
                    <option value="VERBAL">Verbal Consent</option>
                    <option value="WEB_FORM">Web Form</option>
                    <option value="PAPER_FORM">Paper Form</option>
                    <option value="VIA_TEXT">Via Text Message</option>
                    <option value="MOBILE_QR_CODE">Mobile QR Code</option>
                </select>
            </div>

            <div class="form-group">
                <label for="optInWorkflow">Opt-In Workflow Description *</label>
                <textarea id="optInWorkflow" name="optInWorkflow" rows="3" required
                    placeholder="Describe how customers consent to receive messages. Example: Users check a box on our website during checkout and click 'Agree to receive SMS updates'"></textarea>
                <small>Explain the step-by-step process customers follow to opt in</small>
            </div>

            <div class="form-group">
                <label for="optInImageUrls">Opt-In Screenshot URLs *</label>
                <textarea id="optInImageUrls" name="optInImageUrls" rows="3" required
                    placeholder="https://example.com/screenshots/opt-in-form.png&#10;https://example.com/screenshots/opt-in-confirmation.png"></textarea>
                <small>Provide URLs to screenshots showing your opt-in process (one URL per line). Must be publicly accessible image URLs.</small>
            </div>

            <div class="form-group">
                <label for="helpMessage">Help Message Sample *</label>
                <textarea id="helpMessage" name="helpMessage" rows="2" required
                    placeholder="Example: Reply HELP for assistance or call 1-800-XXX-XXXX"></textarea>
                <small>The message customers receive when they text HELP</small>
            </div>

            <div class="form-group">
                <label for="helpKeywords">Help Keywords</label>
                <input type="text" id="helpKeywords" name="helpKeywords" placeholder="HELP, INFO, SUPPORT">
                <small>Keywords customers can text to get help (comma separated)</small>
            </div>

            <div class="form-group">
                <label for="stopMessage">Stop Message Sample *</label>
                <textarea id="stopMessage" name="stopMessage" rows="2" required
                    placeholder="Example: You have been unsubscribed and will receive no further messages."></textarea>
                <small>The message customers receive when they opt out</small>
            </div>

            <div class="form-group">
                <label for="stopKeywords">Stop Keywords</label>
                <input type="text" id="stopKeywords" name="stopKeywords" placeholder="STOP, CANCEL, UNSUBSCRIBE, QUIT">
                <small>Keywords customers can text to opt out (comma separated)</small>
            </div>

            <h3>Compliance Information</h3>

            <div class="form-group">
                <label for="ageGated">Does your content involve age-gated products/services?</label>
                <select id="ageGated" name="ageGated">
                    <option value="false">No</option>
                    <option value="true">Yes (e.g., alcohol, tobacco, gambling)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="additionalInformation">Additional Information (Optional)</label>
                <textarea id="additionalInformation" name="additionalInformation" rows="3"
                    placeholder="Any additional details about your verification request..."></textarea>
            </div>

            <button type="submit" class="submit-btn">Submit Verification</button>
        </form>
    `;

    const form = document.getElementById('verification-form');

    // Add TFN validation
    const tfnInput = document.getElementById('tollfreePhoneNumber');
    tfnInput.addEventListener('input', function(e) {
        // Remove any non-digit characters except +
        let value = e.target.value.replace(/[^\d+]/g, '');

        // Ensure it starts with +1
        if (value.length > 0 && !value.startsWith('+')) {
            value = '+' + value;
        }
        if (value.length > 1 && !value.startsWith('+1')) {
            value = '+1' + value.slice(1);
        }

        // Limit to exactly 12 characters
        if (value.length > 12) {
            value = value.slice(0, 12);
        }

        e.target.value = value;
    });

    form.addEventListener('submit', handleFormSubmit);

    // Toggle registration fields based on business type
    const businessTypeSelect = document.getElementById('businessType');
    businessTypeSelect.addEventListener('change', function() {
        const registrationFields = document.querySelectorAll('#registrationFields input');
        if (this.value === 'SOLE_PROPRIETOR') {
            registrationFields.forEach(field => {
                field.required = false;
                field.parentElement.style.opacity = '0.6';
            });
        } else {
            registrationFields.forEach(field => {
                field.required = true;
                field.parentElement.style.opacity = '1';
            });
        }
    });

    // Toggle links field based on whether messages contain links
    const hasLinksSelect = document.getElementById('hasLinks');
    const linksField = document.getElementById('linksField');
    hasLinksSelect.addEventListener('change', function() {
        if (this.value === 'true') {
            linksField.style.display = 'block';
            document.getElementById('linkExamples').required = true;
        } else {
            linksField.style.display = 'none';
            document.getElementById('linkExamples').required = false;
        }
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.submit-btn');
    const tfnValue = document.getElementById('tollfreePhoneNumber').value.trim();

    // Validate single number only
    if (tfnValue.includes(',') || tfnValue.includes(';') || tfnValue.match(/\s/)) {
        alert('Please enter only ONE toll-free number. Submit each number separately.');
        return;
    }

    // Validate format
    if (!tfnValue.match(/^\+1(800|888|877|866|855|844)\d{7}$/)) {
        alert('Invalid toll-free number format. Must be +1 followed by 800/888/877/866/855/844 and 7 digits.');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const formData = {
        tollfreePhoneNumber: document.getElementById('tollfreePhoneNumber').value,
        businessName: document.getElementById('businessName').value,
        businessWebsite: document.getElementById('businessWebsite').value,
        businessType: document.getElementById('businessType').value,
        businessRegistrationNumber: document.getElementById('businessRegistrationNumber').value,
        businessRegistrationAuthority: document.getElementById('businessRegistrationAuthority').value,
        privacyPolicyUrl: document.getElementById('privacyPolicyUrl').value,
        termsOfServiceUrl: document.getElementById('termsOfServiceUrl').value,
        businessAddress: {
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            postalCode: document.getElementById('postalCode').value,
            country: 'US'
        },
        businessContactFirstName: document.getElementById('contactFirstName').value,
        businessContactLastName: document.getElementById('contactLastName').value,
        businessContactEmail: document.getElementById('contactEmail').value,
        businessContactPhone: document.getElementById('contactPhone').value,
        useCase: document.getElementById('useCase').value,
        useCaseDescription: document.getElementById('useCaseDescription').value,
        messageVolume: document.getElementById('messageVolume').value,
        messageContent: document.getElementById('messageContent').value,
        hasLinks: document.getElementById('hasLinks').value === 'true',
        linkExamples: document.getElementById('linkExamples').value,
        optInType: document.getElementById('optInType').value,
        optInWorkflow: document.getElementById('optInWorkflow').value,
        optInImageUrls: document.getElementById('optInImageUrls').value.split('\n').filter(url => url.trim()),
        helpMessage: document.getElementById('helpMessage').value,
        helpKeywords: document.getElementById('helpKeywords').value,
        stopMessage: document.getElementById('stopMessage').value,
        stopKeywords: document.getElementById('stopKeywords').value,
        ageGated: document.getElementById('ageGated').value === 'true',
        additionalInformation: document.getElementById('additionalInformation').value
    };

    try {
        const response = await fetch('/api/verification/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            showSuccessMessage(result);
        } else {
            throw new Error(result.message || 'Submission failed');
        }
    } catch (error) {
        console.error('Submission error:', error);
        showErrorMessage(error);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Verification';
    }
}

function showSuccessMessage(result) {
    const container = document.getElementById('twilio-compliance-embeddable');
    const tfn = document.getElementById('tollfreePhoneNumber')?.value || 'N/A';
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div style="font-size: 4rem; color: #14B053; margin-bottom: 1rem;">✓</div>
            <h3 style="color: #121C2D; margin-bottom: 1rem;">Verification Submitted Successfully!</h3>
            <p style="color: #606B85; margin-bottom: 1rem;">
                Thank you for submitting your toll-free number verification for <strong>${tfn}</strong>.
                We'll review your information and get back to you shortly.
            </p>
            ${result.verificationSid ? `
                <div style="background: #f4f4f6; padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
                    <p style="color: #606B85; font-size: 0.9rem; margin: 0;">
                        Toll-Free Number: <strong>${tfn}</strong>
                    </p>
                    <p style="color: #606B85; font-size: 0.9rem; margin: 0.5rem 0 0 0;">
                        Verification ID: <strong>${result.verificationSid}</strong>
                    </p>
                    <p style="color: #606B85; font-size: 0.9rem; margin: 0.5rem 0 0 0;">
                        Status: <strong>${result.status}</strong>
                    </p>
                </div>
            ` : ''}
            <button onclick="location.reload()" style="
                background: #0263E0;
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 4px;
                font-size: 1rem;
                cursor: pointer;
                transition: background 0.3s;
            ">Submit Another Verification</button>
        </div>
    `;
}

function showErrorMessage(error) {
    const container = document.getElementById('twilio-compliance-embeddable');
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div style="font-size: 4rem; color: #D61F1F; margin-bottom: 1rem;">⚠</div>
            <h3 style="color: #121C2D; margin-bottom: 1rem;">Submission Error</h3>
            <p style="color: #606B85; margin-bottom: 2rem;">
                ${error.message || 'An error occurred while submitting your verification. Please try again.'}
            </p>
            <button onclick="location.reload()" style="
                background: #0263E0;
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 4px;
                font-size: 1rem;
                cursor: pointer;
                transition: background 0.3s;
            ">Try Again</button>
        </div>
    `;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initializeTFNForm();
});

function initializeTFNForm() {
    const tfnForm = document.getElementById('tfn-form');
    tfnForm.addEventListener('submit', handleTFNSubmit);

    // Listen for messages from the iframe
    window.addEventListener('message', handleEmbeddableMessage);
}

async function handleTFNSubmit(e) {
    e.preventDefault();

    const tollfreeNumber = document.getElementById('tollfreeNumber').value;
    const customerEmail = document.getElementById('customerEmail').value;

    // Hide input section, show loading
    document.getElementById('tfn-input-section').style.display = 'none';
    document.getElementById('loading-state').style.display = 'flex';

    try {
        // Initialize the embeddable
        const response = await fetch('/api/embeddable/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tollfreePhoneNumber: tollfreeNumber,
                customerEmail: customerEmail
            })
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to initialize verification');
        }

        // Load the Twilio embeddable iframe
        loadEmbeddable(result.inquiryId, result.sessionToken, tollfreeNumber);

    } catch (error) {
        console.error('Error initializing verification:', error);
        showError(error.message);
    }
}

function loadEmbeddable(inquiryId, sessionToken, tollfreeNumber) {
    // Hide loading
    document.getElementById('loading-state').style.display = 'none';

    // Show embeddable section
    const embeddableSection = document.getElementById('twilio-embeddable-section');
    embeddableSection.style.display = 'block';

    // Update header with TFN
    document.getElementById('display-tfn').textContent = tollfreeNumber;

    // Build the embeddable URL
    const embeddableUrl = `https://embeddable.twilio.com/compliance?` +
        `inquiryId=${encodeURIComponent(inquiryId)}` +
        `&inquirySessionToken=${encodeURIComponent(sessionToken)}` +
        `&primaryColor=%230263E0` +  // CD Demo blue
        `&fontFamily=system-ui`;

    // Set the iframe source
    const iframe = document.getElementById('twilio-embeddable-iframe');
    iframe.src = embeddableUrl;

    console.log('Loaded embeddable for inquiry:', inquiryId);
}

function handleEmbeddableMessage(event) {
    // Verify the message is from Twilio
    if (!event.origin.includes('twilio.com')) {
        return;
    }

    const { type, data } = event.data;

    console.log('Message from embeddable:', type, data);

    switch (type) {
        case 'COMPLIANCE_INQUIRY_SUBMITTED':
            handleSubmissionComplete(data);
            break;
        case 'COMPLIANCE_INQUIRY_ERROR':
            handleSubmissionError(data);
            break;
        case 'COMPLIANCE_INQUIRY_CLOSED':
            // User closed the form
            console.log('User closed the form');
            break;
        default:
            console.log('Unknown message type:', type);
    }
}

function handleSubmissionComplete(data) {
    const embeddableSection = document.getElementById('twilio-embeddable-section');
    const tollfreeNumber = document.getElementById('display-tfn').textContent;

    embeddableSection.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div style="font-size: 4rem; color: #14B053; margin-bottom: 1rem;">✓</div>
            <h3 style="color: #121C2D; margin-bottom: 1rem;">Verification Submitted Successfully!</h3>
            <p style="color: #606B85; margin-bottom: 1rem;">
                Thank you for submitting your toll-free number verification for <strong>${tollfreeNumber}</strong>.
            </p>
            <div style="background: #f4f4f6; padding: 1.5rem; border-radius: 4px; margin: 1.5rem 0;">
                <p style="color: #606B85; font-size: 0.9rem; margin: 0;">
                    Toll-Free Number: <strong>${tollfreeNumber}</strong>
                </p>
                <p style="color: #606B85; font-size: 0.9rem; margin: 0.5rem 0 0 0;">
                    Inquiry ID: <strong>${data.inquiryId || 'N/A'}</strong>
                </p>
                <p style="color: #606B85; font-size: 0.9rem; margin: 1rem 0 0 0;">
                    You'll receive email updates about your verification status.
                </p>
            </div>
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

function handleSubmissionError(data) {
    showError(data.message || 'An error occurred during submission. Please try again.');
}

function showError(message) {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('tfn-input-section').style.display = 'none';
    document.getElementById('twilio-embeddable-section').style.display = 'none';

    const errorState = document.getElementById('error-state');
    document.getElementById('error-message-text').textContent = message;
    errorState.style.display = 'block';
}

// Smooth scrolling for anchor links
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

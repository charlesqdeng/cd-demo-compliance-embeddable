# Twilio Compliance Embeddable Integration Guide

This application now supports the **official Twilio Compliance Embeddable** for toll-free verification.

## Two Implementation Options

### Option 1: Official Twilio Embeddable (Recommended)
**File:** `embeddable.html`

Uses Twilio's official iframe-based compliance form:
- ✅ Maintained by Twilio (always up-to-date)
- ✅ Resume functionality (customers can come back later)
- ✅ Pre-filled data on resume
- ✅ Official Twilio UI and validation
- ✅ CD Demo branding via URL parameters

**Access:** http://localhost:3000/embeddable.html

### Option 2: Custom Form
**File:** `index.html`

Custom-built form that submits directly to Twilio API:
- ✅ Full control over UI/UX
- ✅ Custom validation and branding
- ✅ More fields visible at once
- ⚠️ Must maintain field updates manually
- ⚠️ No resume functionality

**Access:** http://localhost:3000/index.html

## How the Embeddable Works

### Step 1: Initialize the Inquiry

```javascript
POST /api/embeddable/initialize
{
  "tollfreePhoneNumber": "+18001234567",
  "customerEmail": "customer@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "inquiryId": "IC...",
  "sessionToken": "eyJ...",
  "registrationId": "RN...",
  "tollfreePhoneNumber": "+18001234567"
}
```

### Step 2: Load the Embeddable

```html
<iframe src="https://embeddable.twilio.com/compliance?
  inquiryId=IC...&
  inquirySessionToken=eyJ...&
  primaryColor=%230263E0&
  fontFamily=system-ui">
</iframe>
```

### Step 3: Handle Completion

The iframe posts messages to the parent window:

```javascript
window.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'COMPLIANCE_INQUIRY_SUBMITTED':
      // Show success message
      break;
    case 'COMPLIANCE_INQUIRY_ERROR':
      // Handle error
      break;
  }
});
```

## Server Endpoints

### POST /api/embeddable/initialize
Initialize a new toll-free verification inquiry.

**Request:**
```json
{
  "tollfreePhoneNumber": "+18001234567",
  "customerEmail": "optional@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "inquiryId": "ICxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sessionToken": "eyJhbGc...",
  "registrationId": "RNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "tollfreePhoneNumber": "+18001234567"
}
```

### POST /api/embeddable/resume
Resume an existing inquiry (if customer returns later).

**Request:**
```json
{
  "inquiryId": "ICxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "inquiryId": "ICxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sessionToken": "eyJhbGc...", // Fresh 24-hour token
  "tollfreePhoneNumber": "+18001234567"
}
```

### POST /api/embeddable/webhook
Webhook for inquiry status updates (configure in Twilio console).

## Customization

### Branding
Update the iframe URL parameters in `embeddable.js`:

```javascript
const embeddableUrl = 
  `https://embeddable.twilio.com/compliance?` +
  `inquiryId=${inquiryId}` +
  `&inquirySessionToken=${sessionToken}` +
  `&primaryColor=%230263E0` +      // Your brand color
  `&secondaryColor=%23F22F46` +    // Secondary color
  `&fontFamily=system-ui`;         // Font family
```

### ISV Notifications
All status emails go to the ISV notification email configured in `.env`:

```env
ISV_NOTIFICATION_EMAIL=compliance@your-company.com
```

## Session Management

- **Session Token**: Expires after 24 hours
- **Inquiry ID**: Persists indefinitely
- **Resume**: Customers can resume incomplete submissions using the inquiry ID
- **Storage**: Currently in-memory Map (use Redis/database for production)

## Production Deployment

### Session Storage
Replace the in-memory Map with Redis or a database:

```javascript
// Example with Redis
const redis = require('redis');
const client = redis.createClient();

// Store session
await client.set(
  `inquiry:${inquiryId}`, 
  JSON.stringify(sessionData),
  'EX', 86400 // 24 hours
);

// Retrieve session
const data = await client.get(`inquiry:${inquiryId}`);
```

### Webhook Configuration
1. Go to Twilio Console → Event Streams
2. Create a new sink pointing to: `https://your-domain.com/api/embeddable/webhook`
3. Subscribe to `tollfree-verification` events

### Security
- Session tokens are ephemeral (24 hours)
- Inquiry IDs are safe to expose to customers
- All API calls use Twilio auth tokens (server-side only)
- CORS is enabled for iframe communication

## Testing

1. Start the server:
   ```bash
   npm start
   ```

2. Open the embeddable version:
   ```
   http://localhost:3000/embeddable.html
   ```

3. Enter a toll-free number and email

4. Complete the Twilio form in the iframe

5. Check server logs for inquiry ID and status

## Troubleshooting

### "Failed to initialize verification"
- Check Twilio credentials in `.env`
- Verify toll-free number format (+18001234567)
- Check server logs for detailed error

### Iframe not loading
- Check browser console for CORS errors
- Verify inquiry ID and session token are valid
- Ensure session token hasn't expired (24 hours)

### Messages not received from iframe
- Verify the message origin is `twilio.com`
- Check browser console for postMessage errors
- Ensure iframe is fully loaded before expecting messages

## Resources

- [Twilio Compliance Embeddable Docs](https://www.twilio.com/docs/messaging/compliance/toll-free/compliance-embeddable-onboarding)
- [TrustHub API Reference](https://www.twilio.com/docs/trusthub/api)
- [Toll-Free Verification Guide](https://www.twilio.com/docs/messaging/compliance/toll-free)

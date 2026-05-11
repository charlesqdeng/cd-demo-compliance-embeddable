# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Twilio Credentials

1. Go to [Twilio Console](https://console.twilio.com)
2. Copy your Account SID and Auth Token
3. Edit the `.env` file:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
ISV_NOTIFICATION_EMAIL=your-isv-email@example.com
```

## Step 3: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## Step 4: Choose Your Implementation

This app provides **two options** for toll-free verification:

### Option 1: Official Twilio Embeddable (Recommended) ⭐
Visit: **http://localhost:3000/embeddable.html**

- ✅ Official Twilio-maintained form
- ✅ Resume incomplete submissions
- ✅ Always up-to-date with Twilio changes
- ✅ CD Demo branded via URL parameters
- ✅ Iframe-based integration

**How it works:**
1. Customer enters toll-free number
2. Server initializes inquiry with Twilio
3. Twilio's form loads in iframe
4. Customer completes verification
5. Success message with inquiry ID

### Option 2: Custom Form
Visit: **http://localhost:3000/index.html**

- ✅ Full UI control
- ✅ Custom validation
- ✅ All fields visible at once
- ⚠️ No resume functionality
- ⚠️ Must maintain field updates manually

## What You'll Need

For toll-free verification, customers must provide:
- Toll-free phone number (E.164 format: +18001234567) - **Must be purchased in your Twilio account first**
- Business name, type, and registration details
- Business website with https:// (e.g., https://example.com)
- Physical business address
- Privacy Policy URL with https://
- Terms of Service URL with https://
- Contact information
- Messaging use case category (select from dropdown)
- Detailed use case description
- Sample message content (standard, HELP, STOP)
- Opt-in workflow details
- Expected monthly message volume (select from ranges)

## Testing the Embeddable

1. Open http://localhost:3000/embeddable.html
2. Enter a toll-free number: `+18001234567`
3. (Optional) Enter customer email
4. Click "Start Verification"
5. Complete the Twilio form
6. Check server logs for inquiry ID

## Troubleshooting

### "Twilio credentials not configured"
- Check that `.env` file has correct TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
- Restart the server after updating `.env`

### "Failed to initialize verification"
- Verify Twilio credentials are valid
- Check toll-free number format (+1800, +1888, +1877, +1866, +1855, +1844)
- Check server logs for specific error

### Iframe not loading
- Check browser console (F12) for errors
- Verify inquiry ID and session token are valid
- Ensure session token hasn't expired (24 hours)

### Form not loading
- Check that server is running on port 3000
- Look for errors in browser console (F12)

## Next Steps

- **Embeddable Details**: See [EMBEDDABLE_GUIDE.md](EMBEDDABLE_GUIDE.md) for complete integration documentation
- **Production Deployment**: See [README.md](README.md) for security best practices
- **API Reference**: See server.js for all available endpoints

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
```

## Step 3: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## Step 4: Open in Browser

Visit: **http://localhost:3000**

## What You'll See

- ✅ CD Demo branded landing page
- ✅ Complete toll-free verification form
- ✅ All required fields for Twilio compliance
- ✅ Real-time submission to Twilio API
- ✅ Success/error feedback

## Testing the Form

Fill out all required fields:
- Business information (name, website, address)
- Contact details (name, email, phone)
- Use case category and description
- Expected message volume
- Sample message content
- Opt-in method

Click "Submit Verification" - if your Twilio credentials are correct, it will submit to Twilio and return a verification SID.

## Troubleshooting

### "Twilio credentials not configured"
- Check that `.env` file has correct TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
- Restart the server after updating `.env`

### "Failed to submit verification"
- Verify Twilio credentials are valid
- Check console logs for specific error
- Ensure all required form fields are filled

### Form not loading
- Check that server is running on port 3000
- Look for errors in browser console (F12)

## Next Steps

For production deployment, see [README.md](README.md) for security best practices.

# Troubleshooting Guide

## Submission Error: "Failed to submit verification"

This generic error from Twilio's embeddable can have several causes. Follow these steps to diagnose:

### Step 1: Check Server Logs

Look at your server console for detailed error messages. The server will show:
```
Error initializing embeddable: [specific error message]
```

### Step 2: Common Causes & Fixes

#### 1. Invalid Twilio Credentials
**Error:** `Authentication failed` or `Invalid credentials`

**Fix:**
- Verify `.env` has correct TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
- Account SID should start with `AC`
- Test credentials in Twilio Console: https://console.twilio.com

#### 2. Toll-Free Number Already Has Pending Verification
**Error:** `Toll-free number already has a pending verification`

**Fix:**
- Check Twilio Console → Messaging → Regulatory Compliance
- Complete or cancel existing verification
- Wait for current verification to be processed

#### 3. Toll-Free Number Not Owned by Account
**Error:** `You don't own this toll-free number`

**Fix:**
- Verify the number belongs to your Twilio account
- Check Twilio Console → Phone Numbers → Manage → Active Numbers
- Purchase the toll-free number first if needed

#### 4. Invalid Toll-Free Number Format
**Error:** `Invalid phone number format`

**Fix:**
- Must be E.164 format: `+18001234567`
- Must start with: +1800, +1888, +1877, +1866, +1855, or +1844
- Exactly 12 characters (+1 and 10 digits)

#### 5. Missing Required Fields
**Error:** `Missing required fields` or validation errors

**Fix:**
- Ensure all required (*) fields are filled
- All URLs must include https:// or http://
- Business registration number required (except Sole Proprietor)
- Use case description must be detailed

#### 6. Network/API Timeout
**Error:** `Request timeout` or `Network error`

**Fix:**
- Check internet connection
- Verify Twilio API status: https://status.twilio.com
- Try again after a few minutes

#### 7. Invalid Business Information
**Error:** `Verification failed` or `Invalid business data`

**Fix:**
- Ensure business address is valid and complete
- Business registration number must be valid
- Website must be accessible (https://)
- Privacy Policy and Terms URLs must return 200 OK

#### 8. ISV Email Not Configured
**Warning:** Notifications might not be received

**Fix:**
```env
ISV_NOTIFICATION_EMAIL=your-isv-email@example.com
```

### Step 3: Enable Debug Mode

Add more detailed logging to server.js:

```javascript
// In /api/embeddable/initialize
console.log('Request body:', req.body);
console.log('Twilio response:', initResponse);

// Catch block
console.error('Full error:', JSON.stringify(error, null, 2));
```

### Step 4: Test with Twilio API Directly

Test if your credentials work:

```bash
curl -X POST https://trusthub.twilio.com/v1/ComplianceInquiries/Tollfree/Initialize \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" \
  -d "TollfreePhoneNumber=+18001234567" \
  -d "NotificationEmail=test@example.com"
```

### Step 5: Check Twilio Console

1. Go to: https://console.twilio.com
2. Check **Messaging → Regulatory Compliance → Toll-Free Verifications**
3. Look for recent submission attempts
4. Check for any error messages or status

### Step 6: Verify Account Status

Ensure your Twilio account is:
- ✅ Active (not suspended)
- ✅ Has sufficient permissions for toll-free verification
- ✅ Is not in trial mode (toll-free verification requires paid account)

## Other Common Issues

### Iframe Not Loading

**Symptoms:**
- Blank iframe
- Loading forever
- Console errors

**Fix:**
1. Check browser console (F12) for CORS errors
2. Verify session token hasn't expired (24 hours)
3. Check inquiry ID is valid
4. Ensure embeddable URL is correct

### "Session Expired"

**Cause:** Session tokens expire after 24 hours

**Fix:**
- Use the resume endpoint to get a fresh token:
```javascript
POST /api/embeddable/resume
{
  "inquiryId": "ICxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### Success But No Email Notification

**Cause:** ISV notification email not configured

**Fix:**
```env
ISV_NOTIFICATION_EMAIL=compliance@your-company.com
```

Restart server after updating .env

## Getting More Help

### Enable Verbose Logging

Set in `.env`:
```env
NODE_ENV=development
DEBUG=*
```

### Check Server Health

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "twilioConfigured": true,
  "isvEmailConfigured": true
}
```

### Useful Twilio Links

- API Status: https://status.twilio.com
- Support: https://support.twilio.com
- Console: https://console.twilio.com
- TFV Docs: https://www.twilio.com/docs/messaging/compliance/toll-free

## Still Having Issues?

1. **Check server logs** for specific error messages
2. **Test credentials** with Twilio CLI or API directly
3. **Verify number ownership** in Twilio Console
4. **Contact Twilio Support** with inquiry ID and error details
5. **Check GitHub Issues**: https://github.com/charlesqdeng/cd-demo-compliance-embeddable/issues

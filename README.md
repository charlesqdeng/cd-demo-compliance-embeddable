# CD Demo - Toll Free Number Verification Portal

A professional, customer-facing website for submitting Toll Free Number verification documents using Twilio's Regulatory Compliance API.

## Features

- 🎨 Modern, CD Demo branded interface
- 📱 Fully responsive design for mobile and desktop
- 🔒 Secure backend with Node.js + Express
- ✅ Complete toll-free verification form
- 📊 Real-time submission to Twilio API
- 🎯 Success/error feedback with verification tracking
- 🔐 Secure credential management via environment variables

## Quick Start

See [SETUP.md](SETUP.md) for detailed setup instructions.

```bash
# 1. Install dependencies
npm install

# 2. Configure Twilio credentials in .env
# Edit .env and add your Account SID and Auth Token

# 3. Start the server
npm start

# 4. Open browser
# Visit http://localhost:3000
```

## Architecture

### Frontend
- **[index.html](index.html)** - Landing page with hero section and info cards
- **[styles.css](styles.css)** - CD Demo branded styles with responsive design
- **[script.js](script.js)** - Dynamic form generation and API integration

### Backend
- **[server.js](server.js)** - Express server with Twilio API integration
- Endpoints:
  - `POST /api/verification/submit` - Submit verification to Twilio
  - `GET /api/verification/status/:sid` - Check verification status
  - `GET /api/health` - Server health check

## Form Fields

The verification form collects all required information for Twilio toll-free verification:

### Business Information
- Business name, website, physical address

### Contact Information
- First name, last name, email, phone number

### Use Case Details
- Use case category (2FA, Marketing, Customer Care, etc.)
- Detailed use case description
- Expected monthly message volume
- Sample message content
- Opt-in type (Web form, Verbal, SMS, etc.)

## Twilio Integration

This application uses the **Twilio Messaging API v1** for toll-free verification submissions:

```javascript
const verification = await client.messaging.v1.tollfreeVerifications.create({
    businessName: '...',
    businessWebsite: '...',
    // ... other fields
});
```

### Response
On successful submission, you'll receive:
- Verification SID (unique identifier)
- Status (pending, in-review, approved, rejected)
- Created timestamp

## Security

✅ **Production-Ready Security Features:**

- Auth tokens stored server-side only (never exposed to browser)
- Environment variable configuration
- CORS enabled for API security
- Input validation on both client and server
- Error messages don't expose sensitive data

## Customization

### Branding Colors

Edit [styles.css](styles.css:1-9):
```css
:root {
    --primary-color: #0263E0;     /* CD Demo Blue */
    --secondary-color: #F22F46;   /* CD Demo Red */
}
```

### Company Name

Edit [index.html](index.html:12) and update the logo section.

### Use Case Categories

Modify the dropdown options in [script.js](script.js) to match your specific use cases.

## Development

```bash
# Install dependencies
npm install

# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Documentation

### POST /api/verification/submit

Submit a new toll-free verification.

**Request Body:**
```json
{
  "businessName": "CD Demo Inc",
  "businessWebsite": "https://cddemo.com",
  "businessAddress": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "94105",
    "country": "US"
  },
  "businessContactFirstName": "John",
  "businessContactLastName": "Doe",
  "businessContactEmail": "john@cddemo.com",
  "businessContactPhone": "+14155551234",
  "useCase": "CUSTOMER_CARE",
  "useCaseDescription": "Customer support notifications",
  "messageVolume": "10000",
  "messageContent": "Your order has shipped!",
  "optInType": "WEB_FORM"
}
```

**Response:**
```json
{
  "success": true,
  "verificationSid": "HCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "status": "pending",
  "message": "Verification submitted successfully!"
}
```

### GET /api/verification/status/:sid

Check the status of a verification.

**Response:**
```json
{
  "success": true,
  "status": "in-review",
  "sid": "HCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "businessName": "CD Demo Inc",
  "createdAt": "2026-05-11T12:00:00Z"
}
```

## Deployment

### Environment Variables

Required for all deployments:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
PORT=3000
NODE_ENV=production
```

### Deployment Options

**Heroku:**
```bash
heroku create cd-demo-tfn-verification
heroku config:set TWILIO_ACCOUNT_SID=ACxxx...
heroku config:set TWILIO_AUTH_TOKEN=xxx...
git push heroku main
```

**AWS/GCP/Azure:**
- Deploy as a Node.js application
- Configure environment variables in platform settings
- Ensure port 3000 or dynamic PORT is exposed

**Docker:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### "Failed to submit verification"
- Check Twilio credentials in `.env`
- Verify Account SID starts with "AC"
- Ensure Auth Token is correct
- Check server logs for specific errors

### Form doesn't submit
- Open browser console (F12) to see errors
- Verify all required fields are filled
- Check that server is running

### "Twilio credentials not configured"
- Restart server after updating `.env`
- Ensure no extra spaces in credentials

## Resources

- [Twilio Toll-Free Verification Docs](https://www.twilio.com/docs/messaging/services/toll-free-verification)
- [Twilio Messaging API Reference](https://www.twilio.com/docs/messaging/api/toll-free-verification-resource)
- [Use Case Requirements](https://support.twilio.com/hc/en-us/articles/1260803225669-Message-throughput-MPS-and-Trust-Score-for-A2P-10DLC-in-the-US)

## Support

For technical support or questions:
- Twilio Support: https://support.twilio.com
- CD Demo Internal: Contact your system administrator

## License

© 2026 CD Demo. All rights reserved.

# TrustHub Integration Guide

This document explains how the application handles TrustHub Customer Profiles for toll-free verification.

## What is TrustHub?

TrustHub is Twilio's compliance system for storing and managing business information. A **Customer Profile** is required for toll-free verification and contains:
- Business information (name, type, registration)
- Physical address
- Contact details
- Supporting documentation

## Automatic Profile Creation

The custom form (`/index.html`) **automatically creates** all required TrustHub resources when you submit a verification.

### What Gets Created

#### 1. Customer Profile (Primary Profile)
The main container for all business information.

```javascript
const customerProfile = await client.trusthub.v1.customerProfiles.create({
    friendlyName: `${businessName} - TFN Verification`,
    email: businessContactEmail,
    policySid: 'RNb0d4771c2c98518d0d16886c50c3c114', // Secondary Customer Profile policy
    statusCallback: `mailto:${isvNotificationEmail}`
});
```

**Result:** A Customer Profile SID (e.g., `BU...`)

#### 2. End User Resource
Contains business information and registration details.

```javascript
const endUser = await client.trusthub.v1.endUsers.create({
    friendlyName: businessName,
    type: 'customer_profile_business_information',
    attributes: {
        business_name: businessName,
        business_type: businessType, // PRIVATE_PROFIT, PUBLIC_PROFIT, etc.
        business_registration_number: businessRegistrationNumber,
        business_registration_authority: businessRegistrationAuthority,
        website_url: businessWebsite,
        social_media_profile_urls: [privacyPolicyUrl, termsOfServiceUrl],
        business_regions_of_operation: 'US',
        business_industry: 'Technology'
    }
});
```

**Result:** An End User SID (e.g., `IT...`)

#### 3. Address Resource
Contains the physical business address.

```javascript
const address = await client.trusthub.v1.addresses.create({
    friendlyName: `${businessName} Address`,
    customerName: businessName,
    street: businessAddress.street,
    city: businessAddress.city,
    region: businessAddress.state,
    postalCode: businessAddress.postalCode,
    isoCountry: 'US'
});
```

**Result:** An Address SID (e.g., `AD...`)

#### 4. Entity Assignments
Links the End User and Address to the Customer Profile.

```javascript
// Assign End User
await client.trusthub.v1.customerProfiles(primaryProfileSid)
    .customerProfilesEntityAssignments
    .create({ objectSid: endUser.sid });

// Assign Address
await client.trusthub.v1.customerProfiles(primaryProfileSid)
    .customerProfilesEntityAssignments
    .create({ objectSid: address.sid });
```

#### 5. Profile Submission
Submits the profile for Twilio review.

```javascript
await client.trusthub.v1.customerProfiles(primaryProfileSid)
    .update({ status: 'pending-review' });
```

#### 6. Toll-Free Verification
Uses the Customer Profile in the verification request.

```javascript
const verification = await client.messaging.v1.tollfreeVerifications.create({
    tollfreePhoneNumberSid: phoneNumberSid,
    primaryProfileSid: primaryProfileSid, // ← Customer Profile SID
    businessName: businessName,
    // ... other verification fields
});
```

## Complete Workflow

```
User Submits Form
       ↓
Create Customer Profile (BU...)
       ↓
Create End User (IT...)
       ↓
Create Address (AD...)
       ↓
Assign End User → Customer Profile
       ↓
Assign Address → Customer Profile
       ↓
Submit Profile for Review (status: pending-review)
       ↓
Look Up Phone Number SID (PN...)
       ↓
Create Toll-Free Verification (HC...)
       ↓
Success Response
```

## Resource SID Prefixes

| Resource Type | SID Prefix | Example |
|--------------|-----------|---------|
| Customer Profile | BU | BUxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |
| End User | IT | ITxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |
| Address | AD | ADxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |
| Phone Number | PN | PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |
| TFN Verification | HC | HCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |

## Viewing Created Resources

### Via Twilio Console

1. **Customer Profiles:**
   - Go to: https://console.twilio.com/us1/develop/trust-hub/customer-profiles
   - View all created profiles
   - Check status (draft, pending-review, approved, rejected)

2. **End Users:**
   - Go to: https://console.twilio.com/us1/develop/trust-hub/end-users
   - View business information

3. **Addresses:**
   - Go to: https://console.twilio.com/us1/develop/trust-hub/addresses
   - View business addresses

4. **Toll-Free Verifications:**
   - Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/regulatory-compliance
   - View verification status

### Via API

```javascript
// Get Customer Profile
const profile = await client.trusthub.v1.customerProfiles(profileSid).fetch();

// List all Customer Profiles
const profiles = await client.trusthub.v1.customerProfiles.list();

// Get verification status
const verification = await client.messaging.v1.tollfreeVerifications(verificationSid).fetch();
```

## Error Handling

The application handles TrustHub errors gracefully:

```javascript
try {
    // Create resources...
} catch (profileError) {
    console.error('Error creating customer profile:', profileError);
    return res.status(500).json({
        success: false,
        message: 'Failed to create customer profile. Please check your business information and try again.',
        error: profileError.message
    });
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Invalid business type | Business type doesn't match enum | Select from dropdown |
| Missing registration number | Required for non-sole proprietor | Provide EIN or Tax ID |
| Invalid address | Address format incorrect | Verify street, city, state, postal code |
| Duplicate profile | Profile already exists | Check Twilio Console for existing profiles |

## Policy SID

The application uses the **Secondary Customer Profile** policy:
```
RNb0d4771c2c98518d0d16886c50c3c114
```

This policy is designed for toll-free verification and requires:
- Business information
- Physical address
- No additional document uploads

## Manual Profile Creation

If you prefer to create Customer Profiles manually:

1. Go to Twilio Console → TrustHub → Customer Profiles
2. Click "Create new Customer Profile"
3. Follow the wizard to add business info and address
4. Submit for review
5. Use the Profile SID in your verification request

**Note:** The custom form does this automatically, so manual creation is not necessary.

## Best Practices

### 1. Profile Reuse
- Each verification creates a **new** Customer Profile
- For production, consider checking for existing profiles first
- Reuse approved profiles when possible

### 2. Profile Status
- `draft` - Profile created but not submitted
- `pending-review` - Submitted to Twilio for review
- `in-review` - Twilio is reviewing
- `twilio-approved` - Approved by Twilio
- `twilio-rejected` - Rejected (check reason)

### 3. Data Accuracy
- Ensure business information is accurate
- Use real, verifiable registration numbers
- Provide valid physical address
- URLs must be accessible

### 4. ISV Model
- All profiles created under the ISV's Twilio account
- ISV receives notifications about profile status
- End customers don't need Twilio accounts

## Embeddable vs Custom Form

### Embeddable (Recommended)
- ✅ TrustHub profile creation handled by Twilio
- ✅ Guided workflow
- ✅ Resume functionality
- ✅ Always up-to-date

### Custom Form
- ✅ Automatic profile creation in code
- ✅ Full control over UI
- ✅ Single-page submission
- ⚠️ Must maintain TrustHub integration

Both approaches create the same TrustHub resources and result in successful verification.

## Resources

- [TrustHub API Documentation](https://www.twilio.com/docs/trusthub/api)
- [Customer Profiles](https://www.twilio.com/docs/trusthub/api/customer-profiles)
- [End Users](https://www.twilio.com/docs/trusthub/api/end-users)
- [Addresses](https://www.twilio.com/docs/trusthub/api/addresses)
- [Toll-Free Verification](https://www.twilio.com/docs/messaging/api/toll-free-verification-resource)

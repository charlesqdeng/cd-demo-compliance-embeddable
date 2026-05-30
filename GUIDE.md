# Twilio Toll-Free Verification - Comprehensive Guide

This is the complete documentation for implementing Twilio Toll-Free Verification in your application.

## ⚠️ Disclaimer

**This is a demonstration project.** This project is not affiliated with or supported by Twilio or any organization. For any issues, bug reports, or questions about this code, please contact:

📧 support@cddemo.com

---

## Table of Contents

### Getting Started
- [Quick Setup](#quick-setup)
- [Installation](#installation)
- [Configuration](#configuration)
- [Choose Your Implementation](#choose-your-implementation)

### Critical Requirements
- [Business Registration Number (BRN) Requirements](#business-registration-number-brn-requirements)
  - [BRN Overview](#brn-overview)
  - [Common BRN Validation Failures](#common-brn-validation-failures)
  - [Manual Review Process](#manual-review-process)
  - [BRN Best Practices](#brn-best-practices)

### Verification Success Guide
- [Quick Start for Users](#quick-start-for-users)
- [Top 10 Tips for Approval](#top-10-tips-for-approval)
- [Field-Specific Guidance](#field-specific-guidance)
- [Common Rejection Reasons](#common-rejection-reasons)
- [What Happens After Submission](#what-happens-after-submission)

### Implementation Options
- [Option 1: Official Twilio Embeddable](#option-1-official-twilio-embeddable-recommended)
- [Option 2: Custom Form with Interactive Guidance](#option-2-custom-form-with-interactive-guidance)
- [Comparison: Embeddable vs Custom Form](#comparison-embeddable-vs-custom-form)

### TrustHub Integration
- [What is TrustHub](#what-is-trusthub)
- [Automatic Profile Creation](#automatic-profile-creation)
- [Complete Workflow](#complete-workflow)
- [Viewing Created Resources](#viewing-created-resources)

### Customization
- [Quick Customization](#quick-customization)
- [Branding Options](#branding-options)
- [Advanced Customization](#advanced-customization)

### Production Deployment
- [Session Storage](#session-storage)
- [Webhook Configuration](#webhook-configuration)
- [Security Considerations](#security-considerations)

### Troubleshooting
- [Common Issues](#common-issues)
- [BRN Troubleshooting](#brn-troubleshooting)

### Resources
- [Additional Documentation](#additional-documentation)
- [Support](#support)

---

# Getting Started

## Quick Setup

### Installation

```bash
npm install
```

### Configuration

1. Go to [Twilio Console](https://console.twilio.com)
2. Copy your Account SID and Auth Token
3. Edit the `.env` file:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
ISV_NOTIFICATION_EMAIL=your-isv-email@example.com
PORT=3000
NODE_ENV=development
```

**IMPORTANT:** All verification notifications (approval/rejection/status) will be sent to `ISV_NOTIFICATION_EMAIL`. This should be YOUR email as the ISV, not your customer's email.

### Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## Choose Your Implementation

This application provides **two options** for toll-free verification:

### Option 1: Official Twilio Embeddable (Recommended)
**Access:** http://localhost:3000/embeddable.html

- Official Twilio-maintained form
- Resume incomplete submissions
- Always up-to-date with Twilio changes
- CD Demo branded via URL parameters
- Iframe-based integration

### Option 2: Custom Form with Interactive Guidance
**Access:** http://localhost:3000/index.html

- Full UI control with CD Demo branding
- Interactive help system with info icons on every field
- Field-by-field guidance from official Twilio docs
- Approved/rejected examples for each field
- All fields visible at once
- Automatic TrustHub Customer Profile creation
- Enhanced message volume options (11 tiers)
- ISV vs end-user business warnings
- No resume functionality
- Must maintain field updates manually

---

# Business Registration Number (BRN) Requirements

## CRITICAL UPDATE: Effective February 17, 2026

Business Registration Numbers are now **REQUIRED** for all Toll-Free Verification submissions. This is a carrier-driven requirement aimed at improving trust, deliverability, and overall messaging security.

## BRN Overview

Starting February 17, 2026, all toll-free verification submissions must include a valid Business Registration Number (BRN) that passes automated validation. This requirement applies to:

- All new toll-free number verifications
- Re-verifications of existing toll-free numbers
- Updates to existing toll-free verification profiles

## Common BRN Validation Failures

When BRN validation fails, it's typically due to one of the following issues:

### 1. Legal Business Name Mismatch (MOST COMMON)

The legal business name **MUST EXACTLY MATCH** official registration records.

#### For U.S. Entities:

**Requirements:**
- Name must match IRS records exactly
- Use the name as shown on the **CP 575 EIN Confirmation Letter** or **IRS 147C letter**
- Include all punctuation, abbreviations, and legal entity suffixes as they appear on official documents

**Common Causes of Failure:**
- Using a DBA (Doing Business As) or trade name instead of the legal name
  - **Correct:** Use legal name in the business name field, DBA in the DBA field
- Adding or removing punctuation, abbreviations, or suffixes
  - **Example (Wrong):** "Acme Coffee Shop, LLC" when official is "Acme Coffee Shop LLC"
  - **Correct:** Match exactly as shown on CP 575/IRS 147C
- Using the name from W-9 or W-2 forms instead of official registration documents
  - **Correct:** Always use CP 575 EIN Confirmation Letter or IRS 147C letter
- Not combining multi-line legal names into a single field when required
  - **Correct:** Combine all lines into one field if your registration shows multiple lines

**Example:**
```
WRONG: "Joe's Coffee" (DBA name)
CORRECT: "Joseph Smith LLC" (legal name from CP 575)
         DBA field: "Joe's Coffee"
```

#### For Non-U.S. Entities:

**Requirements:**
- Name must match official business registration documents issued by the relevant authority
- Use the exact name as shown on government-issued business registration certificates

### 2. Incorrect BRN Value or Identifier Type

The Business Registration Number must match the selected identifier type and follow the correct format.

#### Common Identifier Types and Formats:

| Identifier Type | Format | Example | Notes |
|----------------|--------|---------|-------|
| EIN (U.S.) | XX-XXXXXXX | 12-3456789 | Include dashes |
| CBN | 9 digits | 123456789 | First 9 digits only |
| Other | Varies | Varies | Check official documents |

#### Common Issues:

- Selecting the wrong identifier type
  - **Correct:** EIN for U.S. entities, CBN for Canadian, etc.
- Including extra digits or suffixes
  - **Example (Wrong):** 12-3456789-001 (extra suffix)
  - **Correct:** 12-3456789
- Using a personal identifier instead of a business identifier
  - **Wrong:** Using SSN instead of EIN
  - **Correct:** Use business EIN only
- Formatting issues such as missing dashes or incorrect spacing
  - **Example (Wrong):** 123456789 (missing dashes for EIN)
  - **Correct:** 12-3456789

### 3. Missing or Inconsistent Business Details

Ensure all required fields are completed and aligned with official records:

#### Required Fields Must Align:
- **Entity Type** - Must match your registration (LLC, Corporation, etc.)
- **Business Registration Identifier Type** - Must match the BRN format provided
- **Issuing Country** - Must match where the business is registered

#### Common Misalignments:

| Issue | Problem | Solution |
|-------|---------|----------|
| Entity Type Mismatch | Selected "Sole Proprietor" but provided EIN | Change to appropriate entity type (LLC, Corp, etc.) |
| Wrong Country | U.S. business selected "Canada" | Select correct issuing country |
| Identifier Type Wrong | Selected "CBN" but provided EIN format | Select "EIN" identifier type |

### 4. Newly Registered Businesses

If your business was recently created, it may not yet appear in validation systems.

**Timeline:**
- Records typically take **~60 days** to propagate to validation systems
- Validation may fail even if information is correct during this period

**Solution:**
- Prepare supporting documents for manual review (see below)
- Include documentation showing registration date
- Proceed with manual review process

## Manual Review Process

If you've confirmed all details are correct but validation still fails, you'll need to proceed with a manual review.

### Required Supporting Documents

#### For U.S. Entities:
- **CP 575 EIN Confirmation Letter** (preferred), OR
- **IRS 147C letter**

These documents definitively show:
- Legal business name exactly as registered
- EIN in correct format
- Entity type
- Registration date

#### For Non-U.S. Entities:
- **Official business registration documents** from the relevant government authority

Examples:
- Business registration certificate
- Certificate of incorporation
- Official government-issued business license

### How to Submit Supporting Documents

**Step 1: Prepare Your Documents**
- Scan or take clear photos of official documents
- Ensure all text is legible
- Include all pages if multi-page document

**Step 2: Upload to Public Hosting**
Upload documents to a publicly accessible location:
- Google Drive (set sharing to "Anyone with the link can view")
- Dropbox (create public share link)
- Your business website (if you have secure hosting)
- Other cloud storage with public link sharing

**Important:**
- Ensure links are **publicly accessible** (no login/password required)
- Test the link in an incognito/private browser window
- Keep links active throughout the verification process

**Step 3: Include Link in Submission**
Add the public link to supporting documents in either:
- **Additional Information** field (recommended), OR
- **Opt-In Image URLs** field

**Example Entry:**
```
Supporting documents for manual review: https://drive.google.com/file/d/xxxxx/view?usp=sharing

Includes:
- CP 575 EIN Confirmation Letter showing legal business name and EIN
```

### Important Notes About Manual Review

**Benefits:**
- Speeds up the manual review process
- Provides definitive proof of business registration
- Reduces back-and-forth with reviewers

**Important:**
- Providing documents early speeds up review but does **NOT guarantee automatic approval**
- Manual review still evaluates all aspects of your submission
- Typical manual review time: 3-5 business days (vs. 1-2 days for automated approval)

## BRN Best Practices

### Before Submitting:

1. **Locate Your Official Documents**
   - U.S.: Find your CP 575 or IRS 147C letter
   - Non-U.S.: Locate official business registration certificate

2. **Verify Exact Name Match**
   - Type the name EXACTLY as shown on official documents
   - Include all punctuation, spaces, and legal suffixes
   - Do not use shortened versions or DBA names

3. **Check Your BRN Format**
   - EIN: Include dashes (XX-XXXXXXX)
   - CBN: First 9 digits only
   - Verify no extra digits or suffixes

4. **Align All Fields**
   - Entity Type matches your business structure
   - Identifier Type matches BRN format
   - Issuing Country matches registration location

5. **Prepare Supporting Documents (Recommended)**
   - Even if you think validation will pass, having documents ready speeds up any manual review
   - Upload to Google Drive or similar before starting submission
   - Have the public link ready to paste if needed

### During Submission:

1. **Double-Check Before Submitting**
   - Review legal business name character-by-character against official documents
   - Verify BRN format matches identifier type
   - Confirm all required fields are complete

2. **Include Supporting Documents Proactively**
   - If you're uncertain about validation, include documents upfront
   - Add link in "Additional Information" field
   - Note what documents are included

### If Validation Fails:

1. **Review Error Message**
   - Note which field(s) failed validation
   - Check for name/BRN mismatches

2. **Compare Against Official Documents**
   - Character-by-character comparison of business name
   - Verify BRN format and identifier type

3. **Prepare for Manual Review**
   - Upload supporting documents if not already included
   - Create public share link
   - Re-submit with link in Additional Information field

## BRN Examples

### Successful Submission Example (U.S. Entity)

**Scenario:** Coffee shop LLC in Seattle

```
Legal Business Name: Sunrise Coffee Roasters LLC
Business Type: Private for-profit company
Entity Type: Limited Liability Company (LLC)
Business Registration Identifier Type: EIN
Business Registration Number: 12-3456789
Issuing Country: United States

Additional Information: 
Supporting documentation: https://drive.google.com/file/d/xxxxx/view
Includes CP 575 EIN Confirmation Letter
```

**Why this succeeds:**
- Legal name matches CP 575 exactly (including "LLC")
- EIN format is correct (includes dash)
- Identifier type matches (EIN)
- Entity type matches business structure

### Common Failure Example

**Scenario:** Same business, incorrect submission

```
Legal Business Name: Sunrise Coffee
Business Type: Private for-profit company
Entity Type: Limited Liability Company (LLC)
Business Registration Identifier Type: EIN
Business Registration Number: 123456789
Issuing Country: United States
```

**Why this fails:**
- Legal name missing "Roasters LLC" suffix
- EIN missing dashes (should be 12-3456789)

## BRN Frequently Asked Questions

### Q: Is BRN required for sole proprietors?

**A:** Requirements vary by jurisdiction. In many cases, sole proprietors without employees may not have a BRN. However, carrier validation may still require it. Check with your local business registration authority.

### Q: What if I only have a W-9 form?

**A:** W-9 forms are **not sufficient** for BRN validation. You must locate:
- U.S.: CP 575 EIN Confirmation Letter or IRS 147C letter
- Non-U.S.: Official business registration from government authority

### Q: Can I use my DBA name?

**A:** No. The legal business name field must contain your **registered legal name**. DBA/trade names should go in the DBA field (if available).

### Q: How long does manual review take?

**A:** Manual review typically takes **3-5 business days**, compared to 1-2 days for automated approval. Including supporting documents upfront can speed this up.

### Q: What if my business registration is in a non-English language?

**A:** Provide the official name as registered, along with:
- English translation (if possible)
- Official registration documents with translation
- Note in Additional Information field explaining the situation

### Q: Do I need to update existing verified toll-free numbers?

**A:** Existing verified numbers do not need immediate updates, but any changes or re-verifications will require BRN compliance.

---

# Verification Success Guide

## Quick Start for Users

1. **Click the info icons** next to any form field for detailed help
2. **Read the tips** - they explain exactly what Twilio needs
3. **Use the examples** - see what good submissions look like
4. **Avoid common mistakes** - listed in red boxes

## Review Timeline

**Typical Review Time:** 1-2 business days  
**Updates:** Sent to ISV notification email  
**Success Rate:** Higher with detailed, specific information

## CRITICAL: ISV vs End-User Business Information

**This is the #1 reason for rejection!**

Toll-Free Verification requires the business information of the **END-USER** (the business that customers recognize and engage with), **NOT the ISV**.

### When to use END-USER information:
- The end business is sending messages to their customers
- Messages are branded with the end business name
- Customers opted in through the end business

### When ISV information is acceptable:
- ISV is the sole message content creator
- ISV directly manages opt-in process
- Messages are branded with ISV name

**When in doubt:** Use the END BUSINESS information that customers recognize!

## Top 10 Tips for Approval

### 1. Be Specific in Your Use Case Description
**Bad:** "Customer notifications" or "Marketing"  
**Good:** "This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop"  
**Good:** "Customers receive order confirmation immediately after purchase, followed by shipping updates with tracking numbers when items ship."

**Why it matters:** Vague descriptions are the #1 reason for rejection.

### 2. Include Realistic Message Samples (That Match Your Use Case!)
Your sample should include:
- Actual content customers will see
- Variable placeholders (e.g., [ORDER_ID])
- Opt-out language (STOP, UNSUBSCRIBE)
- Contact information if needed
- **MUST match the use case category you selected**

**Example for Marketing:**
```
Thank you for being a loyal customer of John's Coffee Shop. Enjoy 10% off your next purchase. Reply STOP to opt out.
```

**Example for Order Notifications:**
```
Order #[ORDER_ID] confirmed! Estimated delivery: [DATE]. Track: [LINK]. Questions? Call 1-800-XXX-XXXX. Reply STOP to opt out.
```

**Bad:** Sending "Your appointment is today at 10:00 AM" when use case is Marketing (doesn't match!)

### 3. Use Physical Business Address
**Don't use:** P.O. Box, virtual office, residential address  
**Use:** Actual business location from your registration

### 4. Provide Complete URLs
**Bad:** `www.example.com`  
**Good:** `https://www.example.com`

All URLs must:
- Include https:// or http://
- Be publicly accessible (no login/password)
- Load without errors
- Show relevant information
- **For Business Website:** Social media links (Facebook, Instagram, Twitter) are acceptable if no traditional website exists, but must be set to PUBLIC

### 5. Match Your Business Registration
- Use your **legal business name** (not DBA)
- Provide **EIN** for registered businesses
- Select correct **business type**
- Address should match public records

### 6. Explain Your Opt-In Process Clearly
The more detail, the better! Describe step-by-step:
1. Where customers see the opt-in (checkout page, signup form, etc.)
2. Exact wording of checkbox/button
3. When opt-in occurs
4. Confirmation they receive

**Good Examples:**
- "On our signup page, users check an empty checkbox labeled 'I agree to receive SMS notifications about my account' before clicking 'Create Account'."
- "Keyword: Coffee. The keyword is found on a sign at the register of John's Coffee Shop where customers can see the keyword and text in to the Toll-Free Number. Once the customer texts the keyword, they are provided a double opt-in where they are asked to Reply Y to confirm they would like to receive promotional SMS"

**For VERBAL consent, include complete script:**
```
IVR: "As part of our service we can send you automated monthly text alerts. 
We will send 2 messages per month. Message and data rates may apply. 
Reply HELP for help or STOP to opt out. Terms at [URL]. 
Please reply YES or NO to indicate if you would like this service."

Customer: "Yes"

IVR: "Great! We will send you a text to confirm enrollment."
```

### 7. Include Proper HELP and STOP Responses
**HELP message should:**
- Provide contact information
- Explain how to get support
- Mention STOP to unsubscribe

**STOP message should:**
- Confirm unsubscription clearly
- State no more messages will be sent
- Optional: Mention how to re-subscribe

### 8. Choose Accurate Message Volume
- Don't underestimate - you may get throttled
- Don't wildly overestimate - raises red flags
- Base on realistic customer base projections

### 9. Provide Opt-In Screenshots/Documentation (Required!)
**Important:** OptInImageURLs must demonstrate the OptInType you selected.

**For each opt-in type:**
- **VERBAL:** Provide document with complete IVR script or spoken consent process
- **WEB_FORM:** Direct link to opt-in page OR screenshot (checkbox must NOT be pre-checked)
- **PAPER_FORM:** Scanned copy of the physical form
- **VIA_TEXT:** Document describing keyword campaign with details of where keyword is found
- **MOBILE_QR_CODE:** Document or image with the QR code

**Requirements:**
- Must be publicly accessible (no login/password required)
- Show actual implementation (not mockups)
- Include clear opt-in language
- Multiple screenshots/documents okay

**Good Examples:**
- http://www.example.com/signupforsms (direct opt-in page)
- http://www.example.com/opt-in-screenshot.png (hosted image)
- http://www.example.com/opt-in-process.pdf (detailed document)

**Bad Examples:**
- http://www.example.com (homepage, not specific opt-in)
- URLs behind login/password
- "Customer receives text receipt" (too vague)

### 10. Use Business Email (Not Personal)
**Avoid:** Gmail, Yahoo, Hotmail for business contact  
**Use:** Email on your business domain

**Note:** 
- Business Contact Email is for the end-user business (for verification purposes only)
- Notification Email is configured by the ISV and receives all verification notifications
- Twilio will not contact the end-business; contact info is for verification only

## Field-Specific Guidance

### Business Registration Number
**For US businesses:**
- Use your EIN (Employer Identification Number)
- Format: XX-XXXXXXX (include dashes)
- Found on IRS documents

**Not required for:**
- Sole proprietors without employees

### Use Case Categories Explained

| Category | Best For | Example |
|----------|----------|---------|
| **Two-Factor Authentication** | Login codes, security verification | "Your verification code is 123456" |
| **Account Notifications** | Account updates, alerts | "Your password was changed" |
| **Customer Care** | Support, confirmations | "Your support ticket #123 was resolved" |
| **Delivery Notifications** | Shipping updates | "Your package will arrive tomorrow" |
| **Marketing** | Promotional messages | "20% off sale this weekend!" - *Requires explicit opt-in* |

### Privacy Policy Requirements
Your privacy policy must:
- Be on a dedicated page
- Mention SMS/text messaging
- Explain data collection practices
- Describe how data is used
- Be easily accessible

### Message Volume Ranges
Choose the closest value to your expected volume. If volume will increase, use where you expect to be in **6 months**.

- **10** = Up to 10 messages/month
- **100** = Up to 100 messages/month
- **1000** = Up to 1,000 messages/month
- **10000** = Up to 10,000 messages/month
- **100000** = Up to 100,000 messages/month
- **250000** = Up to 250,000 messages/month
- **500000** = Up to 500,000 messages/month
- **750000** = Up to 750,000 messages/month
- **1000000** = Up to 1,000,000 messages/month
- **5000000** = Up to 5,000,000 messages/month
- **10000000+** = 10,000,000+ messages/month

## Common Rejection Reasons

### 1. Vague or Generic Use Case
**Problem:** "Business communications"  
**Solution:** Provide specific details about who, what, when, why

### 2. Missing or Broken URLs
**Problem:** URLs don't load or require login  
**Solution:** Test all URLs in incognito browser

### 3. No Clear Opt-In Process
**Problem:** Can't verify how customers consent  
**Solution:** Provide detailed workflow and screenshots

### 4. P.O. Box Address
**Problem:** Not a physical business location  
**Solution:** Use actual business address

### 5. Personal Email Domain
**Problem:** Using Gmail/Yahoo for business  
**Solution:** Use company email domain

### 6. No STOP Language
**Problem:** Messages don't include opt-out instructions  
**Solution:** Add "Reply STOP to unsubscribe" to samples

### 7. Marketing Without Explicit Opt-In
**Problem:** Marketing use case without clear consent  
**Solution:** Show explicit opt-in checkbox specifically for marketing

### 8. Incomplete Business Information
**Problem:** Missing registration number or authority  
**Solution:** Provide complete EIN/Tax ID and issuing authority

### 9. Using ISV Information Instead of End-User
**Problem:** Submission contains ISV business details when end-user should be used  
**Solution:** Use the END BUSINESS information (name, address, contact) that customers recognize and engage with

## What Happens After Submission

### 1. Immediate Confirmation
You'll receive a verification SID (e.g., `HH...`)

### 2. Review Process
- Twilio team reviews within 1-2 business days
- May request additional information via email
- Status: `pending-review` → `in-review` → `approved` or `rejected`

### 3. Email Notifications
Updates sent to ISV notification email:
- Review started
- Additional information needed (if any)
- Final decision

### 4. If Approved
- Start sending messages immediately  
- Number marked as verified in console  
- Full throughput available

### 5. If Rejected
- Email explains reasons for rejection  
- Fix issues and resubmit  
- Address all feedback points

## Checklist Before Submitting

Use this checklist to verify your submission is complete:

- [ ] **END-USER business information provided (not ISV, unless ISV is sole content creator)**
- [ ] Toll-free number is purchased in Twilio account
- [ ] Business name matches legal registration of END-USER
- [ ] Physical address provided (no P.O. Box) - END-USER address
- [ ] Business registration number included (if not sole proprietor)
- [ ] All URLs include https:// and are publicly accessible (no login required)
- [ ] Business website is live (or public social media if no traditional website)
- [ ] Privacy policy mentions SMS messaging
- [ ] Use case description is detailed (3+ sentences with specifics)
- [ ] **Message sample MATCHES the use case category selected**
- [ ] Message samples include STOP language
- [ ] HELP message provides contact information
- [ ] STOP message confirms unsubscription
- [ ] Opt-in process described step-by-step with full details
- [ ] **Opt-in documentation uploaded that demonstrates the opt-in TYPE chosen**
- [ ] Message volume is realistic (consider 6-month projection)
- [ ] Business contact information complete (First Name, Last Name, Email, Phone)
- [ ] Business email used (not personal Gmail/Yahoo/Hotmail)
- [ ] ISV notification email configured in .env file (ISV only)

---

# Implementation Options

## Option 1: Official Twilio Embeddable (Recommended)

**Access:** http://localhost:3000/embeddable.html

Uses Twilio's official iframe-based compliance form:
- Official Twilio-maintained form
- Resume functionality (customers can come back later)
- Pre-filled data on resume
- Official Twilio UI and validation
- CD Demo branding via URL parameters
- Always up-to-date with Twilio changes

### How the Embeddable Works

#### Step 1: Initialize the Inquiry

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

#### Step 2: Load the Embeddable

```html
<iframe src="https://embeddable.twilio.com/compliance?
  inquiryId=IC...&
  inquirySessionToken=eyJ...&
  primaryColor=%230263E0&
  fontFamily=system-ui">
</iframe>
```

#### Step 3: Handle Completion

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

### Server Endpoints

#### POST /api/embeddable/initialize
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

#### POST /api/embeddable/resume
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

### Session Management

- **Session Token**: Expires after 24 hours
- **Inquiry ID**: Persists indefinitely
- **Resume**: Customers can resume incomplete submissions using the inquiry ID
- **Storage**: Currently in-memory Map (use Redis/database for production)

### Testing the Embeddable

1. Open http://localhost:3000/embeddable.html
2. Enter a toll-free number: `+18001234567`
3. (Optional) Enter customer email
4. Click "Start Verification"
5. Complete the Twilio form
6. Check server logs for inquiry ID

## Option 2: Custom Form with Interactive Guidance

**Access:** http://localhost:3000/index.html

Custom-built form that submits directly to Twilio API:
- Full control over UI/UX with CD Demo branding
- Interactive help system with info icons on every field
- Field-by-field guidance from official Twilio docs
- Approved/rejected examples for each field
- Custom validation and branding
- More fields visible at once
- **Automatic TrustHub Customer Profile creation**
- **Automatic End User and Address resource creation**
- Enhanced message volume options (11 tiers)
- ISV vs end-user business warnings
- Must maintain field updates manually
- No resume functionality

### What Happens Automatically:
1. Creates TrustHub Customer Profile with your business info
2. Creates End User resource with business details
3. Creates Address resource
4. Assigns resources to profile
5. Submits profile for Twilio review
6. Creates toll-free verification with primary profile

See [TrustHub Integration](#trusthub-integration) section for detailed information.

## Comparison: Embeddable vs Custom Form

| Feature | Embeddable | Custom Form |
|---------|-----------|-------------|
| Maintenance | Twilio | You |
| Resume functionality | Yes | No |
| Up-to-date fields | Automatic | Manual |
| UI customization | Limited | Full |
| Branding | URL params | Complete control |
| TrustHub creation | Twilio | Automatic in code |
| Interactive guidance | No | Yes (info icons) |
| Field visibility | Progressive | All at once |
| Best for | Quick implementation, less maintenance | Full control, branded experience |

---

# TrustHub Integration

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

## TrustHub Best Practices

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

---

# Customization

## Quick Customization

All branding can be customized in **one file**: `branding.config.js`

## Branding Options

### 1. Company Information

```javascript
companyName: 'CD Demo',              // Your company name
companyWebsite: 'https://cddemo.com', // Your website
supportEmail: 'support@cddemo.com',   // Support email
```

### 2. Color Scheme

Change all colors to match your brand:

```javascript
colors: {
    primary: '#0263E0',        // Main brand color (buttons, links, headers)
    primaryDark: '#014BB8',    // Darker shade for hover states
    secondary: '#F22F46',      // Accent color
    success: '#14B053',        // Success messages
    error: '#D61F1F',          // Error messages
    textDark: '#121C2D',       // Main text color
    textLight: '#606B85',      // Secondary text color
    background: '#F4F4F6',     // Light background
    border: '#E1E3EA',         // Border color
}
```

**Color Examples:**

| Brand | Primary | Secondary |
|-------|---------|-----------|
| Blue Theme | `#0263E0` | `#F22F46` |
| Green Theme | `#10B981` | `#F59E0B` |
| Purple Theme | `#8B5CF6` | `#EC4899` |
| Red Theme | `#EF4444` | `#3B82F6` |

### 3. Logo

Choose between text or image logo:

```javascript
logo: {
    text: 'CD Demo',           // Text to display (if no image)
    imageUrl: null,            // Path to logo image, or null to use text
    width: '150px',            // Logo width (if using image)
    height: 'auto'             // Logo height (if using image)
}
```

**To use an image logo:**
1. Place your logo in `/public/assets/logo.png`
2. Update config:
```javascript
logo: {
    imageUrl: '/assets/logo.png',
    width: '150px',
    height: 'auto'
}
```

### 4. Typography

```javascript
typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    headerFont: 'inherit', // Use different font for headers if desired
}
```

**Popular Font Combinations:**

```javascript
// Modern/Tech
fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

// Professional
fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'

// Friendly
fontFamily: '"Nunito", "Open Sans", Arial, sans-serif'

// Corporate
fontFamily: '"IBM Plex Sans", "Helvetica", Arial, sans-serif'
```

### 5. Page Content

Customize all text on the page:

```javascript
content: {
    heroTitle: 'Toll Free Number Verification',
    heroSubtitle: 'Submit your verification documents securely...',
    footerText: '© 2026 CD Demo. All rights reserved.',
    helpTitle: 'Need Help?',
    // ... and more
}
```

## How to Apply Changes

### Method 1: Edit branding.config.js (Recommended)

1. Open `branding.config.js`
2. Update the values you want to change
3. Save the file
4. Restart the server:
   ```bash
   npm start
   ```
5. Hard refresh your browser: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+F5** (Windows)

### Method 2: Environment Variables (Advanced)

For deployment environments, you can override branding via environment variables:

```bash
export COMPANY_NAME="My Company"
export PRIMARY_COLOR="#10B981"
```

Then update `branding.config.js` to read from `process.env`.

## Advanced Customization

### Custom CSS

For deeper styling changes, edit `public/styles.css`:

```css
/* Add custom styles after the existing CSS */

/* Example: Rounded corners */
.embeddable-container {
    border-radius: 16px;
}

/* Example: Shadow effects */
.info-card {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
```

### Custom JavaScript

For custom behavior, edit the page scripts:
- `public/embeddable.js` - Embeddable version
- `public/script.js` - Custom form version

### Embeddable Branding

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

## Testing Your Customizations

1. **Visual Check:**
   - Open both pages: `/embeddable.html` and `/index.html`
   - Verify colors, text, and logo appear correctly
   - Test on mobile and desktop

2. **Color Contrast:**
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Ensure text is readable on backgrounds
   - Aim for WCAG AA compliance (4.5:1 contrast ratio)

3. **Browser Testing:**
   - Test in Chrome, Firefox, Safari, Edge
   - Check mobile browsers (iOS Safari, Chrome Mobile)

---

# Production Deployment

## Session Storage

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

## Webhook Configuration

1. Go to Twilio Console → Event Streams
2. Create a new sink pointing to: `https://your-domain.com/api/embeddable/webhook`
3. Subscribe to `tollfree-verification` events

### ISV Notifications

All status emails go to the ISV notification email configured in `.env`:

```env
ISV_NOTIFICATION_EMAIL=compliance@your-company.com
```

## Security Considerations

- Session tokens are ephemeral (24 hours)
- Inquiry IDs are safe to expose to customers
- All API calls use Twilio auth tokens (server-side only)
- CORS is enabled for iframe communication
- Never expose TWILIO_AUTH_TOKEN to client-side code
- Use HTTPS in production
- Implement rate limiting on API endpoints
- Validate all user inputs server-side

## Deployment Checklist

When deploying to production:

1. **Update company information** with real contact details
2. **Use production logo** (high-resolution)
3. **Test email notifications** work with your ISV email
4. **Update footer links** to real privacy policy and terms pages
5. **Set NODE_ENV=production** in environment variables
6. **Use Redis or database** for session storage
7. **Configure webhook** for status updates
8. **Enable HTTPS** on your domain
9. **Implement rate limiting** on API endpoints
10. **Set up monitoring** and error logging

---

# Troubleshooting

## Common Issues

### "Twilio credentials not configured"
- Check that `.env` file has correct TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
- Restart the server after updating `.env`

### "Failed to initialize verification"
- Verify Twilio credentials are valid
- Check toll-free number format (+1800, +1888, +1877, +1866, +1855, +1844)
- Ensure toll-free number is purchased in your Twilio account
- Check server logs for specific error

### Iframe not loading
- Check browser console (F12) for errors
- Verify inquiry ID and session token are valid
- Ensure session token hasn't expired (24 hours)
- Check for CORS errors

### Form not loading
- Check that server is running on port 3000
- Look for errors in browser console (F12)
- Verify all static files are accessible

### Changes not appearing
1. **Hard refresh browser:** Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
2. **Check browser console (F12)** for JavaScript errors
3. **Verify `branding.config.js` syntax** - JSON-like format required
4. **Restart server** after making changes

### Colors not updating
- Ensure hex codes are valid (e.g., `#0263E0` not `0263E0`)
- Check CSS variables are being applied in browser DevTools
- Clear browser cache

### Logo not showing
- Verify image path is correct (relative to `/public/` folder)
- Check image file exists and is accessible
- Test image URL in browser address bar

### Messages not received from iframe
- Verify the message origin is `twilio.com`
- Check browser console for postMessage errors
- Ensure iframe is fully loaded before expecting messages

## BRN Troubleshooting

### "Legal business name does not match records"

**Check:**
- [ ] Name matches CP 575/IRS 147C exactly (U.S.) or official registration (non-U.S.)
- [ ] All punctuation and spacing is correct
- [ ] Legal entity suffix is included (LLC, Inc., Corp., etc.)
- [ ] Not using DBA name instead of legal name
- [ ] No abbreviations that don't match official documents

**Solution:**
- Compare your entry character-by-character against official documents
- Include CP 575 or official registration document in submission

### "BRN format invalid"

**Check:**
- [ ] EIN includes dashes: XX-XXXXXXX (not XXXXXXXXX)
- [ ] CBN is first 9 digits only (not 10 or more)
- [ ] No extra suffixes or characters
- [ ] Identifier type matches the format provided

**Solution:**
- Reformat BRN to match standard format
- Verify identifier type selection

### "Business details inconsistent"

**Check:**
- [ ] Entity Type matches your actual business structure
- [ ] Identifier Type matches BRN format
- [ ] Issuing Country matches where business is registered
- [ ] Business Type aligns with Entity Type

**Solution:**
- Review all fields for consistency
- Consult formation/registration documents to verify details

### "Recently registered business not found"

**If your business was registered within the last 60 days:**

**Solution:**
- Include registration documents showing registration date
- Add note in Additional Information field:
  ```
  Note: Business registered on [DATE], within 60-day propagation window.
  Supporting documents: [PUBLIC LINK]
  ```
- Proceed with manual review

## TrustHub Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Invalid business type | Business type doesn't match enum | Select from dropdown |
| Missing registration number | Required for non-sole proprietor | Provide EIN or Tax ID |
| Invalid address | Address format incorrect | Verify street, city, state, postal code |
| Duplicate profile | Profile already exists | Check Twilio Console for existing profiles |

---

# Additional Documentation

## Resources

- [Twilio Toll-Free Verification Guide](https://www.twilio.com/docs/messaging/compliance/toll-free)
- [TrustHub API Documentation](https://www.twilio.com/docs/trusthub/api)
- [Compliance Embeddable Documentation](https://www.twilio.com/docs/messaging/compliance/toll-free/compliance-embeddable-onboarding)
- [Regulatory Compliance Guide](https://www.twilio.com/docs/messaging/compliance)
- [Customer Profiles](https://www.twilio.com/docs/trusthub/api/customer-profiles)
- [End Users](https://www.twilio.com/docs/trusthub/api/end-users)
- [Addresses](https://www.twilio.com/docs/trusthub/api/addresses)
- [Toll-Free Verification API](https://www.twilio.com/docs/messaging/api/toll-free-verification-resource)

## In-App Help

- Click info icons next to any form field for detailed guidance
- View examples of approved vs. rejected submissions
- See common mistakes highlighted in red boxes

## What You'll Need

For toll-free verification, customers must provide:
- Toll-free phone number (E.164 format: +18001234567) - **Must be purchased in your Twilio account first**
- **END-USER business information** (not ISV info unless ISV is sole content creator)
- Business name, type, and registration details
- Business website with https:// (social media acceptable if set to public)
- Physical business address (no P.O. Boxes)
- Privacy Policy URL with https://
- Terms of Service URL with https://
- Contact information (4 separate fields: First Name, Last Name, Email, Phone)
- Messaging use case category (select from dropdown)
- **Detailed use case description** (vague descriptions = #1 rejection reason)
- Sample message content that **matches the use case category**
- HELP and STOP message responses
- Opt-in type and detailed workflow description
- Opt-in documentation (screenshots/images demonstrating the opt-in process)
- Expected monthly message volume (11 tiers from 10 to 10M+)

---

# Support

## For Issues with This Code:
**Contact: support@cddemo.com**

This is a demonstration project and not officially supported by any organization. For questions about the code, implementation, or bug reports, reach out to the support email above.

## For Customization Questions or Issues:
- Review this guide thoroughly
- Check server logs for specific errors
- Contact: support@cddemo.com

## For Twilio-Specific Questions:
- Check verification status in Twilio Console
- Review rejection email for specific feedback
- Contact Twilio Support: https://support.twilio.com
- Visit Twilio documentation

## For ISV/Aggregators:
- Configure `ISV_NOTIFICATION_EMAIL` in `.env` to receive verification updates
- Ensure end-user business information is used (not ISV information)
- Create templates for common use cases
- Provide example submissions to customers
- Monitor verification status via Twilio Console

---

## Success Stories

### E-Commerce Company
**Use Case:** Order confirmation and shipping notifications  
**Key to Success:** Detailed workflow description with multiple message examples  
**Approval Time:** Next business day

### Healthcare Provider  
**Use Case:** Appointment reminders  
**Key to Success:** Clear opt-in process during appointment booking, HIPAA compliance mentioned  
**Approval Time:** 2 business days

### Financial Services
**Use Case:** Fraud alerts and 2FA  
**Key to Success:** Separated use cases, provided security documentation  
**Approval Time:** Next business day

---

## Final Tips

1. **Don't rush** - Take time to provide complete, accurate information
2. **Be honest** - Accurately represent your business and use case
3. **Be specific** - Details matter more than length
4. **Test URLs** - Verify all links work before submitting
5. **Save examples** - Keep approved verifications as templates
6. **Use END-USER info** - This is the most common mistake
7. **Match message samples to use case** - Mismatched examples cause rejection
8. **Prepare BRN documents** - Have CP 575 or official registration ready

**Remember:** The more detailed and accurate your submission, the faster your approval!

---

**© 2026 CD Demo. All rights reserved.**

**Note:** This is a demonstration project and is not officially supported by any organization.

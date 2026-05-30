# Toll-Free Verification Success Guide

This guide helps customers successfully complete toll-free verification on the first try.

## Quick Start

1. **Click the ℹ️ icons** next to any form field for detailed help
2. **Read the tips** - they explain exactly what Twilio needs
3. **Use the examples** - see what good submissions look like
4. **Avoid common mistakes** - listed in red boxes

## Review Timeline

⏱️ **Typical Review Time:** 1-2 business days  
📧 **Updates:** Sent to ISV notification email  
✅ **Success Rate:** Higher with detailed, specific information

## ⚠️ CRITICAL: ISV vs End-User Business Information

**This is the #1 reason for rejection!**

Toll-Free Verification requires the business information of the **END-USER** (the business that customers recognize and engage with), **NOT the ISV**.

### When to use END-USER information:
- ✅ The end business is sending messages to their customers
- ✅ Messages are branded with the end business name
- ✅ Customers opted in through the end business

### When ISV information is acceptable:
- ✅ ISV is the sole message content creator
- ✅ ISV directly manages opt-in process
- ✅ Messages are branded with ISV name

**When in doubt:** Use the END BUSINESS information that customers recognize!

---

## Top 10 Tips for Approval

### 1. Be Specific in Your Use Case Description
❌ **Bad:** "Customer notifications" or "Marketing"  
✅ **Good:** "This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop"
✅ **Good:** "Customers receive order confirmation immediately after purchase, followed by shipping updates with tracking numbers when items ship."

**Why it matters:** Vague descriptions are the #1 reason for rejection.

### 2. Include Realistic Message Samples (That Match Your Use Case!)
Your sample should include:
- ✅ Actual content customers will see
- ✅ Variable placeholders (e.g., [ORDER_ID])
- ✅ Opt-out language (STOP, UNSUBSCRIBE)
- ✅ Contact information if needed
- ✅ **MUST match the use case category you selected**

**Example for Marketing:**
```
Thank you for being a loyal customer of John's Coffee Shop. Enjoy 10% off your next purchase. Reply STOP to opt out.
```

**Example for Order Notifications:**
```
Order #[ORDER_ID] confirmed! Estimated delivery: [DATE]. Track: [LINK]. Questions? Call 1-800-XXX-XXXX. Reply STOP to opt out.
```

❌ **Bad:** Sending "Your appointment is today at 10:00 AM" when use case is Marketing (doesn't match!)

### 3. Use Physical Business Address
❌ **Don't use:** P.O. Box, virtual office, residential address  
✅ **Use:** Actual business location from your registration

### 4. Provide Complete URLs
❌ **Bad:** `www.example.com`  
✅ **Good:** `https://www.example.com`

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
- ✅ http://www.example.com/signupforsms (direct opt-in page)
- ✅ http://www.example.com/opt-in-screenshot.png (hosted image)
- ✅ http://www.example.com/opt-in-process.pdf (detailed document)

**Bad Examples:**
- ❌ http://www.example.com (homepage, not specific opt-in)
- ❌ URLs behind login/password
- ❌ "Customer receives text receipt" (too vague)

### 10. Use Business Email (Not Personal)
❌ **Avoid:** Gmail, Yahoo, Hotmail for business contact  
✅ **Use:** Email on your business domain

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
| **Marketing** | Promotional messages | "20% off sale this weekend!" ⚠️ *Requires explicit opt-in* |

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
✅ You'll receive a verification SID (e.g., `HH...`)

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
✅ Start sending messages immediately  
✅ Number marked as verified in console  
✅ Full throughput available

### 5. If Rejected
📧 Email explains reasons for rejection  
🔄 Fix issues and resubmit  
💡 Address all feedback points

## Best Practices for ISVs

### Before Offering to Customers
- ✅ Test with your own toll-free number first
- ✅ Create templates for common use cases
- ✅ Prepare example screenshots customers can reference
- ✅ Document your standard opt-in process

### Supporting Your Customers
- ✅ Provide examples of good submissions
- ✅ Review submissions before they submit (optional)
- ✅ Keep library of approved use case descriptions
- ✅ Help customers prepare screenshots in advance

### After Approval
- ✅ Keep records of verifications
- ✅ Monitor for any compliance issues
- ✅ Ensure customers honor STOP requests immediately
- ✅ Maintain accurate opt-in records

## Checklist Before Submitting

Use this checklist to verify your submission is complete:

- [ ] ⚠️ **END-USER business information provided (not ISV, unless ISV is sole content creator)**
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

## Need More Help?

### In-App Guidance
- Click ℹ️ icons next to any form field
- View detailed tips, examples, and common mistakes
- See good vs. bad examples

### Documentation
- [Twilio Toll-Free Verification Docs](https://www.twilio.com/docs/messaging/compliance/toll-free)
- [Regulatory Compliance Guide](https://www.twilio.com/docs/messaging/compliance)
- See `guidance.js` for all field requirements

### Support
- Check verification status in Twilio Console
- Contact Twilio Support for questions
- Review rejection email for specific feedback

## Success Stories

### ✅ E-Commerce Company
**Use Case:** Order confirmation and shipping notifications  
**Key to Success:** Detailed workflow description with multiple message examples  
**Approval Time:** Next business day

### ✅ Healthcare Provider  
**Use Case:** Appointment reminders  
**Key to Success:** Clear opt-in process during appointment booking, HIPAA compliance mentioned  
**Approval Time:** 2 business days

### ✅ Financial Services
**Use Case:** Fraud alerts and 2FA  
**Key to Success:** Separated use cases, provided security documentation  
**Approval Time:** Next business day

## Final Tips

1. **Don't rush** - Take time to provide complete, accurate information
2. **Be honest** - Accurately represent your business and use case
3. **Be specific** - Details matter more than length
4. **Test URLs** - Verify all links work before submitting
5. **Save examples** - Keep approved verifications as templates

**Remember:** The more detailed and accurate your submission, the faster your approval! 🚀

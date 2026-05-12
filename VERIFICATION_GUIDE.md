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

## Top 10 Tips for Approval

### 1. Be Specific in Your Use Case Description
❌ **Bad:** "Customer notifications"  
✅ **Good:** "Customers receive order confirmation immediately after purchase, followed by shipping updates with tracking numbers when items ship."

**Why it matters:** Vague descriptions are the #1 reason for rejection.

### 2. Include Realistic Message Samples
Your sample should include:
- ✅ Actual content customers will see
- ✅ Variable placeholders (e.g., [ORDER_ID])
- ✅ Opt-out language (STOP, UNSUBSCRIBE)
- ✅ Contact information if needed

**Example:**
```
Order #[ORDER_ID] confirmed! Estimated delivery: [DATE]. Track: [LINK]. Questions? Call 1-800-XXX-XXXX. Reply STOP to opt out.
```

### 3. Use Physical Business Address
❌ **Don't use:** P.O. Box, virtual office, residential address  
✅ **Use:** Actual business location from your registration

### 4. Provide Complete URLs
❌ **Bad:** `www.example.com`  
✅ **Good:** `https://www.example.com`

All URLs must:
- Include https:// or http://
- Be publicly accessible
- Load without errors
- Show relevant information

### 5. Match Your Business Registration
- Use your **legal business name** (not DBA)
- Provide **EIN** for registered businesses
- Select correct **business type**
- Address should match public records

### 6. Explain Your Opt-In Process Clearly
Describe step-by-step:
1. Where customers see the opt-in (checkout page, signup form, etc.)
2. Exact wording of checkbox/button
3. When opt-in occurs
4. Confirmation they receive

**Good Example:**
"On our signup page, users check an empty checkbox labeled 'I agree to receive SMS notifications about my account' before clicking 'Create Account'."

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

### 9. Provide Opt-In Screenshots (When Required)
For web forms, text keywords, QR codes:
- Upload to publicly accessible URL
- Show actual implementation (not mockups)
- Include clear opt-in language in screenshot
- Multiple angles/steps okay

Not required for: Verbal consent

### 10. Use Business Email (Not Personal)
❌ **Avoid:** Gmail, Yahoo, Hotmail for business contact  
✅ **Use:** Email on your business domain

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
- **10** = 1-1,000 messages/month
- **1000** = 1,000-10,000 messages/month
- **10000** = 10,000-100,000 messages/month
- **100000** = 100,000-250,000 messages/month
- **250000** = 250,000+ messages/month

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

- [ ] Toll-free number is purchased in Twilio account
- [ ] Business name matches legal registration
- [ ] Physical address provided (no P.O. Box)
- [ ] Business registration number included (if not sole proprietor)
- [ ] All URLs include https:// and are publicly accessible
- [ ] Privacy policy mentions SMS messaging
- [ ] Use case description is detailed (3+ sentences)
- [ ] Message samples include STOP language
- [ ] HELP message provides contact information
- [ ] STOP message confirms unsubscription
- [ ] Opt-in process described step-by-step
- [ ] Screenshots uploaded (if required)
- [ ] Message volume is realistic
- [ ] Business email used (not personal)

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

# Business Registration Number (BRN) Requirements

## ⚠️ CRITICAL UPDATE: Effective February 17, 2026

Business Registration Numbers are now **REQUIRED** for all Toll-Free Verification submissions. This is a carrier-driven requirement aimed at improving trust, deliverability, and overall messaging security.

---

## Overview

Starting February 17, 2026, all toll-free verification submissions must include a valid Business Registration Number (BRN) that passes automated validation. This requirement applies to:

- All new toll-free number verifications
- Re-verifications of existing toll-free numbers
- Updates to existing toll-free verification profiles

---

## Common BRN Validation Failures

When BRN validation fails, it's typically due to one of the following issues:

### 1. Legal Business Name Mismatch (MOST COMMON ⚠️)

The legal business name **MUST EXACTLY MATCH** official registration records.

#### For U.S. Entities:

**Requirements:**
- Name must match IRS records exactly
- Use the name as shown on the **CP 575 EIN Confirmation Letter** or **IRS 147C letter**
- Include all punctuation, abbreviations, and legal entity suffixes as they appear on official documents

**Common Causes of Failure:**
- ❌ Using a DBA (Doing Business As) or trade name instead of the legal name
  - ✅ **Correct:** Use legal name in the business name field, DBA in the DBA field
- ❌ Adding or removing punctuation, abbreviations, or suffixes
  - ❌ Example: "Acme Coffee Shop, LLC" when official is "Acme Coffee Shop LLC"
  - ✅ **Correct:** Match exactly as shown on CP 575/IRS 147C
- ❌ Using the name from W-9 or W-2 forms instead of official registration documents
  - ✅ **Correct:** Always use CP 575 EIN Confirmation Letter or IRS 147C letter
- ❌ Not combining multi-line legal names into a single field when required
  - ✅ **Correct:** Combine all lines into one field if your registration shows multiple lines

**Example:**
```
❌ WRONG: "Joe's Coffee" (DBA name)
✅ CORRECT: "Joseph Smith LLC" (legal name from CP 575)
           DBA field: "Joe's Coffee"
```

#### For Non-U.S. Entities:

**Requirements:**
- Name must match official business registration documents issued by the relevant authority
- Use the exact name as shown on government-issued business registration certificates

---

### 2. Incorrect BRN Value or Identifier Type

The Business Registration Number must match the selected identifier type and follow the correct format.

#### Common Identifier Types and Formats:

| Identifier Type | Format | Example | Notes |
|----------------|--------|---------|-------|
| EIN (U.S.) | XX-XXXXXXX | 12-3456789 | Include dashes |
| CBN | 9 digits | 123456789 | First 9 digits only |
| Other | Varies | Varies | Check official documents |

#### Common Issues:

- ❌ Selecting the wrong identifier type
  - ✅ **Correct:** EIN for U.S. entities, CBN for Canadian, etc.
- ❌ Including extra digits or suffixes
  - ❌ Example: 12-3456789-001 (extra suffix)
  - ✅ **Correct:** 12-3456789
- ❌ Using a personal identifier instead of a business identifier
  - ❌ Using SSN instead of EIN
  - ✅ **Correct:** Use business EIN only
- ❌ Formatting issues such as missing dashes or incorrect spacing
  - ❌ Example: 123456789 (missing dashes for EIN)
  - ✅ **Correct:** 12-3456789

---

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

---

### 4. Newly Registered Businesses

If your business was recently created, it may not yet appear in validation systems.

**Timeline:**
- Records typically take **~60 days** to propagate to validation systems
- Validation may fail even if information is correct during this period

**Solution:**
- Prepare supporting documents for manual review (see below)
- Include documentation showing registration date
- Proceed with manual review process

---

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
- ✅ Google Drive (set sharing to "Anyone with the link can view")
- ✅ Dropbox (create public share link)
- ✅ Your business website (if you have secure hosting)
- ✅ Other cloud storage with public link sharing

**Important:**
- ⚠️ Ensure links are **publicly accessible** (no login/password required)
- ⚠️ Test the link in an incognito/private browser window
- ⚠️ Keep links active throughout the verification process

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

✅ **Benefits:**
- Speeds up the manual review process
- Provides definitive proof of business registration
- Reduces back-and-forth with reviewers

⚠️ **Important:**
- Providing documents early speeds up review but does **NOT guarantee automatic approval**
- Manual review still evaluates all aspects of your submission
- Typical manual review time: 3-5 business days (vs. 1-2 days for automated approval)

---

## Best Practices

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

---

## Examples

### ✅ Successful Submission Example (U.S. Entity)

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

### ❌ Common Failure Example

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
- ❌ Legal name missing "Roasters LLC" suffix
- ❌ EIN missing dashes (should be 12-3456789)

---

## Troubleshooting

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

---

## Frequently Asked Questions

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

## Additional Resources

- [Twilio Toll-Free Verification Guide](https://www.twilio.com/docs/messaging/compliance/toll-free)
- [TrustHub API Documentation](https://www.twilio.com/docs/trusthub/api)
- [Compliance Embeddable Documentation](https://www.twilio.com/docs/messaging/compliance/toll-free/compliance-embeddable-onboarding)

---

## Support

If you continue to experience issues after following this guide:

1. Review all fields against this document
2. Ensure supporting documents are included
3. Contact Twilio Support with:
   - Your submission details
   - Error messages received
   - Links to supporting documents

**For ISV/Aggregators:**
- Configure `ISV_NOTIFICATION_EMAIL` in `.env` to receive verification updates
- Ensure end-user business information is used (not ISV information)

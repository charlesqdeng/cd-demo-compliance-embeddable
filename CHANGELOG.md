# Changelog

## [2.0.0] - 2026-05-12

### Major Updates - Twilio Documentation Alignment

This release aligns the entire application with official Twilio toll-free verification requirements and significantly enhances the user experience with comprehensive guidance.

### ✨ New Features

#### Field-by-Field Guidance System
- **Interactive Help Icons (ℹ️)**: Added clickable help icons next to every form field
- **Comprehensive Examples**: Each field now shows:
  - ✅ Approved examples from Twilio documentation
  - ❌ Rejected examples with explanations
  - 💡 Detailed tips and best practices
  - ⚠️ Common mistakes to avoid
- **Modal Help System**: Click any ℹ️ icon to see detailed guidance in a modal popup

#### Enhanced Form Fields
- **Split Business Contact**: Changed from single field to 4 separate fields as required by Twilio:
  - Business Contact First Name
  - Business Contact Last Name
  - Business Contact Email
  - Business Contact Phone Number
- **Expanded Message Volume**: Added 6 new message volume tiers:
  - Now includes: 10, 100, 1K, 10K, 100K, 250K, **500K, 750K, 1M, 5M, 10M+**
  - Added guidance to consider 6-month growth projections

#### Critical ISV vs End-User Business Guidance
- **Prominent Warning**: Added critical warning about using END-USER business information
- **Documentation**: Comprehensive explanation in all docs about when to use end-user vs ISV info
- **Form UI**: Red alert box in index.html warning about ISV vs end-user distinction
- **Top Rejection Prevention**: Addresses #1 reason for verification rejection

### 📝 Enhanced Documentation

#### New Content in guidance.js
- Complete VERBAL opt-in IVR script example
- Detailed VIA_TEXT keyword campaign example with step-by-step process
- Opt-in type requirements section (what documentation is needed for each type)
- Social media pages acceptable for business website (if set to public)
- Message sample must match use case category requirement
- Additional Information field for privacy policies and justifications

#### Updated VERIFICATION_GUIDE.md
- ISV vs End-User Business section at the top (critical warning)
- Enhanced opt-in documentation requirements by type
- Complete VERBAL IVR script example
- Detailed VIA_TEXT keyword campaign example
- Expanded message volume ranges with all 11 tiers
- Updated checklist with all new requirements
- New rejection reason: Using ISV info instead of end-user

#### Updated Documentation Files
- **README.md**: Added features list, updated API examples, added ISV_NOTIFICATION_EMAIL
- **SETUP.md**: Enhanced "What You'll Need" section, added ISV email configuration notes
- **.env.example**: Expanded ISV_NOTIFICATION_EMAIL documentation

### 🔧 Technical Improvements

#### Backend (server.js)
- Properly uses `ISV_NOTIFICATION_EMAIL` from environment configuration
- Removed customer-facing notification email field (ISV configuration only)
- Enhanced validation for all new fields

#### Frontend (script.js)
- Updated message volume dropdown with all 11 tiers
- Added 6-month projection guidance text
- Removed notification email field from customer form
- Updated form data collection to match Twilio API requirements

#### Guidance System (field-help.js & guidance.js)
- New modal sections for requirements by opt-in type
- Support for verbal opt-in script examples
- Enhanced rendering of good/bad examples
- Field mappings updated for all new fields

### 🐛 Bug Fixes
- Fixed notification email configuration (now ISV-only, not customer-facing)
- Corrected message volume tier values to match Twilio's official options
- Fixed business contact field structure (split into 4 fields)

### ⚠️ Breaking Changes
- **Notification Email**: No longer collected from customers. Must be configured in `.env` file by ISV.
- **Business Contact**: Changed from single combined field to 4 separate fields. Update any custom integrations accordingly.
- **Message Volume**: Values updated to match Twilio's official tiers. Previous custom ranges removed.

### 📦 Environment Variables
New/Updated variables in `.env`:
```env
ISV_NOTIFICATION_EMAIL=your-isv-email@example.com  # Required - All notifications go here
```

### 🎯 Impact on Users
- **Higher Approval Rate**: Comprehensive guidance reduces rejections from common mistakes
- **Faster Submissions**: Users spend less time figuring out what to enter
- **Better Understanding**: Clear examples show exactly what Twilio expects
- **ISV vs End-User Clarity**: Prevents #1 rejection reason

### 📚 Documentation Updates
All documentation files updated with:
- ISV notification email configuration
- Field-by-field guidance references
- Enhanced examples and tips
- Links to official Twilio documentation

### 🔗 Related Documentation
- [VERIFICATION_GUIDE.md](VERIFICATION_GUIDE.md) - Complete success guide
- [guidance.js](public/guidance.js) - All field guidance definitions
- [field-help.js](public/field-help.js) - Help icon implementation

---

## [1.0.0] - 2026-05-11

### Initial Release
- Basic toll-free verification form
- Twilio API integration
- TrustHub Customer Profile creation
- CD Demo branding
- Embeddable Twilio form integration

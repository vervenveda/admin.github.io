CasePath™ — Private Service Organizer

Program principle: One Door, No Wrong Door

CasePath™ is a private, local-first coordination workspace for people and families who may need help across several systems at once.

Core functions

Individual, family, senior, veteran, and community intake

Safe-contact and communication preferences

Strengths-based needs assessment

Urgency and priority tracking

Warm referrals and confirmed handoffs

Benefits and document checklists

Appointments and follow-ups

Fact-based case notes with sharing scopes

Shared action plans and outcomes

Consent records, expiration, revocation, and scoped exports

Custom local resource directory

De-identified aggregate outcome reports

Private workspace backup

Optional encrypted local storage

Persistent browser-storage request

Private placement

CasePath may contain highly sensitive personal information.

Keep the repository private and leave GitHub Pages disabled. A static webpage cannot provide server-side access control. The built-in passphrase encryption protects browser-stored workspace data, but it does not make a publicly hosted application private.

Data-minimization rules

Do not enter:

Full Social Security numbers

Banking or payment credentials

Benefit-system passwords

Immigration-document numbers

Medical-record or insurance-account numbers

School-system passwords

Copies of identification documents

Any information that is not necessary for service coordination

The benefits and document checklist records availability and status, not document numbers.

Consent-aware exports

CasePath provides three export scopes:

Client action-plan copy

Referral handoff summary

Internal case summary

Referral-shareable notes are excluded when active referral-sharing consent is not recorded. Every export must still be reviewed before sharing.

Encryption

Optional local encryption uses:

PBKDF2-HMAC-SHA256

600,000 iterations

AES-GCM authenticated encryption

There is no password-recovery service. Preserve the passphrase securely and export private backups.

Compliance warning

CasePath is not automatically HIPAA-, FERPA-, 42 CFR Part 2-, legal case-management-, social-service-, or government-records-compliant.

Organizations must review applicable:

Privacy and consent law

Mandatory-reporting duties

Records retention

Breach response

Staff access

Device security

Backup handling

Public-records requirements

Professional licensing and scope-of-practice rules

Suggested repository structure

CasePath/
├── index.html
├── README.md
└── SECURITY.md

Ownership

CasePath™ · One Door, No Wrong DoorVerve N Veda · Jennifer Kay Pearl · All Rights Reserved 2026

# Khaemenes Academy → Verve N Veda Private Admin Sync

Version 1.0 · 2026-08-20

## Canonical administrative destination

`vervenveda/admin.github.io` is the canonical private administrative repository for Academy aggregate reporting, Beta Program coverage, review tooling, and future protected administrative integrations.

The public `vervenveda/vervenveda.github.io/admin/` surface is not the authority for confidential administration. It may remain as a public-safe compatibility or presentation layer, but sensitive or operator-only capability belongs here.

## Reporting domains

The private admin system should be able to summarize:

- family count
- authorized-adult count
- K–12 learner count
- adult Higher Learning scholar count
- total learners
- exact grade distribution from Pre-K through Grade 12
- campus/stage distribution
- learner-scoped course/class record count
- learners with course activity
- Student/Scholar ID issuance health
- Beta Program coverage and participation aggregates
- administrative review queues

## Security boundary

Do not commit or mirror these items into this repository merely because it is private:

- plaintext passwords or passcodes
- password hashes exported from production authentication systems
- email/SMS verification codes
- session cookies or session tokens
- recovery tokens
- signing-key vaults
- child birth dates unless strictly required by a separately authorized record system
- home addresses
- student response packages
- assessment answer keys/question banks
- private anti-abuse thresholds or internal fraud-scoring rules
- Noema/HTURT private reasoning internals

The private repository is an administrative code and configuration surface, not a credential database.

## Preferred data path

```text
Protected Account / Academy Services
        ↓
Aggregate Reporting Service
        ↓
Private Admin Data Bridge
        ↓
vervenveda/admin.github.io
```

Browser-local Academy data may be used for development diagnostics only and must be labeled local/non-global.

## Beta Program path

```text
Visible public homework / course / game / tool / interactive page
        ↓
Verve N Veda Beta doorway
        ↓
https://vervenveda.com/beta/
        ↓
public-safe route attribution only
        ↓
aggregate/private administrative reporting
        ↓
vervenveda/admin.github.io
```

Source attribution may include ordinary public hostname/pathname and surface classification. It must not include learner IDs, family IDs, answers, form values, URL query strings, URL hashes, browser-storage contents, or credentials.

## Academic firewall

Account risk, Beta participation, or administrative security review must never silently alter:

- grade
- mastery
- placement
- course completion
- certificate eligibility
- mentor conclusions

Administrative evidence can trigger review or hold actions, but formal academic changes remain under the appropriate course/teacher/Academy authority.

## High School release rule

High School integration remains on `hardening/archaemenes-highschool` until a deliberate release. Admin reporting must distinguish branch coverage from public deployment status.

# Verve N Veda Private Administration

This repository is the canonical private administrative code surface for Verve N Veda and Khaemenes Academy. GitHub Pages remains disabled.

It is used for operator tooling, Academy aggregate reporting, Beta Program coverage, review workflows, and future protected administrative integrations. It is **not** a credential database and must not become one.

## Canonical Academy/Admin sync

Academy administrative reporting now syncs toward this repository rather than treating the public `vervenveda/vervenveda.github.io/admin/` directory as the confidential authority.

See:

- `protocols/ACADEMY_ADMIN_SYNC_V1.md`
- `data/beta/COVERAGE.json`

The reporting model includes families, authorized adults, K–12 students, Higher Learning scholars, exact grade distribution, campus/stage distribution, learner-scoped course/class activity, Student/Scholar ID health, Beta Program coverage/participation aggregates, and administrative review queues.

Public pages may expose only public-safe aggregate or routing metadata. Protected learner/account information belongs behind authenticated services and controlled data bridges.

## Khaemenes Assessment Review Desk

`apps/Khaemenes_Assessment_Review_Desk_index.html`

The Review Desk is the human-approval layer between confidential assessment grading and credential signing.

Workflow:

1. The private Khaemenes Assessment Authority grades a secure response package.
2. The grader exports an unsigned result with a SHA-256 self-consistency digest.
3. The Review Desk imports that result and verifies its digest locally.
4. The administrator verifies learner identity, retained evidence, assessment score/version, final grade, and any credit decision.
5. The Review Desk exports a `khaemenes-admin-approved-record` handoff.
6. The Assessment Authority production signer accepts that approved handoff and signs the canonical academic record with the device-held ECDSA key.
7. The public Academy verifier checks the resulting signature using only the published Academy public key.

## Security boundaries

Do not commit assessment answer keys, assessment question banks, signing-key vaults, student response packages, plaintext credentials, password hashes exported from production, verification codes, session secrets, recovery tokens, private fraud thresholds, child home addresses, or other unnecessary sensitive learner information.

Use the minimum learner information needed for administrative review. Account-security state must remain separated from academic state: security or Beta review may trigger a hold or human review, but must never silently change grades, mastery, placement, completion, or mentor conclusions.

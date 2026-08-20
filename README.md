# Verve N Veda Private Administration

This repository contains private administrative tools and working interfaces. GitHub Pages remains disabled.

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

- Do not copy assessment answer keys into this repository.
- Do not copy assessment question banks into this repository.
- Do not commit encrypted or decrypted signing-key vaults here.
- Do not commit student response packages or signed-record working files here.
- Use the minimum learner information needed for administrative review.
- The Review Desk does not calculate the official course grade automatically; that remains an administrator decision based on retained evidence.

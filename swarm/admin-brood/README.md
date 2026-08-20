# Araneae Admin Brood

Private defensive swarm for the Verve N Veda administrative network.

## Purpose

The Admin Brood is a local-first, non-destructive defensive observation layer inspired by an immune system. Small narrow-scope agents (“Weblings”) examine approved administrative evidence, correlate unusual conditions, and prepare explainable alerts for human review.

The brood does **not** autonomously delete, quarantine, revoke, rotate credentials, change repository state, execute downloaded material, or expand its own authority.

## Weblings

- **Sentry** — gate/session anomalies and unusual administrative access state.
- **Ledger** — assessment, record, review, and credential-handoff integrity.
- **Weaver** — configuration, repository, routing, and expected-state drift.
- **Hashling** — hashes, manifests, component versions, and integrity mismatches.
- **Vaultling** — secret/key custody boundary violations and accidental sensitive-material placement.
- **Quill** — audit/worklog continuity and unexplained administrative changes.
- **Beacon** — recovery, backup, continuity, and known-good readiness signals.

## Authority model

Observe → Compare → Correlate → Explain → Recommend → Human decision.

Observation is not authority. Suspicion is not proof. A Webling may raise a finding; it may not perform a consequential administrative action by itself.

## Data boundary

The brood may process only administrator-authorized local/imported evidence. It does not crawl arbitrary third-party systems or bypass authentication. Sensitive working evidence should remain local and must not be committed to Git.

## Event severity

- `info` — expected observation or informational condition
- `watch` — unusual condition worth watching
- `investigate` — evidence requires administrator review
- `critical` — strong evidence of a trust-boundary or integrity failure; still requires human action

## Parent principle

**Many small eyes. One careful conclusion. Human authority remains final.**

# Beta Feedback → ADMIN Notification Contract

Status: **Prepared, not connected** (2026-11-06).

## Purpose
Every Beta report should become a single traceable administrator notification once it has been received and accepted by an authenticated **first-party** intake service. This contract does not authorize a public browser to write to ADMIN, and the current public GitHub Pages portal is not the secure inbox.

## Visitor report fields
- `id`: opaque, generated report ID
- `at`, `date`: timestamp and date
- `sourceKey`: page source context, without query strings or fragments; untrusted input
- `idempotencyKey`: one report per source/day; updates keep same report ID
- `page`: affected page, lesson, game, or tool name
- `issueType`: one of `broken-link`, `page-error`, `button-action`, `game-tool`, `lesson-content`, `visual`, `accessibility`, `suggestion`, `other`
- `section`: exact section, control, or feature
- `steps`: actions leading to the issue, including inaction or failed click
- `expected`: expected behavior or appearance
- `observed`: actual behavior, discrepancy, or error
- `suggestion`: visitor-proposed improvement
- `message`: additional description
- `status`: visitor-provided `New`, advisory only (server assigns actual state)

No screenshot or diagnostic attachment upload is authorized by this contract. No private files, student identity, assessment answers, cookies, credentials, network internals, exact user location, or browser-storage values should be collected.

## Secure intake (future)
1. An authenticated first-party receiver validates allowed origin, JSON structure, length limits, rate limits, and untrusted field contents; anti-abuse checks cannot rely solely on CORS.
2. Normalize source page to an approved public-surface identifier; never follow arbitrary visitor-supplied links or execute submitted HTML/scripts.
3. Persist an encrypted or access-controlled report record; enforce an idempotent unique key by origin/day/report identifier. Provide retention and deletion controls.
4. Return a real receipt only after durable acceptance; a client-local save or HTTP 200 without validated persistence is not delivered status.
5. Generate exactly one private ADMIN notification per accepted report/update with: **category, page, section, observed issue, action taken, expected result, suggestion, received time, report ID**.
6. The protected ADMIN dashboard shows filters by severity, type, campus, status and date, with states: `New`, `Acknowledged`, `Investigating`, `Awaiting clarification`, `Resolved`, `Closed`. The administrator remains the final authority over prioritization and closure.
7. Notify administrator through an opted-in private channel without including sensitive report bodies in public artifacts or CI logs.
8. Keep Beta feedback separate from grades, mastery gates, academic evidence and learner accounts. Do not automatically repair code based on a report.

## Current implementation and blockers
- Public form: `vervenveda/vervenveda.github.io/beta/index.html` collects structured reports and preserves local outbox/daily retry semantics.
- Delivery currently depends on a user-browser local `VNV_ADMIN_SETTINGS_V1.bridgeEndpoint`; this is not a published or verified authenticated intake service.
- Manual email fallback prepares a sanitized email but cannot confirm sending.
- ADMIN `apps/Khaemenes_Beta_Brood_Inbox_index.html` imports Araneae-correlated JSON from a local file; it does **not** ingest visitor Beta reports.
- ADMIN repository is public and has GitHub Pages enabled according to GitHub metadata. Do not publish a protected report feed or access-controlled dashboard there until secure hosting is independently verified.

## No-go condition
Do not claim reports appear automatically in ADMIN until an end-to-end test confirms:
public submission → authenticated receiver → persisted report → private notification → protected admin review → acknowledgement / resolution.

The canonical public Beta launcher remains inside the Verve N Veda ecosystem toolbar. The six Mini Clouds, STOS services, and protected Academy data are outside this Beta delivery change.

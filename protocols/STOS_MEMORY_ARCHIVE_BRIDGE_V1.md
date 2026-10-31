# STOS → ADMIN → Conversation Cloud: private bridge contract (draft)
Status: proposed interface; no STOS runtime implementation or authentication verified.

## Boundary
- STOS verifies an existing administrator session **server-side**.
- STOS keeps GitHub App installation credentials or scoped GitHub token **server-side**; never expose in HTML, JS, URL, localStorage or repo.
- Repository: `KhaemenesAcademy/chat-conversations.github.io` (private). Read-only access; no public publishing.
- ADMIN repo is a code surface, not an authentication service; GitHub Pages is disabled.

## Proposed authenticated same-origin endpoints
- `GET /admin/api/memory/health` → JSON `{"service":"memory-archive","authenticated":true,"access":"admin"}` **only** for authenticated admins; otherwise 401/403.
- `GET /admin/api/memory/catalog?cursor=...` → JSON `{"schema_version":1,"items":[{"path":"...","size":123,"sha":"..."}],"next_cursor":null}` with all files recursively and pagination. No path content leaked to unauthenticated clients.
- `GET /admin/api/memory/file?path=<urlencoded-path>` → bytes of authorized file, with Content-Type, no-store, attachment/inline rules, size guard, rate limiting. Resolve paths inside the pinned private repo; reject traversal, symlinks, and arbitrary URLs.

## Integration behavior
- Reader's directory receives catalog from STOS, not a hard-coded public snapshot.
- Reader opens files through authenticated bridge, not an unauthenticated public site path.
- Preserve source fidelity and read-only behavior; PDF preview requires a separate, tested implementation.
- CSRF and origin checks for any future write actions. Apply strict CSP and no-cache/no-index headers.
- Do not trust a client-side `authenticated` flag by itself; it is merely a display signal after server authorization.

## Acceptance tests
1. Unauthenticated catalogue and file requests return 401/403 and no private names.
2. Authenticated ADMIN lists entire current tree, including nested `memory-project` entries.
3. Filename search and folder filtering locate Batch 17 and the Hope completion checkpoint.
4. File fetch returns exact bytes; non-existent paths 404, traversal 400/403, oversized files handled.
5. Session expiration closes access; direct URLs without session fail.
6. Existing reader, Mentor Review, and original sources remain unchanged.

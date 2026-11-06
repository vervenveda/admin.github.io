# ADMIN Consolidation — Security Boundary and Commissioning Gates

Status: **NOT COMMISSIONED FOR PRIVILEGED USE** (2026-11-06)

## Confirmed repository state
- Canonical candidate for the eventual single administrative portal: `vervenveda/admin.github.io/index.html`.
- Repository visibility: **public** (verified from GitHub API on 2026-11-06).
- GitHub reports `has_pages: true` for this repository. Do not assume Pages is private or disabled.
- Current landing page offers a browser-local 10-digit gate. It is **not authentication or authorization**.
- Source navigation currently lists **51** repository-backed tool entrances in `assets/admin-tools-directory.js`; presence in the directory is not approval to process private data.
- Existing public `vervenveda/vervenveda.github.io/admin/` is a resting page. Its historical interfaces were replaced with resting pages in November 2026; recovery branch preserves their previous versions.

## Hard stop: public origin boundary
No private administrative functionality, learner records, credentials, assessment responses, personal archives, API tokens, storage backends, or privileged cloud controls may be activated or connected from a publicly accessible GitHub Pages origin. This includes routing an admin card to a supposedly hidden path, wrapping it in a browser PIN, relying on `noindex`, or using client-side role checks.

Even if a page is not linked in the interface, **the repository files and their history are publicly accessible** while the repository remains public. Restricting the user interface is not a substitute for access control.

## One-door architecture
1. **Public Verve N Veda:** only a neutral administrator resting doorway. No private metadata or access claims.
2. **Protected ADMIN portal:** one server-enforced authentication entry, with authenticated session checks and server-side authorization for each protected API and resource; deny by default.
3. **Administrative apps:** individual tools are granted least-privilege access after explicit dependency review. Sensitive data must never be served as static public HTML or JSON.
4. **Academy, NAIB, STOS, and Mini Clouds:** no automatic activation, reverse proxy, synchronization, or new trust relationship merely because a navigation entry exists.
5. **Audit and recovery:** maintain read-only inventory and rollback evidence without publishing backups, secrets, or user records.

## Commissioning gates (all required)
- [ ] Verify the actual public deployment URL and the behavior of every sensitive application URL unauthenticated.
- [ ] Select an existing *supported* private hosting environment with enforced authentication; GitHub Pages private publishing is not universally available.
- [ ] Restrict repository visibility where appropriate, and separately verify Pages publication/access. Changing repository visibility alone does not prove that historical copies or deployments are inaccessible.
- [ ] Deploy an authentication provider or server session mechanism and independent per-resource authorization. Require MFA for administrative roles.
- [ ] Validate the 51 existing tool entries: public-safe, local-only, protected, historical, or not yet vetted.
- [ ] Audit all historical public admin files and Git history for exposures; rotate any discovered secrets without reproducing them.
- [ ] Confirm service tokens, learner information, backups, browser storage, and private cloud internals never enter public builds or logs.
- [ ] Test denial of access for unauthenticated and unauthorized sessions, including direct URL requests, before promoting any admin function.
- [ ] Test all approved tools, navigation, mobile layout, backup and rollback before cutover.
- [ ] Obtain an explicit go/no-go after a read-only readiness review.

## Existing preservation points
- ADMIN recovery branch: `recovery/2026-11-06-admin-consolidation-919680cf` at `919680cf53e92c55395bba1b8543638ef091e5cb`.
- Main gateway recovery branch: `recovery/2026-11-06-pre-hardening-f4527037` at `f4527037145aa10e15de125b29bb79fd726d63b4`.

These branches are *public version-control references*, not private archives. Never store confidential snapshots in them.

## Operating rule
**One interface does not imply one shared security domain.** Connect features only after the hosting and per-resource access controls are verified. Otherwise leave the function dormant, with clear public-safe explanatory copy.

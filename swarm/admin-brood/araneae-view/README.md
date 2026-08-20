# Araneae Read-Only Admin Bridge

This directory is the display-only bridge between `vervenveda/spyder-cloud` and the Verve N Veda Admin Brood.

## Source of truth

The panel reads only:

`https://raw.githubusercontent.com/vervenveda/spyder-cloud/main/VIEW/generated/snapshot.json`

The snapshot is intentionally sanitized and declares a read-only capability contract.

## Safety boundary

This bridge does not:

- modify the Spyder registry;
- activate or pause a Spyder;
- perform remediation;
- execute rollback;
- write to either repository;
- ingest learner/family data, Beta report bodies, credentials, secrets, or raw security evidence.

If the snapshot is unavailable or fails its read-only safety contract, the panel fails closed and displays an unavailable state. It does not attempt a fallback administrative action.

The existing `swarm-core.js` remains local/no-network and unchanged. Network access is isolated to this display bridge and consists only of a read-only GET for the sanitized snapshot.

# Swarm Convergence Contract

The Verve N Veda Admin Portal is a human-facing convergence plane, not a shared autonomous state machine.

Each brood retains its own source of truth and publishes only a minimal convergence descriptor:

- brood identity and display name;
- schema/version;
- coarse administrative status;
- source-of-truth location;
- optional read-only status-view location;
- contract/schema location;
- authority boundary.

## Hard boundaries

A convergence descriptor MUST declare:

- `humanFinalAuthority: true`
- `autonomousConsequentialAction: false`
- `crossBroodWrites: false`

Discovery does not grant authority. A brood appearing in `convergence.json` does not authorize the Admin Portal, another brood, Araneae, or a Webling/Spyder to mutate that brood's source state.

The portal may render bounded status surfaces and contracts. Cross-brood state changes require a separately authorized human administrative path owned by the relevant subsystem.

## Current topology

- **Araneae Admin Brood** — source of truth: `vervenveda/spyder-cloud`; read-only command view is exposed through `swarm/admin-brood/araneae-view/`.
- **Beta Brood** — Beta administrative contract lives under `swarm/beta-brood/`; its rollout and reporting lane remains independently maintained.

Future broods may join by adding one valid descriptor to `convergence.json`; they do not need to know or import another brood's internals.

> Coordination successful. Human behavior outside monitoring scope.
>
> Sync your ends. Preserve your boundaries.

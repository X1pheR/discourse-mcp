# Upstream tracking

- Origin: https://github.com/discourse/discourse-mcp
- Baseline: v0.3.1
- Revision: bacb67c70aa24e347bd901e8e8972c1b3b6d7c48
- Relationship: community-maintained downstream with ordinary source deltas.
- Initial deltas: configurable fail-closed site allowlisting, optional tool-only
  MCP surface, fast-uri 3.1.7 security lock resolution.
- Updates: compare a stable upstream release against this baseline, preserve
  downstream contract tests, verify the complete candidate before publishing.

## Machine-readable downstream patch register

This inline register is the product-owned logical-patch projection used by SDLC-09 structural verification. Its state does not replace current GitHub issue/PR verification, an actual upstream-compatible tested diff, or any required operator-approved product ADR. Unlinked rows are explicitly nonconformant; no historical fork behavior has been grandfathered. Cross-product integration and release actions remain gated separately. Patch scope and local commit mappings require further semantic review before external contribution.

<!-- SDLC-UPSTREAM-REGISTER:1 -->
```json
{
  "schema_version": 1,
  "upstream": "discourse/discourse-mcp",
  "baseline": "v0.3.1",
  "patches": [
    {
      "id": "DC-P01",
      "kind": "upstream",
      "scope": "Configurable fail-closed Discourse site allowlist",
      "local_commits": [
        "bb3415b"
      ],
      "checked_on": "2026-10-10",
      "issue": null,
      "pr": null
    },
    {
      "id": "DC-P02",
      "kind": "upstream",
      "scope": "Optional tool-only MCP surface",
      "local_commits": [
        "bb3415b"
      ],
      "checked_on": "2026-10-10",
      "issue": null,
      "pr": null
    },
    {
      "id": "DC-P03",
      "kind": "upstream",
      "scope": "fast-uri security lock resolution",
      "local_commits": [
        "bb3415b"
      ],
      "checked_on": "2026-10-10",
      "issue": null,
      "pr": null
    },
    {
      "id": "DC-P04",
      "kind": "upstream",
      "scope": "Maintained downstream product release and verification packaging",
      "local_commits": [
        "bb3415b"
      ],
      "checked_on": "2026-10-10",
      "issue": null,
      "pr": null
    }
  ]
}
```

## Upstream issue/PR submission blocker (verified 2026-10-10)

- **Exact upstream identity:** `discourse/discourse-mcp`, main
  `bacb67c70aa24e347bd901e8e8972c1b3b6d7c48`.
- **Observed public contribution surface:** the repository reports
  `has_issues=false` and `has_discussions=false`. An attempt to create
  a normal upstream issue for the generic opt-in tool-only surface returned
  HTTP 410: `Issues has been disabled in this repository`. No issue or PR
  was created and none is claimed.
- **DC-P01:** the maintained fork has optional fail-closed exact-site
  allowlisting that is absent from current upstream main. The official
  tool `--site` pins one site, but is not equivalent to an allowlist for
  multiple sites. The public upstream issue mechanism is unavailable.
- **DC-P02:** the maintained fork can suppress MCP resources/prompts while
  retaining tools. Current `--toolsets` only filters tools and
  `--tools_mode discourse_api_only` restricts remote discovery; they
  are not equivalent to a tools-only MCP protocol surface. Creating its
  upstream issue was explicitly rejected with HTTP 410.
- **DC-P03:** official main's two lockfiles still resolve `fast-uri`
  3.1.5; the maintained fork resolves 3.1.7. This security/dependency
  delta remains unadopted and needs an upstream-compatible patch or
  accepted equivalent future upstream release. The code delta does not
  imply that an issue/PR was accepted.
- **DC-P04:** distinct Hypershell distribution identity, source verifier,
  pinned Docker/CI tooling and release packaging need to be separated into
  upstream-compatible generic patches versus product-owned distribution
  policy. No generic upstream issue/PR is assumed for Hypershell-only
  details, and no product ADR approval has been granted.

Under the canonical Maintained Downstream standard, **all four rows stay
nonconformant**. Disabled GitHub Issues do not silently waive the mandatory
upstream issue + linked PR contract. An operator must separately dispose
of the exact upstream contribution-channel blocker, select a verified
maintainer-supported contribution pathway if one becomes available, or
explicitly approve narrowly scoped product divergence with a valid product
ADR and review/exit date. No such approval is recorded here. Do not publish
a new downstream release or pretend the unresolved rows are conformant.

## Convergence lifecycle

Verify existing upstream issues and PRs, current default-branch equivalence, and source-owned regression evidence before submitting missing contributions. A PR that is closed without merge is nonconformant, and a merged PR is not automatically present in an immutable official release. Remove a downstream patch only on a tested candidate against a suitable released upstream artifact. Retire the fork only after verified patch elimination, accepted distribution/ADR disposition, rollback readiness, consumer parity, and separate operator approval for production/retirement.


## Unapproved distribution disposition proposal — DC-P04

This is a proposal for an operator decision, not an approved ADR or a conformance exception. The register row remains unlinked and nonconformant. Exact source candidate: `779084943928ebae2ad967d9502986d1a524885b`; mapped historical commits: `bb3415b`. Initial/import commits can contain baseline and unrelated application files; approval must not cover the entire mapped commit merely because it appears in this row.

Proposed narrow scope: Only standalone product metadata, runtime/build packaging and canonical verification/publication. The initial commit also imports application source; that imported source is not an exception scope. Multi-site confinement, tool-only registration and dependency changes remain DC-P01/P02/P03.

Requested decision: retain this precisely bounded product-owned distribution adapter, or move/remove it through the existing source/release/deployment owners when the upstream artifact supplies an equivalent accepted distribution. Our package names, registry targets and operator release controls do not constitute a useful upstream feature request; do not manufacture an issue/PR asking upstream to adopt downstream ownership. Any reusable application or verification improvement discovered in this history still needs its own tested upstream-compatible contribution.

Before an approved disposition can clear a gate, the operator-owned product ADR must identify the exact retained scope, rationale, owner, acceptance evidence and review/exit trigger. Proposed review trigger: the next suitable official upstream release or2026-11-14, whichever comes first. Exit requires equivalent released functionality and distribution, accepted source/runtime/consumer parity, rollback readiness and the existing explicit production/retirement acceptance. This proposal authorizes none of those transitions and approves no missing contribution.

The existing shared repository/release lifecycle invokes the single canonical SDLC checker before managed tag/publication/recovery transitions. Direct public workflow integration remains incomplete: the checker source is private and repository-scoped public GitHub tokens cannot read it. No production credentials, privileged public runner, second checker or extra service was introduced.


## Unapproved functional disposition proposals — DC-P01/P02/P03

These are separate operator-decision proposals, not approved ADRs. Exact inspected source owner: bb4b51b630ebb8cf167ae7fd8f4e17706110547a. The existing observed has_issues=false/has_discussions=false and issue-create HTTP410 response block the required official issue/PR pair. This is a contribution-channel refusal, not evidence that maintainers rejected the individual implementations. No alternate channel, account or tool will be used to bypass it.

DC-P01: proposed scope is configuredAllowedSites and the optional exact-site allowlist admission in src/site/state.ts, including required-absent/empty fail-closed behavior and downstream_allowlist.test.ts. Existing --site single-site pinning is not multi-site allowlist equivalence. Imported tool/application code and distribution DC-P04 are excluded. Retention needs an exact operator ADR; removal needs equivalent released confinement and consumer acceptance.

DC-P02: proposed scope is HYPERSHELL_DISCOURSE_TOOL_ONLY_SURFACE admission around resource/prompt registration in src/index.ts. Native tools remain available with the flag; toolset/API-only tool discovery does not establish equivalent protocol resource/prompt suppression. Imported tool definitions and distribution DC-P04 are excluded. Retention needs an exact operator ADR until a supported issue channel and upstream equivalent exist.

DC-P03: proposed scope is only the retained fast-uri3.1.7 lock resolution and matching package integrity, rather than the entire initial imported commit. Upstream lockfiles currently documented here resolve3.1.5. Prefer retirement against a suitable integrity-pinned official release with equal security behavior; otherwise an operator ADR must expressly cover this dependency delta. This proposal does not approve blanket security exceptions or claim current full-suite acceptance.

Review when the official contribution channel changes, on the next suitable upstream release, or2026-11-14, whichever occurs first. The operator must record separate exact scopes, rationale, owner, existing source-owned acceptance evidence and exit triggers. All three machine rows remain unpaired/nonconformant and DC-P04 remains separately unapproved. No new release, production change or fork retirement is authorized.

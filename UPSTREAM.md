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

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

## Convergence lifecycle

Verify existing upstream issues and PRs, current default-branch equivalence, and source-owned regression evidence before submitting missing contributions. A PR that is closed without merge is nonconformant, and a merged PR is not automatically present in an immutable official release. Remove a downstream patch only on a tested candidate against a suitable released upstream artifact. Retire the fork only after verified patch elimination, accepted distribution/ADR disposition, rollback readiness, consumer parity, and separate operator approval for production/retirement.

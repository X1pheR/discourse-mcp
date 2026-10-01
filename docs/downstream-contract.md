# Downstream preservation contract

This community-maintained downstream tracks discourse/discourse-mcp v0.3.1
(bacb67c70aa24e347bd901e8e8972c1b3b6d7c48). The initial release moves existing
accepted source deltas into ordinary maintained source; it introduces no
intentional external behavior change.

| ID | Required behavior | Acceptance |
| --- | --- | --- |
| DSC-01 | When HYPERSHELL_REQUIRE_SITE_ALLOWLIST=true, absent or empty accepted sites MUST abort construction/startup. A configured allowlist MUST reject every unlisted normalized site before an HTTP request. | Positive normalization and denied-origin unit tests; missing/empty startup tests. |
| DSC-02 | When HYPERSHELL_DISCOURSE_TOOL_ONLY_SURFACE=true, MCP resources and prompts MUST remain unregistered. | Actual stdio MCP initialization and list-tools/resources/prompts acceptance. |
| DSC-03 | Anonymous search,topics plus discourse_api_only MUST expose exactly the existing eight non-writing tools. No remote discovery or allow_writes is introduced. | Packaged process surface acceptance, annotations and exact tool set. |
| DSC-04 | The reviewed fast-uri security resolution MUST remain in the frozen dependency graph; the initial 3.1.6 baseline MUST use fixed 3.1.7 before release because the current security gate reports two applicable HIGH findings. | Frozen install, lock inspection and dependency/image scan. |
| DSC-05 | Existing non-root HTTP packaging and stateful-session behavior MUST remain compatible with the existing independent bridge. | Canonical build and HTTP health/session smoke in an isolated candidate; production gateway acceptance before any cutover completion. |
| DSC-06 | Product source, tests, build and upstream tracking MUST have one downstream owner. Infrastructure MUST own only deployment policy and artifact consumption. | Source identity and deployment consumer/ref checks. |

The allowed deployment origins, gateway registration and bridge remain deployment-owned.
This migration MUST NOT add authentication, writes, origins or a persistent forum corpus.
The exact previous production artifact is retained until any separately accepted cutover.

Patch-level release correction: source scan on 2026-10-01 reported CVE-2026-84292/CVE-2026-84394 against pnpm fast-uri 3.1.6, plus stale npm fast-uri 3.1.5. Both lockfiles move to registry-verified 3.1.7. No new API, origin or permission is introduced. Verification containers MUST run the actual tests as a non-root user.

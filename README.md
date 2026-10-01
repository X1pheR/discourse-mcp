# Discourse MCP downstream

A community-maintained downstream of [Discourse MCP](https://github.com/discourse/discourse-mcp),
based on upstream v0.3.1. It adds configurable fail-closed site allowlisting and
an optional tool-only MCP surface, and retains the reviewed fast-uri 3.1.7 lock update.
This distribution is not the official Discourse release. The upstream MIT license
and attribution remain in LICENSE.

## Supported baseline

Node 24.21.0, pnpm 10.14.0, frozen pnpm dependency graph, Linux OCI containers.
The accepted deployment profile is anonymous, read-only, and limited to
search/topics without remote-tool discovery. Broader upstream modes are inherited
source, not accepted deployment permissions. Package publication to the upstream
npm name and registry identity is disabled.

## Build and verify

Run ./scripts/verify.sh with Docker available. It builds the source, runs all
upstream and downstream tests, and verifies the actual MCP surface with networking
disabled. Run ./scripts/build.sh to build the non-root production image.

Example stdio invocation after a frozen pnpm install and build:

```sh
HYPERSHELL_REQUIRE_SITE_ALLOWLIST=true \
HYPERSHELL_DISCOURSE_ALLOWED_SITES=https://meta.discourse.org \
HYPERSHELL_DISCOURSE_TOOL_ONLY_SURFACE=true \
node dist/index.js --transport stdio --toolsets search,topics --tools_mode discourse_api_only
```

Select an accepted site using discourse_select_site before search/topic reads.
Allowlist values are normalized URLs, including any installation base path.
The required flag aborts startup on missing/empty allowlists. The tool-only flag
suppresses registered resources and prompts. Do not add --allow_writes or auth
pairs for the accepted anonymous profile. Selecting a site performs an anonymous
/about.json read; other tools read public forum data.

HTTP mode retains upstream loopback/host validation and single-session behavior.
A gateway supporting multiple consumer sessions therefore needs its separately
owned transport bridge. This product does not silently change that session contract.

See [tool reference](docs/tools.md), [preservation contract](docs/downstream-contract.md),
[upstream tracking](UPSTREAM.md), and [upstream documentation](README.upstream.md).

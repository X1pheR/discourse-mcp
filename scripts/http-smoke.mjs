import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
const proc = spawn(process.execPath, ['dist/index.js', '--transport', 'http', '--port', '3000',
  '--toolsets', 'search,topics', '--tools_mode', 'discourse_api_only', '--log_level', 'error'], {
  env: { ...process.env, HYPERSHELL_REQUIRE_SITE_ALLOWLIST: 'true',
    HYPERSHELL_DISCOURSE_ALLOWED_SITES: 'https://example.com', HYPERSHELL_DISCOURSE_TOOL_ONLY_SURFACE: 'true' },
  stdio: ['ignore', 'ignore', 'inherit']
});
const timer = setTimeout(() => { proc.kill('SIGKILL'); process.exit(1); }, 30000);
const client = new Client({ name: 'http-package-acceptance', version: '1.0.0' });
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try { ready = (await fetch('http://127.0.0.1:3000/health')).ok; } catch {}
    if (ready) break;
    await delay(100);
  }
  assert.ok(ready, 'DSC-05 packaged HTTP health');
  await client.connect(new StreamableHTTPClientTransport(new URL('http://127.0.0.1:3000/mcp')));
  assert.equal((await client.listTools()).tools.length, 8);
  const denied = await client.callTool({ name: 'discourse_select_site', arguments: { site: 'https://denied.example' } });
  assert.equal(denied.isError, true);
  assert.match(JSON.stringify(denied), /not in the configured allowlist/);
  console.log('DSC-05 non-root packaged HTTP/session smoke PASS');
} finally { await client.close(); proc.kill('SIGTERM'); clearTimeout(timer); }

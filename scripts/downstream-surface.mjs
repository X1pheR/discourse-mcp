import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
const transport = new StdioClientTransport({
  command: process.execPath,
  args: ['dist/index.js', '--transport', 'stdio', '--toolsets', 'search,topics', '--tools_mode', 'discourse_api_only', '--log_level', 'error'],
  env: { PATH: process.env.PATH, HYPERSHELL_REQUIRE_SITE_ALLOWLIST: 'true',
    HYPERSHELL_DISCOURSE_ALLOWED_SITES: 'https://example.com' }
});
const client = new Client({ name: 'downstream-acceptance', version: '1.0.0' });
try {
  await client.connect(transport);
  const { tools } = await client.listTools();
  const names = tools.map(t => t.name).sort();
  const expected = ['discourse_filter_topics', 'discourse_list_user_posts', 'discourse_read_post', 'discourse_read_topic', 'discourse_read_topic_posts', 'discourse_search', 'discourse_search_posts', 'discourse_select_site'];
  assert.deepEqual(names, expected, 'DSC-03 exact accepted tool surface');
  console.log('TOOLS', JSON.stringify(names));
  assert.equal(names.length, 8, 'DSC-03 exactly eight tools');
  assert.ok(names.includes('discourse_select_site'));
  for (const tool of tools) assert.notEqual(tool.annotations?.readOnlyHint, false, tool.name);
  const resources = await client.listResources();
  const prompts = await client.listPrompts();
  assert.ok(resources.resources.length > 0, 'upstream resources available');
  assert.ok(prompts.prompts.length > 0, 'upstream prompts available');
  const denied = await client.callTool({ name: 'discourse_select_site', arguments: { site: 'https://denied.example' } });
  assert.equal(denied.isError, true, 'DSC-01 disallowed site rejected');
  assert.match(JSON.stringify(denied), /not in the configured allowlist/);
  console.log('DSC-01/02/03 upstream MCP process surface PASS');
} finally { await client.close(); }

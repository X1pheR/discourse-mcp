import test from 'node:test';
import assert from 'node:assert/strict';
import { SiteState } from '../site/state.js';
import { Logger } from '../util/logger.js';

const keys = ['HYPERSHELL_REQUIRE_SITE_ALLOWLIST', 'HYPERSHELL_DISCOURSE_ALLOWED_SITES'];
function scoped(require: string | undefined, sites: string | undefined, run: () => void) {
  const old = keys.map(k => process.env[k]);
  try {
    [require, sites].forEach((v, i) => { if (v === undefined) delete process.env[keys[i]]; else process.env[keys[i]] = v; });
    run();
  } finally { old.forEach((v, i) => { if (v === undefined) delete process.env[keys[i]]; else process.env[keys[i]] = v; }); }
}
function state() { return new SiteState({ logger: new Logger('silent'), timeoutMs: 5000, defaultAuth: { type: 'none' } }); }

test('DSC-01 required absent and empty allowlists fail closed', () => {
  for (const sites of [undefined, '', ' , ']) scoped('true', sites, () => assert.throws(state, /required and must not be empty/));
});
test('DSC-01 normalized allowed origin and cached client remain usable', () => {
  scoped('true', 'https://EXAMPLE.com/forum/, https://other.example', () => {
    const s = state();
    const a = s.buildClientForSite('https://example.com/forum/?ignored=yes#fragment');
    const b = s.buildClientForSite('https://example.com/forum');
    assert.equal(a.base, 'https://example.com/forum');
    assert.equal(a.client, b.client);
    assert.equal(s.getAuthType(a.base), 'none');
  });
});
test('DSC-01 unlisted origins and lookalike paths are denied before fetching', () => {
  scoped('true', 'https://example.com', () => {
    const s = state();
    for (const url of ['https://denied.example', 'http://example.com', 'https://example.com:8443', 'https://example.com.evil.test', 'https://example.com/private']) {
      assert.throws(() => s.buildClientForSite(url), /not in the configured allowlist/);
    }
    assert.equal(s.getSiteBase(), undefined);
  });
});
test('DSC-01 upstream compatibility without required allowlisting remains unchanged', () => {
  scoped(undefined, undefined, () => assert.equal(state().buildClientForSite('https://example.com').base, 'https://example.com'));
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const configUrl = new URL('../.coderabbit.yaml', import.meta.url);

async function readConfigLines() {
  const config = await readFile(configUrl, 'utf8');

  assert.equal(config.charCodeAt(0), 'r'.charCodeAt(0), 'config must not start with a byte-order mark');
  assert.doesNotMatch(config, /\t/, 'YAML indentation must use spaces');

  return config
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '' && !line.trimStart().startsWith('#'));
}

function collectSettings(lines) {
  const pathByDepth = [];
  const settings = new Map();

  for (const line of lines) {
    const indentation = line.match(/^ */)[0].length;
    assert.equal(indentation % 2, 0, `expected two-space indentation: ${line}`);

    const match = line.trim().match(/^([a-z_]+):(?:\s+(.*))?$/);
    assert.ok(match, `expected a YAML mapping entry: ${line}`);

    const [, key, rawValue] = match;
    const depth = indentation / 2;
    assert.ok(depth <= pathByDepth.length, `mapping skips a nesting level: ${line}`);

    pathByDepth.length = depth;
    pathByDepth[depth] = key;
    const path = pathByDepth.join('.');
    assert.ok(!settings.has(path), `duplicate setting: ${path}`);

    const value = rawValue === undefined
      ? undefined
      : rawValue === 'true'
        ? true
        : rawValue === 'false'
          ? false
          : rawValue;

    settings.set(path, value);
  }

  return settings;
}

test('CodeRabbit configuration is a well-formed nested mapping', async () => {
  const settings = collectSettings(await readConfigLines());

  assert.equal(settings.get('reviews'), undefined);
  assert.equal(settings.get('reviews.auto_review'), undefined);
  assert.ok(settings.has('reviews.auto_review.drafts'));
});

test('automatic reviews are enabled for draft pull requests', async () => {
  const settings = collectSettings(await readConfigLines());

  assert.equal(settings.get('reviews.auto_review.drafts'), true);
});

test('draft review behavior is configured once at the supported scope', async () => {
  const settings = collectSettings(await readConfigLines());
  const draftSettings = [...settings.keys()].filter((path) => path.endsWith('.drafts'));

  assert.deepEqual(draftSettings, ['reviews.auto_review.drafts']);
  assert.equal(settings.has('auto_review.drafts'), false);
  assert.equal(settings.has('reviews.drafts'), false);
});

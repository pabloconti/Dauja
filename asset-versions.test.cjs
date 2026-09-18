const test = require('node:test');
const assert = require('node:assert/strict');
const {versionAssetReferences} = require('./asset-versions.cjs');

const entry = '<link rel="stylesheet" href="styles.css"><script src="script.js" defer></script><img src="assets/photo.webp">';
const assets = {'styles.css':'body { color: red; }\n','script.js':'const current = true;\n'};
const version = (html, files=assets) => versionAssetReferences(html, name => files[name]);
const reference = (html, name) => html.match(new RegExp(`${name.replace('.', '\\.')}\\?v=[a-f0-9]+`))[0];

test('a style update gets a new URL while an unchanged script keeps its URL', () => {
  const original = version(entry);
  const updated = version(original, {...assets,'styles.css':'body { color: blue; }\n'});
  assert.notEqual(reference(original,'styles.css'),reference(updated,'styles.css'));
  assert.equal(reference(original,'script.js'),reference(updated,'script.js'));
  assert.ok(updated.includes('<img src="assets/photo.webp">'));
});

test('a script update replaces its old revision and repeated builds stay stable', () => {
  const previous = version(entry);
  const changed = {...assets,'script.js':'const current = false;\n'};
  const updated = version(previous,changed);
  assert.notEqual(reference(previous,'script.js'),reference(updated,'script.js'));
  assert.equal(updated,version(updated,changed));
  assert.equal((updated.match(/\?v=/g)||[]).length,2);
});

test('Windows line endings do not create a different published version', () => {
  const windows = Object.fromEntries(Object.entries(assets).map(([name,text])=>[name,text.replaceAll('\n','\r\n')]));
  assert.equal(version(entry),version(entry,windows));
});

const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');

// Normalize line endings so Windows checkouts and GitHub use the same revision.
function assetRevision(source) {
  return createHash('sha256').update(String(source).replace(/\r\n/g, '\n')).digest('hex').slice(0, 12);
}

function versionAssetReferences(html, readAsset) {
  for (const file of ['styles.css', 'script.js']) {
    const pattern = new RegExp(`"${file.replace('.', '\\.')}([?][^"]*)?"`, 'g');
    const matches = html.match(pattern) || [];
    if (matches.length !== 1) throw new Error(`Expected one entry reference for ${file}`);
    html = html.replace(pattern, `"${file}?v=${assetRevision(readAsset(file))}"`);
  }
  return html;
}

function syncSourceAssetVersions(root) {
  const entry = path.join(root, 'index.html');
  const previous = fs.readFileSync(entry, 'utf8');
  const updated = versionAssetReferences(previous, file => fs.readFileSync(path.join(root, file), 'utf8'));
  if (updated !== previous) fs.writeFileSync(entry, updated);
  return updated;
}

module.exports = {assetRevision, versionAssetReferences, syncSourceAssetVersions};

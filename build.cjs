const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const {renderSeo,renderRobots,renderSitemap,validateConfig} = require('./seo.cjs');
const config = require('./seo.config.json');
validateConfig(config);
const root = __dirname;
const out = path.resolve(root, 'dist');
// Only remove our generated build directory; never follow a redirected path.
if (fs.existsSync(out)) {
  if (fs.lstatSync(out).isSymbolicLink() || fs.realpathSync(out).toLowerCase() !== out.toLowerCase()) throw new Error('Unexpected build output path');
  if (path.dirname(out) !== root || path.basename(out) !== 'dist') throw new Error('Unsafe build output path');
  fs.rmSync(out, { recursive: true, force: true });
}
fs.mkdirSync(out, { recursive: true });
let html = fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/,renderSeo(config));
fs.writeFileSync(path.join(out,'index.html'),html);
for(const [file,loader] of [['styles.css','css'],['script.js','js']]) {
  const source = fs.readFileSync(path.join(root,file),'utf8');
  const result = esbuild.transformSync(source,{loader,minify:true,target:loader==='css'?['chrome100','firefox100','safari15.4']:'es2020',legalComments:'none',charset:'utf8'});
  fs.writeFileSync(path.join(out,file),result.code);
  console.log(`${file}: ${Buffer.byteLength(source)} -> ${Buffer.byteLength(result.code)} bytes`);
}
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
fs.copyFileSync(path.join(root,'404.html'),path.join(out,'404.html'));
fs.copyFileSync(path.join(root,'_headers'),path.join(out,'_headers'));
fs.writeFileSync(path.join(out,'robots.txt'),renderRobots(config));
if(config.indexable) fs.writeFileSync(path.join(out,'sitemap.xml'),renderSitemap(config));
console.log(`Static build ready. Indexation: ${config.indexable?'enabled with sitemap':'disabled for private preview; sitemap generated at launch'}.`);

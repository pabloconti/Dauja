'use strict';
const fs=require('node:fs');
const path=require('node:path');
const root=fs.realpathSync(__dirname);
const source=path.join(root,'dist');
const target=path.join(root,'public_html');
const backups=path.join(root,'.hosting-backups');
if(!fs.existsSync(path.join(source,'index.html'))) throw new Error('Run npm run build first');
for(const dir of [source,target,backups]) {
  if(path.dirname(dir)!==root) throw new Error('Output must stay inside the project');
  if(fs.existsSync(dir) && (fs.lstatSync(dir).isSymbolicLink() || fs.realpathSync(dir).toLowerCase()!==dir.toLowerCase())) throw new Error('Refusing redirected output path: '+dir);
}
if(fs.existsSync(target)) {
  fs.mkdirSync(backups,{recursive:true});
  const backup=path.join(backups,'public_html-'+new Date().toISOString().replace(/[:.]/g,'-'));
  if(fs.existsSync(backup)) throw new Error('Backup already exists');
  fs.renameSync(target,backup);
  console.log('Previous export preserved in '+path.relative(root,backup));
}
fs.cpSync(source,target,{recursive:true,filter:entry=>!['.openai','_headers'].includes(path.basename(entry))});
fs.copyFileSync(path.join(root,'hosting','apache.htaccess'),path.join(target,'.htaccess'));
console.log('public_html ready: upload its contents to the hosting document root.');

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function validateConfig(config) {
  const url = new URL(config.siteUrl);
  if (url.protocol !== 'https:' || url.search || url.hash || url.pathname !== '/') throw new Error('SEO siteUrl must be an HTTPS origin ending in /.');
  if (config.indexable && (!config.domainConfirmed || !config.businessDataConfirmed)) throw new Error('Confirm the final domain and business information before enabling indexation.');
}
function renderSeo(config) {
  validateConfig(config);
  const base = config.siteUrl, url = relative => new URL(relative, base).href;
  const organization = {'@type':'Organization','@id':url('#organization'),name:config.name,legalName:config.legalName,url:base,description:config.description,logo:{'@type':'ImageObject',url:url('assets/logos/dauja-square.png'),width:512,height:512},areaServed:{'@type':'Country',name:'Argentina'},location:{'@type':'Place',hasMap:config.mapsUrl,geo:{'@type':'GeoCoordinates',latitude:config.latitude,longitude:config.longitude}}};
  if(config.address) organization.address = {'@type':'PostalAddress',...config.address};
  if(config.telephone) organization.telephone = config.telephone;
  if(config.email) organization.email = config.email;
  if(config.sameAs.length) organization.sameAs = config.sameAs;
  const graph = [organization,{'@type':'WebSite','@id':url('#website'),url:base,name:config.name,inLanguage:'es-AR',publisher:{'@id':url('#organization')}},...['Transporte de cargas generales','Transporte de cargas peligrosas','Transporte de contenedores'].map((name,i)=>({'@type':'Service','@id':url('#service-'+(i+1)),name,serviceType:name,provider:{'@id':url('#organization')},areaServed:{'@type':'Country',name:'Argentina'},url:url('#servicios')}))];
  return `<!-- SEO:START -->\n<title>${escape(config.title)}</title>\n<meta name="description" content="${escape(config.description)}">\n<meta name="robots" content="${config.indexable?'index, follow, max-image-preview:large':'noindex, follow'}">\n<link rel="canonical" href="${escape(base)}">\n<meta property="og:type" content="website">\n<meta property="og:locale" content="es_AR">\n<meta property="og:site_name" content="Dauja">\n<meta property="og:title" content="${escape(config.title)}">\n<meta property="og:description" content="${escape(config.description)}">\n<meta property="og:url" content="${escape(base)}">\n<meta property="og:image" content="${url('assets/images/dauja-social.jpg')}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="Camión Dauja en ruta">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${escape(config.title)}">\n<meta name="twitter:description" content="${escape(config.description)}">\n<meta name="twitter:image" content="${url('assets/images/dauja-social.jpg')}">\n<link rel="apple-touch-icon" href="assets/logos/dauja-square.png">\n<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script>\n<!-- SEO:END -->`;
}
function renderRobots(config) { return `User-agent: *\nAllow: /\n${config.indexable?'\nSitemap: '+new URL('sitemap.xml',config.siteUrl).href+'\n':''}`; }
function renderSitemap(config) { return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(config.siteUrl)}</loc></url></urlset>\n`; }
module.exports = {renderSeo,renderRobots,renderSitemap,validateConfig};

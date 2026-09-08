# SEO y preparación del lanzamiento — Dauja

Actualizado: 7 de septiembre de 2026.

## Estado actual

El diseño se conserva. La publicación sigue siendo privada y el formulario/contacto y parte de las referencias comerciales siguen en modo de prueba. Por eso la versión actual tiene `noindex, follow`. No se modificó la audiencia del sitio ni se activaron Analytics, cookies de seguimiento o envíos de formularios.

`dauja.com.ar` es un dominio propuesto por el cliente, pendiente de confirmación. La URL canónica actual es la del sitio de revisión. Se administra desde `seo.config.json`; no hay un dominio definitivo inventado ni una redirección hacia él.

## Implementado

- Título orientado a transporte de cargas y contenedores en Argentina y descripción con cargas generales, peligrosas, Buenos Aires y cobertura nacional.
- Canonical, Open Graph y Twitter Card, imagen social de 1200 × 630 y logo cuadrado de 512 × 512. Las vistas previas externas necesitan acceso público para descargarlos.
- JSON-LD de Organization, WebSite y tres Service, usando información confirmada. No se agregaron opiniones, estrellas, horarios, teléfonos ni una dirección postal no confirmados. [Guía de Organization de Google](https://developers.google.com/search/docs/appearance/structured-data/organization).
- Ubicación exacta proporcionada por el cliente: -34.7050932, -58.3915336, con enlace visible a Google Maps. La dirección postal todavía debe validarse con la empresa: el enlace enviado era de Street View y no pudo verificarse por completo en la consulta automatizada.
- Imágenes WebP responsive con `srcset`/`sizes`, carga diferida de fotos secundarias y precarga responsive coincidente para la portada. [Precarga responsive](https://web.dev/articles/preload-responsive-images).
- Fuente local WOFF2 para caracteres latinos, incluidos acentos y ñ, con `font-display: swap`.
- CSS y JavaScript comprimidos con esbuild solo durante la compilación; el navegador no descarga librerías nuevas. Los archivos fuente se mantienen legibles.
- Página 404, tipos MIME correctos en el servidor de prueba y reglas `_headers` para hosting compatible. Su aplicación efectiva en producción depende del servidor de assets de Sites; no se atribuye una mejora de caché a cabeceras no verificadas. [Cabeceras de Cloudflare](https://developers.cloudflare.com/workers/static-assets/headers/).
- `robots.txt` generado. El sitemap se genera y se anuncia automáticamente cuando `indexable` pasa a `true`. Incluye una sola URL; las secciones con `#` no son páginas independientes.
- Validación de HTML, recursos, enlaces internos, un único H1, dimensiones/alt de imágenes, schema, canonical, precarga y comportamiento de sitemap al lanzar.

## Mediciones de archivos, no puntuaciones estimadas

| Recurso | Antes | Ahora |
| --- | ---: | ---: |
| Portada elegida en la prueba móvil a 390 px y densidad 1x | 240.418 bytes | 25.132 bytes (480w) |
| Portada 800w, disponible para pantallas de mayor densidad | 240.418 bytes | 56.770 bytes |
| Fuente principal | 109.912 bytes | 22.444 bytes |
| JavaScript, antes de compresión HTTP | 15.499 bytes | 11.937 bytes |
| CSS, antes de compresión HTTP | 52.611 bytes | 51.260 bytes |

La selección de imágenes cambia según ancho y densidad. No se midieron Core Web Vitals de usuarios reales ni se inventó una nota Lighthouse. El peso total del paquete puede aumentar por incluir variantes, mientras que cada navegador descarga únicamente las que necesita.

## Verificación realizada

- Compilación y comprobación sintáctica de JavaScript comprimido.
- Validaciones del HTML fuente y compilado.
- 34 recursos referenciados respondieron HTTP 200 en la versión compilada local.
- Portada y robots con HTTP 200; rutas inexistentes y sitemap aún desactivado con HTTP 404.
- WOFF2 e imagen social con los tipos MIME esperados.
- Revisión visual móvil del build y funcionamiento del menú; el navegador seleccionó la variante 480w de la portada.

## Para completar con la empresa

1. Confirmar el dominio definitivo, variante con o sin `www` y acceso a su configuración DNS. Si ya existe una web en ese dominio, inventariar sus URLs antes de reemplazarla y preparar redirecciones 301 de las rutas anteriores.
2. Confirmar razón social, dirección postal, teléfono/WhatsApp, email y horarios; revisar la vigencia de las marcas cliente y prestaciones de seguridad mostradas.
3. Resolver el canal real del formulario y sustituir los datos de prueba.
4. Confirmar quién administra la ficha de Google Business Profile y Google Search Console. No hace falta compartir contraseñas: se trabaja con invitaciones o con el registro de verificación que provea Google.
5. Con dominio/datos definitivos: actualizar `siteUrl`, marcar `domainConfirmed` y `businessDataConfirmed`, habilitar `indexable`, compilar y publicar con autorización para acceso público.
6. Verificar públicamente robots, canonical, sitemap, códigos HTTP, redirecciones HTTPS y vistas previas. Enviar el sitemap a Search Console y solicitar indexación. Luego medir PageSpeed/Lighthouse y, cuando haya datos, Core Web Vitals.

La autenticación y `noindex` impiden que esta revisión se posicione públicamente. No basta con crear un sitemap. [Control de indexación de Google](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

## Comandos

- `npm install` / `npm ci`: instalar dependencias de desarrollo.
- `npm run check`: comprobar fuentes.
- `npm run build`: generar salida optimizada en `dist`.
- `npm run check:build`: comprobar la salida.
- `npm run preview`: revisar la salida compilada en `http://127.0.0.1:4173`.

`seo.cjs` concentra metadatos, robots y sitemap. Cambiar el dominio o la indexabilidad en `seo.config.json` y reconstruir no requiere tocar el diseño.

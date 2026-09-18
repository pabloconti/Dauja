# Correcciones de Dauja — 18 de septiembre de 2026

Se aplicaron los ocho puntos enviados por la empresa. Actualización posterior: las patentes se eliminaron con un retoque natural del paragolpes, reemplazando el mosaico inicial. Ver RETOQUE-PATENTES.md para las instrucciones y los archivos vigentes.

1. Logo oficial completo en encabezado y pie, con las líneas roja y negra y el descriptor «Servicio Integral Terrestre». Se preparó una versión para metadatos a partir del mismo original.
2. Flechas de botones y menú móvil mediante íconos SVG, sin caracteres que el teléfono pueda convertir en emojis.
3. Patentes visibles retiradas en portada, carga, flota —incluido el auto del fondo—, seguridad y escena del puerto. Todas las variantes responsive y la imagen social utilizan las fotografías corregidas. El camión del proceso ya tenía una placa sin caracteres.
4. Se quitó «Dauja» del contenedor gris de la escena del puerto. Se conservó la marca de la cabina.
5. Se retiraron las coordenadas de la empresa anterior. El enlace de Maps busca la dirección aportada: Perú 359, Ciudad Autónoma de Buenos Aires. No se asignaron coordenadas nuevas sin confirmación.
6. Flota: «En constante renovación». Se eliminó «moderna» de los textos públicos.
7. Servicios y flota comparten una sección y una entrada de navegación. El ancla anterior #flota sigue funcionando dentro de esa sección.
8. Se incorporaron las 24 marcas del ZIP en sus colores originales y con proporciones completas. Reemplazan el listado anterior.

## Datos recibidos

- Nombre legal: DAUJA SRL.
- Dirección: Perú 359, CABA, Argentina.
- Teléfono / WhatsApp: +54 9 11 3484-3333.
- Email: administracion@dauja.com.ar.
- Instagram: https://www.instagram.com/daujasrl/.

Los datos figuran en el sitio y en los metadatos correspondientes. Los botones abren un diálogo con canales reales. La consulta se prepara en el navegador y se puede abrir en WhatsApp o email; la persona confirma el envío en su aplicación. No hay servidor de correo ni envíos automáticos.

## Imágenes y fuentes

El logo y los logos de clientes provienen de los archivos entregados por la empresa. Se recortó el margen vacío del logo oficial y se optimizaron los formatos; no se redibujó la marca.

Las cinco fotografías se editaron con la herramienta integrada ImageGen. La versión vigente retira las patentes y reconstruye el material del paragolpes o del hueco de montaje con textura e iluminación naturales, sin mosaicos. Incluye la patente del auto del fondo en la foto de flota. Se conservan los encuadres y las marcas de las cabinas. El contenedor gris del puerto sigue sin la inscripción DAUJA. Las instrucciones exactas figuran en RETOQUE-PATENTES.md.

Archivos finales: `assets/images/camion-portada-limpia.webp`, `camion-carga-limpia.webp`, `flota-playon-limpia.webp`, `camion-seguridad-limpia.webp`, `puerto-limpio.webp`, sus variantes responsive y `dauja-social-limpia.jpg`.

El exportador incluye únicamente los recursos usados por el sitio. Las fotos antiguas y las marcas reemplazadas se conservan en los archivos fuente, pero quedan fuera de `dist` y `public_html`.

## Exportación para hosting

Ejecutar `npm run export:hosting` para validar, compilar y generar `public_html`. La exportación previa se conserva en `.hosting-backups` antes de regenerarla. Las URL de CSS y JavaScript incluyen una versión calculada a partir de su contenido para evitar reutilizar código anterior en caché.

Subir el contenido del nuevo paquete dentro de la carpeta pública del hosting. Para que las imágenes antiguas dejen de estar disponibles, reemplazar la carpeta `assets` anterior por la nueva, conservando previamente una copia fuera de la raíz pública. No sobrescribir archivos del proveedor ni una instalación ajena al sitio.

La indexación continúa desactivada hasta confirmar dominio definitivo y publicación. El email bajo dauja.com.ar no se tomó como confirmación de la URL final. Una vez recibido el enlace de Maps actual, se puede reemplazar la búsqueda postal por esa ficha exacta.

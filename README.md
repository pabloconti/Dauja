# Dauja — sitio web estático

HTML, CSS y JavaScript puro, sin frameworks, dependencias ni servicios externos. Se puede abrir `index.html` directamente. Para vista previa local: `npm run dev`, en http://127.0.0.1:4173. Requiere Node únicamente para los comandos de desarrollo; el sitio publicado no lo necesita.

## Archivos

- `index.html`: contenido, secciones, marcas y formulario de demostración.
- `styles.css`: diseño responsive, colores y estados.
- `script.js`: menú móvil, navegación activa, carrusel y consulta local.
- `assets/`: imágenes WebP, logotipo e íconos SVG provistos.
- `npm run check`: comprueba sintaxis, anclas, archivos y metadatos básicos.
- `npm run build`: copia el sitio a `dist/`, listo para un hosting estático.

## Datos pendientes de confirmar

Por indicación del cliente, la información de contacto, marcas de clientes, cobertura y prestaciones adicionales se mantiene como contenido de prueba. Antes de una publicación comercial, confirmar estos datos, gestión aduanera, GPS satelital, corte de combustible y seguridad privada. No se incorporaron cifras de flota ni sucursales sin confirmar.

Los botones de contacto abren una demostración: preparan una consulta que se puede copiar, pero no envían emails ni mensajes, no guardan datos ni se conectan a servicios. Para habilitar contacto real se puede sustituir por enlaces de email/WhatsApp confirmados o conectar un servicio de formularios. Agregar las redes cuando se proporcionen sus URLs.

La portada actual usa `assets/images/camion-portada-premium.webp`, una reconstrucción con la herramienta integrada ImageGen del recorte del diseño enviado (1672 × 941 píxeles). Mantiene la composición, el camión blanco/rojo y las marcas DAUJA; no es una restauración documental y los detalles pequeños pueden variar. El original se conserva. La tipografía del título es Barlow Condensed Bold, alojada localmente con su licencia OFL. El degradado se aplica mediante CSS sobre la imagen para evitar bordes visibles.

La historia y la franja de seguridad usan las versiones mejoradas `camion-carga-premium.webp` y `flota-playon-premium.webp`, reconstruidas con ImageGen a partir de las fotografías originales. Se conservaron los modelos de vehículos, carga, entorno y marcas principales; los detalles pequeños pueden variar. Los originales siguen disponibles. La foto de ruta del collage reutiliza la portada mejorada.

La sección de flota destaca la foto `imagen importante.jpeg`, cuya definición original ya es adecuada, convertida a WebP con una variante para móviles. El logo Dauja del encabezado y pie usa una copia optimizada de su original de 1989 píxeles. Los logos de clientes suministrados tienen entre 57 y 90 píxeles de ancho: se muestran sin ampliación, pero para una presentación nítida en pantallas de alta densidad necesitan originales SVG o PNG de mayor resolución. Los íconos son SVG y no pierden nitidez al escalar. El texto y los controles son HTML real, no capturas de pantalla.

El menú funciona con teclado y Escape, el diálogo nativo contiene el foco y lo devuelve al botón de origen, el carrusel admite desplazamiento táctil y botones, y se respeta la preferencia de movimiento reducido.

## Sección de proceso revisada

Los cuatro marcadores del recorrido se vinculan con sus tarjetas mediante `aria-controls`. Hover y foco resaltan la etapa; clic o toque conservan la selección. En móvil el toque acerca la tarjeta correspondiente a la vista. Escape limpia la selección. Los cuatro marcadores permanecen visibles en una fila en pantallas pequeñas. El camión queda enteramente contenido en su superficie de mezcla, eliminando el borde blanco exterior.

La sección «Cómo trabajamos» utiliza ahora un camión con contenedor rojo sobre fondo claro, generado a partir de la referencia visual (`assets/images/camion-proceso.webp`). La foto importante del puerto se conserva en los archivos y en el fondo del llamado a contacto. Los recorridos son trazos SVG decorativos animados con CSS, sin librerías. Se pausan fuera de pantalla mediante IntersectionObserver, tienen un botón de pausa/reanudación y respetan `prefers-reduced-motion`. Las tarjetas muestran cuatro columnas en escritorio, dos en tablet y una por debajo de 401 píxeles. Se revisó visualmente a 1440, 768 y 390 píxeles y se comprobó el control de pausa.

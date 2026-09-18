# Retoque natural de patentes

Se retiró la ventana interior del SVG del camión en todos sus usos. Se conserva el resto de la familia de íconos.

Las fotografías se editaron mediante la herramienta integrada ImageGen (modo preciso de edición de objeto). Se elimina por completo la patente y el mosaico anterior, reconstruyendo únicamente el material del paragolpes o del hueco de montaje. No se inventan números ni se aplican desenfoques, bloques grises o placas blancas. Se conserva el encuadre, los vehículos, las marcas y el entorno.

## Instrucción común enviada

Use case: precise-object-edit. Input image 1 is the exact edit target, NOT a creative reference. Primary request: clean professional automotive retouch. REMOVE the license plate and the ugly pixelation mosaic completely; replace only that tiny area with a photorealistic continuation of the adjacent bumper or natural mounting recess. No blur, censor bars, flat gray rectangles, white blank license-plate rectangles, numbers or invented license text. The result should look like the vehicle was photographed without a plate, not like it was censored. STRICT INVARIANTS: keep exact photo composition, crop, dimensions, aspect ratio, vehicle models, bodywork, branding, all DAUJA lettering outside the plate, lights, wheels, sky, background, texture, sharpness, lighting and colors unchanged. Change ONLY the plate pixels and minimally feather the immediate boundary. Do not redesign or beautify anything else.

## Fotos y restricciones específicas

- Archivo final: `assets/images/camion-portada-limpia.webp`.
  Instrucción específica: Hero landscape highway scene, 1672x941. Remove the pixelated gray license plate at the front center of the white Mercedes truck, in the black bumper below the grille. Reconstruct the continuous dark charcoal bumper trim/recess with believable matching reflections and contours.

- Archivo final: `assets/images/camion-carga-limpia.webp`.
  Instrucción específica: 1448x1086. Remove the gray pixelated plate at the far right end of the visible front bumper of the Renault truck (near bottom-right of image). Seamlessly reconstruct the dark charcoal painted bumper underneath.

- Archivo final: `assets/images/flota-playon-limpia.webp`.
  Instrucción específica: 1448x1086. TWO areas: remove pixelated plate from central black front bumper of main white IVECO truck, AND pixelated rear plate from the red hatchback at far right. Reconstruct natural black truck bumper and the natural red/dark license mounting recess of the hatchback. No gray squares remain on either vehicle.

- Archivo final: `assets/images/camion-seguridad-limpia.webp`.
  Instrucción específica: Extra-wide 2172x724 cargo truck photograph. Remove the small pixelated plate on front bumper at right end of truck. Continue the dark gray bumper surface naturally underneath. Preserve the extra-wide framing.

- Archivo final: `assets/images/puerto-limpio.webp`.
  Instrucción específica: Wide 1983x793 port sunset scene. Remove pixelated front plate from the white Mercedes truck on the right. Reconstruct the front white bumper with the same natural white paint/shadows/curves. Preserve DAUJA red logo on cab. The large gray shipping container MUST stay plain without added lettering.

Se generan variantes responsive de las fotografías y una imagen social `assets/images/dauja-social-limpia.jpg`. Los nombres nuevos evitan que los navegadores reutilicen las versiones pixeladas. El exportador incluye únicamente los archivos utilizados; los originales quedan fuera del paquete público.

En el puerto se realizó una segunda pasada localizada: retirar el rectángulo gris y la marca azul que quedaban en el paragolpes delantero del camión de la derecha, reconstruyendo la pintura blanca y sus sombras sin alterar el encuadre. Se utilizó nuevamente ImageGen integrado.

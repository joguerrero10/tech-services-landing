# Revisión de la base y los recursos

## Alcance y evidencia

Referencia: `diseño.png`, 913 × 1723, conservada sin cambios. La especificación posterior cambia la fotografía principal a proporción 6:5 y solicita iconos Lucide y favicon con fondo verde. No se considera que esas diferencias respecto de la imagen inicial sean regresiones.

Implementación local: `http://127.0.0.1:4200/`. Capturas del navegador integrado:

- `docs/qa/desktop-es-top.png`: cabecera, hero y comienzo de servicios; viewport 913 × 850, densidad 1.
- `docs/qa/reference-top.png`: recorte 913 × 850 de la referencia, comparado junto a la captura superior en la misma inspección visual.
- `docs/qa/desktop-es-bottom.png`: aplicaciones, proceso, contacto y footer; viewport 913 × 850, densidad 1. Captura tras navegación al proceso, comprobando el desplazamiento real.

No hay captura completa fiable en una sola imagen: el navegador devolvió una región negra al capturar por encima del alto visible. Se descartó ese archivo. Se conservan vistas superior e inferior, sin presentarlas como una comparación de página completa.

## Historial de correcciones

- P2 corregido: colisión de `container` con la utilidad de Tailwind; reducía el contenido a 48rem. Se utiliza `page-container`.
- P2 corregido: cabecera apilada a 913. Se compactó el selector y se ajustó su breakpoint a 56rem.
- P2 corregido: titular y acciones demasiado altos en el hero de escritorio. Se ajustaron tamaño y separación manteniendo foco, objetivos de interacción y flujo normal. La nueva captura muestra dos líneas de título y ambas acciones en una fila.
- Restricción corregida: el escaneo automático de Tailwind interpretaba términos de documentación como utilidades de posicionamiento. Se limitó a plantillas HTML; el CSS compilado ya no incluye posiciones prohibidas ni dimensiones en px.

## Superficies revisadas

- Tipografía: Manrope WOFF2 local, pesos 400–800, raíz 16px del navegador sin reducción artificial. Documentación y contenido únicamente en español e inglés.
- Espaciado: Grid/Flex y flujo normal. En el DOM de la aplicación no hay elementos posicionados; se excluyó únicamente el overlay que inyecta el navegador Codex y que no pertenece al proyecto.
- Colores: crema, bosque y terracota; iconos con máscaras CSS que adoptan el color efectivo del contexto. Favicon con colores explícitos.
- Imágenes: hero editorial 6:5 y fondo 3:1 decodificados y revisados. Ambientación, sin presentarlos como prueba documental del equipo. Contacto conserva espacio oscuro para texto claro.
- Contenido: identidad neutral, cuatro servicios, dos productos y textos plurales. Tarifas de la referencia y teléfono confirmado por el usuario. Los iconos de aplicaciones son genéricos.

## Verificación funcional

- Viewports españoles de 320, 390, 768, 913 y 1440: sin desbordamiento horizontal, sin imágenes fallidas y sin posicionamiento prohibido dentro de `app-root`.
- Inglés a 320: sin desbordamiento; cambio de título, textos, alt y `html[lang]`. Selector con valores exclusivamente `es` y `en`.
- Navegación nativa al proceso: fragmento actualizado y foco en la sección. Enlaces de WhatsApp verificados por destino y mensaje, sin enviar mensajes ni afirmar disponibilidad de la cuenta.
- Consola del navegador: sin errores ni advertencias en la revisión final.
- Build de producción, TypeScript estricto, 9 pruebas de comportamiento, formato, restricciones CSS y `git diff --check`: aprobados.
- No se afirma una auditoría completa con lector de pantalla ni cobertura de otros navegadores. No se desplegó.

## Pendiente real

Falta `public/images/team-workspace-1440.webp`. Los tres intentos de generación devolvieron 1374 × 1145; no se puede obtener 1440 × 1200 sin ampliar artificialmente. La aplicación usa únicamente variantes existentes. `npm run check:assets` detecta el pendiente y devuelve código 1. Los encargos, originales, licencias, medidas y pesos están en `docs/assets.md`.

La aprobación integral de recursos queda pendiente hasta disponer de un original nativo suficiente. La base sí compila y los archivos entregados son válidos.

final result: blocked

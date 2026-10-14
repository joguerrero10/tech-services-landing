# Verificación de la landing

Revisión local del 14 de octubre de 2026. Rama `main`; no se creó un commit ni se ejecutó push o despliegue.

## Comprobaciones ejecutadas

- `npm run typecheck`: correcto.
- `npm run test:ci`: 41 pruebas correctas en 11 archivos. Incluyen tarifas, rutas, cambio de idioma, estados del portafolio, navegación y mensajes de WhatsApp.
- `npm run check:i18n`: 158 claves en español e inglés, interpolaciones equivalentes y sin traducciones vacías o claves usadas inexistentes.
- `npm run check:styles`: correcto, con la excepción documentada del enlace para saltar al contenido.
- `npm run check:contrast`: los 13 pares configurados cumplen sus umbrales. No equivale a una auditoría completa de accesibilidad.
- `npm run check:assets`: WebP, SVG, WOFF2 e ICO válidos; doce variantes WebP para los seis proyectos.
- `npm run build:pages`: compilación correcta, tres rutas prerenderizadas.
- `npm run check:pages`: contenido, precios, estados, metadatos y datos de hidratación correctos en es/en; redirección raíz conserva `/tech-services-landing/`. 43 archivos públicos revisados y 31 referencias a recursos válidas.
- `git diff --check`: correcto.

## Navegador y servidor estático

Revisión de la salida estática local a 390 × 844 y 1440 × 1000 en ambos idiomas. Anchos de documento observados: 375 y 1425 respectivamente, sin desplazamiento horizontal. Cuadrícula de proyectos de dos columnas en escritorio y una en móvil. Imágenes proporcionadas; seis recursos cargados correctamente. Estados traducidos al cambiar de idioma.

El menú móvil abre y cierra al seleccionar Proyectos; se conserva el ancla al cambiar de idioma. Los siete precios muestran el formato esperado, incluidos `$250` y `$1,200`. Consola sin errores ni advertencias durante estas interacciones. Se restauró el viewport normal al terminar.

Solicitudes HTTP a la raíz, es, en y las doce variantes del portafolio: 200, con tipos HTML/WebP correctos.

## Límites y pendientes

Los proyectos de los ZIP se revisaron estáticamente; no se ejecutaron sus aplicaciones ni se verificaron sus integraciones. Los estados públicos provienen de la confirmación del propietario. Falta la URL pública confirmada de SmartFinance; se mantiene la consulta por WhatsApp. Las imágenes generadas son conceptuales, no capturas.

Esta revisión no incluye pruebas en todos los navegadores, lectores de pantalla, zoom al 200 %, mediciones Lighthouse ni verificación del despliegue remoto. Los cambios están únicamente en el repositorio local.

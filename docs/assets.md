# Recursos visuales

Los archivos de esta página son locales y no dependen de enlaces temporales. Los originales necesarios para futuras conversiones se conservan en `docs/assets/originals/`, fuera del contenido público.

## Estado de entrega

**Pendiente: `public/images/team-workspace-1440.webp` (1440 × 1200).** No existe y no está referenciado por la aplicación. La herramienta incorporada devolvió originales de 1374 × 1145 en tres solicitudes de resolución, incluso solicitando 3072 × 2560. Ampliarlos incumpliría la restricción de no realizar ampliaciones artificiales. Para completar esta variante se necesita un original nativo 6:5 de al menos 1440 × 1200. El encargo exacto está preparado más abajo.

Las otras cuatro fotografías WebP solicitadas, la colección SVG, Manrope WOFF2 y ambos favicons existen y se verificaron. `npm run check:assets` comprueba sus formatos y dimensiones y **sale con código 1 mientras falte la variante de 1440**; no oculta ese pendiente. El build utiliza únicamente las variantes reales de 480 y 960 mediante `srcset`.

## Fotografías: origen y conversión

Generación original mediante Image Gen incorporado, con los encargos del usuario. No hay licencia de fotografía de terceros adjunta: corresponde aplicar las condiciones del servicio de generación, sin atribuir al resultado una licencia CC o stock no concedida. Las fotografías son **ambientación visual**, no documentación del equipo ni de una oficina real. No contienen personas ni marcas identificables.

Hero: original PNG de 1374 × 1145, proporción exacta 6:5. Contacto: reutilizado original adecuado de 2172 × 724, proporción exacta 3:1. Las cuatro variantes son reducciones con filtro Lanczos y compresión WebP; no se amplían ni deforman los originales. Se inspeccionaron visualmente para comprobar encuadre, nitidez y ausencia de texto legible. Los tamaños intrínsecos están en la tabla.

Encargo hero, preparado también para obtener el original de mayor resolución:

> Fotografía editorial realista de un espacio de trabajo compartido, cálido y ordenado. Mesa de madera clara con dos laptops abiertas, cuadernos, libros, una taza de cerámica y plantas verdes. Luz natural suave de tarde, pared crema y ambiente profesional cercano. Paleta de madera, crema, verde bosque y pequeños detalles terracota. Sin personas, rostros, marcas comerciales, logotipos ni texto legible. Composición horizontal 6:5, equilibrada y adecuada para acompañar el encabezado de una landing de profesionales independientes.

Encargo de contacto (se reutilizó el original existente que cumple su composición):

> Fotografía panorámica decorativa de hojas tropicales verdes concentradas en el extremo izquierdo, sobre un fondo verde bosque oscuro. Centro y lado derecho despejados, uniformes y oscuros para colocar texto HTML claro. Iluminación suave, aspecto natural y coherente con un espacio de trabajo cálido. Sin personas, texto, logotipos ni marcas de agua. Proporción 3:1.

El prompt original del fondo reutilizado pidió hojas monstera en el 25 % izquierdo, tres cuartos despejados con verde bosque alrededor de `#163f30`, variación tonal natural tenue y luz cálida discreta en los bordes, sin texto ni marcas.

## Iconos SVG

Fuentes oficiales de **Lucide Static 1.48.0**, obtenidas del paquete publicado en [npm](https://www.npmjs.com/package/lucide-static/v/1.48.0); [proyecto oficial](https://lucide.dev/). No se añadió una dependencia de ejecución. Se conservaron los SVG originales individuales y `public/icons/LUCIDE-LICENSE.txt`, que incluye ISC y la atribución MIT de los iconos derivados de Feather.

| Uso                   | Archivo/nombre real                                  |
| --------------------- | ---------------------------------------------------- |
| Identidad neutral     | `code-xml.svg`                                       |
| Tutorías              | `book-open.svg`                                      |
| Python                | `terminal.svg`                                       |
| Desarrollo            | `laptop-code.svg`, composición local descrita debajo |
| Mantenimiento         | `wrench.svg`                                         |
| Aplicación financiera | `wallet.svg`                                         |
| Aplicación de ventas  | `calculator.svg`                                     |
| Contacto              | `messages-square.svg`                                |
| Navegación            | `arrow-right.svg`, `menu.svg`, `x.svg`               |

`laptop-code` **no es un nombre oficial de esta versión**. Es una composición local atribuida de `laptop` y `code-xml`, cuyas fuentes originales también se conservan. Mantiene viewBox 24 × 24 y grosor efectivo 2, compensando la escala del símbolo interior. Los iconos de las aplicaciones son ilustraciones genéricas; no son logotipos oficiales de los productos.

Todos los SVG usan `viewBox="0 0 24 24"`, trazo 2 con remates redondos (salvo el fondo sólido del favicon). Se validaron mediante parser XML: sin scripts, manejadores de eventos, `foreignObject`, referencias externas ni cargas remotas. El componente `app-icon` utiliza `mask-image` local y `background-color: currentColor`: el color viene del CSS del elemento, no de una supuesta herencia dentro de un `<img>`. Así funciona en crema y en verde. Los tamaños de UI se expresan en rem.

## Manrope

WOFF2 variable local, obtenido de [Google Fonts](https://fonts.google.com/specimen/Manrope), bajo SIL Open Font License 1.1; licencia íntegra en `public/fonts/OFL.txt`. Se conserva el archivo original WOFF2 descargado. Contiene eje `wght` 200–800; la UI declara y utiliza 400–800. `font-display: swap`, preload local y respaldo `sans-serif`.

Se inspeccionaron las tablas de la fuente con FontTools y Brotli en un entorno temporal de verificación, sin añadir dependencias a la aplicación: 218 puntos de código, sin ausencias en el conjunto comprobado para español e inglés (incluidos ÁÉÍÓÚÜÑ y áéíóúüñ). Resultado detallado en `docs/qa/font-coverage.json`. La interfaz y su contenido se limitan a español e inglés.

## Favicon

`public/icons/site-mark.svg`: fondo verde bosque `#193f35` y símbolo crema `#fdfbf7`, derivado del `code-xml` oficial, sin monogramas ni marcas. SVG con colores explícitos, adecuado para uso externo. `public/favicon.ico` se rasteriza desde ese SVG con GdkPixbuf/Pillow y contiene 16, 32, 48 y 64. Se verificaron la cabecera ICO, el directorio de tamaños y la decodificación de cada imagen.

## Inventario verificado

Dimensiones intrínsecas en píxeles para raster; viewBox para SVG. Pesos exactos en bytes. El manifiesto `docs/assets/manifest.json` añade SHA-256 para cada archivo. Las fotografías fueron decodificadas con Pillow; las firmas RIFF/WEBP, WOFF2 e ICO se comprobaron además con el script Node.

| Archivo                                    | Formato real | Dimensiones / viewBox              |   Bytes |
| ------------------------------------------ | ------------ | ---------------------------------- | ------: |
| `public/images/contact-leaves-1920.webp`   | WEBP         | 1920 × 640                         |   50558 |
| `public/images/contact-leaves-960.webp`    | WEBP         | 960 × 320                          |   19268 |
| `public/images/team-workspace-480.webp`    | WEBP         | 480 × 400                          |   39298 |
| `public/images/team-workspace-960.webp`    | WEBP         | 960 × 800                          |  100066 |
| `public/icons/arrow-right.svg`             | SVG          | 0 0 24 24                          |     343 |
| `public/icons/book-open.svg`               | SVG          | 0 0 24 24                          |     467 |
| `public/icons/calculator.svg`              | SVG          | 0 0 24 24                          |     604 |
| `public/icons/code-xml.svg`                | SVG          | 0 0 24 24                          |     373 |
| `public/icons/laptop-code.svg`             | SVG          | 0 0 24 24                          |     612 |
| `public/icons/laptop.svg`                  | SVG          | 0 0 24 24                          |     482 |
| `public/icons/menu.svg`                    | SVG          | 0 0 24 24                          |     354 |
| `public/icons/messages-square.svg`         | SVG          | 0 0 24 24                          |     543 |
| `public/icons/site-mark.svg`               | SVG          | 0 0 24 24                          |     433 |
| `public/icons/terminal.svg`                | SVG          | 0 0 24 24                          |     340 |
| `public/icons/wallet.svg`                  | SVG          | 0 0 24 24                          |     464 |
| `public/icons/wrench.svg`                  | SVG          | 0 0 24 24                          |     494 |
| `public/icons/x.svg`                       | SVG          | 0 0 24 24                          |     332 |
| `public/fonts/manrope-latin.woff2`         | WOFF2        | —                                  |   24836 |
| `docs/assets/originals/contact-leaves.png` | PNG          | 2172 × 724                         | 1548099 |
| `docs/assets/originals/team-workspace.png` | PNG          | 1374 × 1145                        | 2025713 |
| `public/favicon.ico`                       | ICO          | 16 × 16, 32 × 32, 48 × 48, 64 × 64 |    7367 |

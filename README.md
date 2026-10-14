# Tech Together

Landing de un grupo de programadores para pymes y negocios en Panamá. Angular 22 standalone con prerender estático e hidratación, TypeScript estricto, ngx-translate (es/en), Tailwind CSS 4 y Manrope local. Sin backend, autenticación ni analítica.

## Instalación y desarrollo

Node.js 24 LTS (24.15 o superior dentro de la rama 24) y npm 12. Conservar `package-lock.json`.

```bash
npm ci
npm start
```

Desarrollo en `http://localhost:4200`. Las rutas `/es` y `/en` determinan el idioma; `/` y rutas inválidas dirigen a `/es`. Los diccionarios se importan localmente antes de renderizar. La preferencia guardada nunca prevalece sobre una ruta explícita.

## Validación

```bash
npm run typecheck
npm run test:ci
npm run check:i18n
npm run check:styles
npm run check:contrast
npm run check:assets
npm run build:pages
npm run check:pages
```

Comprobaciones complementarias: `npm run test:i18n-validator` y `npm run test:seo`. No se ha añadido un linter; la compilación Angular, TypeScript y los validadores propios comprueban las convenciones disponibles.

`check:pages` verifica HTML completo en ambos idiomas, siete paquetes, precios, condiciones, presentación del grupo, metadatos, `index, follow`, navegación y prefijo del repositorio. `check:public` comprueba referencias a archivos locales y ausencia de la identidad y servicios retirados. Las pruebas cubren mensajes de WhatsApp, cambios de idioma, rutas, precios, hidratación, navegación y estados de contacto.

## Estructura y edición

- `src/app/core/config/`: configuración pública y tarifas tipadas.
- `src/app/core/data/`: catálogos de servicios, aplicaciones, navegación e iconos, con identificadores estables en inglés.
- `src/app/core/i18n/locales/es.json` y `en.json`: contenido, accesibilidad, mensajes y SEO. Editar frases completas en ambos idiomas con las mismas claves e interpolaciones.
- `src/app/core/i18n/service-interpolations.ts`: formato de precios y cantidades.
- `src/app/core/services/`: idioma, SEO, contacto y TransferState de los precios.
- `src/app/core/startup/`: ciclo de vida de la introducción.
- `src/app/shared/`: componentes, directivas y pipe `highlightText` reutilizables.
- `src/app/features/landing/components/`: Hero, Servicios, Aplicaciones, Sobre nosotros, Proceso y Contacto.
- `public/`: imágenes, iconos, fuentes y favicon locales.
- `scripts/`: validaciones, generación de SEO y servidor estático de prueba.

El encargo vigente presenta Tech Together como un grupo de programadores en Panamá. Todo el contenido habla en plural y no incluye perfiles, cargos ni firmas individuales. La experiencia del grupo y las funciones de las aplicaciones son datos proporcionados por el propietario; no se añaden clientes, cifras o testimonios.

## Tarifas y servicios

Los importes están exclusivamente en `core/config/services.config.ts`. Se muestran cinco paquetes con precio «Desde» y dos planes mensuales:

| Identificador         | Servicio                                                                |
| --------------------- | ----------------------------------------------------------------------- |
| `landing-page`        | Landing page para negocio                                               |
| `website`             | Sitio web administrable; cantidad máxima de secciones configurable      |
| `online-store`        | Catálogo o tienda online; pasarela local cotizada aparte                |
| `automation`          | Automatización de un proceso                                            |
| `custom-system`       | Sistema a medida                                                        |
| `maintenance-basic`   | Hosting, respaldos, actualizaciones y monitoreo, sin horas de cambios   |
| `maintenance-support` | Horas incluidas y tarifa adicional configurables, con aprobación previa |

Cambiar precios, secciones y horas en la configuración; condiciones y descripciones en los JSON. El orden y las claves de presentación están en `services.data.ts`. Cada servicio tiene un mensaje propio en `whatsapp`, enlazado por identificador en `contact-inquiry.ts`. El alcance se confirma antes de empezar.

USD se conserva en ambos idiomas. `Intl.NumberFormat` usa `es-PA` y `en-US`, `currencyDisplay: 'narrowSymbol'` y cero decimales: por ejemplo `$250` y `$1,200`. El texto introductorio identifica la moneda como USD. `ServicePricing` transfiere las cadenas formateadas del servidor al navegador para mantener la hidratación consistente.

## Imágenes y estados del portafolio

Los seis proyectos usan ilustraciones conceptuales generadas con IA, sin texto incrustado. Los pies de imagen aclaran que no son capturas reales. Cada recurso está en `public/images/{nombre}.webp` (960 × 600) y `{nombre}-480.webp` (480 × 300), con `srcset`, carga diferida y dimensiones reservadas. Nombres: `smartfinance`, `smartpos`, `omnisphere`, `helpdesk`, `world-cup` y `black-ninja`.

Los originales PNG se conservan en `docs/assets/originals/`, fuera de la salida pública. Origen, dimensiones y pesos: [docs/assets.md](docs/assets.md); encargos completos: [docs/portfolio-image-prompts.json](docs/portfolio-image-prompts.json). Para repetir la conversión: `python3 scripts/convert-portfolio-images.py` (Pillow solo como herramienta local; sin dependencias nuevas en la aplicación).

Los estados confirmados por el propietario se centralizan en `core/config/site-settings.ts`: SmartFinance publicado; SmartPOS y OmniSphere en desarrollo; Helpdesk, World Cup Predictor y Black Ninja sin publicar. Están traducidos y los proyectos en desarrollo muestran sus funciones como alcance previsto. No se incluyen enlaces de descarga ni demos. El enlace público de SmartFinance está pendiente de confirmación; su CTA sigue siendo una consulta por WhatsApp.

Si se sustituyen ilustraciones por capturas reales, actualizar ambas variantes, los alt y el pie de imagen en español e inglés. No editar `dist`. Las funciones del portafolio se editan en `applications` de ambos diccionarios; el catálogo tipado está en `applications.data.ts`.

La fotografía ambiental del hero conserva sus variantes nativas de 480 × 400 y 960 × 800; no representa una oficina real del grupo. Se reutiliza en Sobre nosotros. No se amplía artificialmente a 1440. `check:assets` valida los recursos utilizados, las hojas de contacto, SVG, WOFF2 e ICO.

Manrope conserva su licencia en `public/fonts/`; Lucide en `public/icons/LUCIDE-LICENSE.txt`. `public/icons/tt-mark.svg` es un monograma TT original, sin scripts ni referencias externas, usado con el componente de máscaras SVG existente.

## Contacto y configuración pública

`core/config/site-settings.ts` centraliza:

- WhatsApp confirmado: `50768702316`.
- URL pública: `https://joguerrero10.github.io/tech-services-landing`.
- Instagram: `https://www.instagram.com/techtogether.pa/`.
- Idiomas, locale de formato y nombres públicos de productos.

Los CTA usan enlaces wa.me con número validado y mensaje traducido codificado; solo se abren por acción del usuario y no envían mensajes automáticamente. Si se retira el número, establecer `whatsappNumber: null`: se muestran estados accesibles sin enlaces vacíos. La URL pública admite HTTPS y subruta, sin credenciales, query ni fragmento.

## Accesibilidad y presentación

Se conservan crema, verde bosque, terracota, Manrope y cuadrículas abiertas. El menú móvil despliega en el flujo normal, cierra al navegar y admite Escape con recuperación de foco. Las imágenes reservan espacio y el contenido admite traducciones largas.

**Excepción autorizada:** el enlace `.skip-link` utiliza `position: absolute` y desplazamiento vertical para quedar fuera de pantalla sin eliminarse del orden de tabulación. Aparece con `:focus`/`:focus-visible` y lleva a `main#contenido`. El validador permite ese posicionamiento exclusivamente en ese selector y sigue rechazándolo en el resto de estilos. No se oculta desbordamiento para disimular problemas.

La introducción inicial conserva cinco segundos, pantalla verde con símbolo de código, órbitas y salida de 420ms; el nombre público también usa Tech Together. La línea animada es decorativa, no un porcentaje de descarga. «Saltar introducción» o Escape la cierran. El foco pasa a `main` si estaba dentro de la introducción. Un error la retira y un límite de ocho segundos evita un bloqueo. Sin JavaScript o con movimiento reducido se muestra directamente el contenido. No se repite al cambiar de idioma.

La introducción usa Grid sin overlay. `min-block-size: 100svh` es la excepción documentada de unidad de viewport para cubrir la pantalla móvil; puede crecer con el contenido. Espaciado y tipografía propios siguen en rem/em.

## Publicación en GitHub Pages

El workflow `.github/workflows/pages.yml` se ejecuta al hacer push a `main` o manualmente. En Settings → Pages, usar **GitHub Actions**. El workflow ya utiliza **`npm run build:pages`**: aplica el prefijo `/tech-services-landing/` directamente a Angular y ejecuta el generador SEO en producción, sustituyendo el `noindex` inicial por **`index, follow`**, con sitemap y robots de producción.

No usar `npm run build -- --base-href ...`: el argumento terminaría en el generador SEO en vez de Angular, provocando redirecciones incorrectas. `npm run build` se reserva para vista previa con `noindex`; `build:production` es para servir en la raíz de un dominio.

Para ensayar la salida sin publicar:

```bash
npm run build:pages
npm run check:pages
BASE_PATH=/tech-services-landing npm run serve:static
```

Abrir `http://127.0.0.1:4300/tech-services-landing/`, `/tech-services-landing/es/` y `/tech-services-landing/en/`. El servidor no usa fallback SPA; las entradas directas deben corresponder a HTML reales. La raíz redirige a `/tech-services-landing/es`. Después de un cambio de repositorio, actualizar el prefijo en `build:pages`, `check:pages` y `publicSiteUrl`.

Compilar localmente no publica la web. Los commits y el push quedan a cargo del propietario.

## Proyectos aportados

El portafolio incluye SmartFinance PTY, SmartPOS PTY, OmniSphere AI, Helpdesk AI Automation, World Cup Predictor AI y Black Ninja. Los seis cuentan con ilustraciones conceptuales generadas para la landing y estados de publicación confirmados por el propietario. No se presentan como capturas reales.

Las descripciones se basan en el material proporcionado y en una revisión estática de sus módulos. No se han ejecutado esos proyectos, verificado integraciones externas ni confirmado despliegues; no se publican cifras de rendimiento, disponibilidad o enlaces de descarga. Los ZIP, sus configuraciones y sus datos no se copian a la landing. Cada proyecto tiene una consulta de WhatsApp con su nombre. Fuentes de la revisión en `docs/portfolio-sources.md`.

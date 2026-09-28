# Landing de equipo independiente

Base Angular standalone para servicios de formación, desarrollo y mantenimiento de software. Interfaz español/inglés con `@ngx-translate/core`, Tailwind CSS 4 mediante PostCSS y recursos locales.

## Desarrollo

Usar Node.js 24 LTS (24.15 o superior dentro de la rama 24) y npm 12, como indica `package.json`.

```bash
npm ci
npm start
```

La CLI sirve la página en `http://localhost:4200`. Para limitar explícitamente el servidor a la máquina local: `npm start -- --host 127.0.0.1`.

```bash
npm run build
npm run test:ci
npm run typecheck
npm run check:styles
npm run check:contrast
npm run check:i18n
npm run test:i18n-validator
npm run check:assets
npm run format:check
```

`check:assets` informa un pendiente real: falta la fotografía de 1440 × 1200 porque el generador no entregó suficiente resolución nativa; no se ha ampliado artificialmente ni se referencia ese archivo inexistente. Ver `docs/assets.md`.

El build se genera en `dist/tech-services-landing/browser`. No hay backend, autenticación, base de datos ni configuración de despliegue. `npm run format` aplica Prettier. No se configura ESLint en esta etapa; tipos, compilación Angular y comprobación CSS cubren las verificaciones disponibles.

## Organización y edición

- `src/app/core/config`: contacto confirmado y tarifas de servicios tipadas; nunca inventar destinos.
- `src/app/core/data`: catálogos de navegación, servicios, aplicaciones y proceso con claves de traducción tipadas.
- `src/app/core/i18n/locales`: fuente única de todos los textos en `es.json` y `en.json`.
- `src/app/core/services`: cambios de idioma, metadatos y construcción validada de enlaces.
- `src/app/shared/components`: piezas reutilizables; cada una separa TS, HTML y CSS.
- `src/app/features/landing`: página cargada mediante ruta y componentes de sección.
- `public`: fotografías, fuentes, SVG, favicon y licencias locales.

Los diccionarios se empaquetan con la aplicación: no hay descarga de traducciones ni estados de carga por idioma. Las rutas `/es` y `/en` determinan el idioma antes de activar la landing; `/` y rutas inválidas redirigen a `/es`. El selector conserva la sección, guarda la elección de forma segura y cambia también textos accesibles y metadatos. Los enlaces WhatsApp abren mensajes preparados; no envían mensajes automáticamente.

Tailwind conserva su integración PostCSS. Se importan tema y utilidades, con un reset CSS propio para evitar medidas en píxeles del preflight. El escaneo de Tailwind se limita a las plantillas HTML para que documentación y verificaciones no generen utilidades prohibidas. Usar `page-container` para el contenedor del diseño; `container` pertenece a Tailwind y aplica sus propios límites por breakpoint. No utilizar utilidades de posicionamiento ni `sr-only`.

Ver [internacionalización y tarifas](docs/i18n.md), [brief](docs/brief.md), [recursos y licencias](docs/assets.md) y [revisión visual](design-qa.md).

Referencias técnicas: [Tailwind con Angular](https://tailwindcss.com/docs/installation/framework-guides/angular), [configuración de ngx-translate](https://ngx-translate.org/reference/configuration/).

Sistema visual: [tokens, componentes y contraste](docs/design-system.md). Ejecutar `npm run check:contrast` para validar la paleta.

## Configuración pública e interacciones

La fuente central de datos es `src/app/core/config/site-settings.ts`, expuesta con tipos e inyección por `site.config.ts`:

- `whatsappNumber`: `50768702316`, confirmado por el usuario. Se valida como 8–15 dígitos internacionales sin `+`, espacios ni signos. La validación no comprueba la existencia de una cuenta.
- `publicSiteUrl`: **null, pendiente del dominio real**. No se genera un dominio ni se usa localhost como URL pública.
- `supportedLocales`: español e inglés; `defaultLocale`: español. Mapeo de rutas, formatos y etiquetas en la misma configuración.
- `products`: identificadores `finance` y `pos` y claves i18n de los nombres públicos SmartFinance PTY y SmartPOS PTY. No se configuran prestaciones ni enlaces no confirmados.

`CONTACT_CONFIG` conserva una vista inyectable de la configuración de contacto para pruebas y consumidores existentes. Si se retira el número real, usar `whatsappNumber: null`: la configuración de contacto queda pendiente y los CTA muestran un estado traducido, sin `href` vacío. Un número mal formado produce el mismo comportamiento seguro con una explicación de error; el resto de la landing continúa funcionando.

`ContactService.link()` recibe una consulta tipada general, de servicio o de producto; resuelve la traducción activa, interpola el nombre de producto y codifica el mensaje con `encodeURIComponent`. Cada CTA conserva su identificador estable. Los enlaces nativos solo abren WhatsApp al activarlos; nunca envían mensajes automáticamente.

El salto al contenido es siempre visible y compacto. El menú móvil se abre dentro del flujo, se cierra al navegar y recupera el foco del botón con Escape, sin overlay ni captura del foco. Comprobaciones de esta etapa: `docs/interactions.md`.

## HTML estático y SEO

`npm run build` genera `/`, `/es` y `/en` en `dist/tech-services-landing/browser`, con contenido completo e hidratación. `npm run check:prerender` comprueba los HTML reales. `npm run serve:static` los sirve en `http://127.0.0.1:4300` sin fallback SPA.

La compilación normal es una vista previa: `noindex` y `robots.txt` bloquean indexación. Cuando exista el dominio real, configurar `publicSiteUrl` en `site-settings.ts` y ejecutar `npm run build:production`: habilita el sitemap y robots de producción. Sin dominio se mantiene el bloqueo y se omiten URLs públicas, incluso en producción. No se ha desplegado.

Configuración, comprobaciones y límites: [SEO y prerender](docs/seo-prerender.md).

## Mantener contenidos y datos

### Textos e idiomas

Editar frases completas en `src/app/core/i18n/locales/es.json` y `en.json`, incluidas etiquetas accesibles, SEO y mensajes de WhatsApp. Mantener los mismos nombres de interpolación y no insertar HTML. Actualmente solo se autorizan español e inglés. Para un idioma nuevo se necesitarían diccionario completo, mapa explícito en `site-settings.ts`, configuración de rutas/locale y actualización del validador; no basta con añadir una opción al selector. Ejecutar `check:i18n`, pruebas y `check:prerender` después del build.

### Tarifas y condiciones

Los importes y cantidades se editan en `core/config/services.config.ts`; no se copian a componentes ni JSON. La duración del curso y el ejemplo de desarrollo se calculan automáticamente. `service-interpolations.ts` aplica Intl con USD; `ServicePricing` transfiere el formato del servidor a la hidratación. Si cambia el paquete de tutorías, mantener coherentes horas y precio; el paquete actual no incluye descuento. Las condiciones redactadas se cambian en ambos diccionarios. Mantener aprobación explícita para trabajo adicional de mantenimiento y su unidad «por hora».

### Lanzamiento del curso

El único estado permitido actualmente es `upcoming`. No se habilitan matrículas ni pagos. Cuando se autorice su lanzamiento, modificar de manera conjunta el tipo y valor de estado en `services.config.ts`, el catálogo de servicios, los textos de estado/condiciones/WhatsApp en ambos idiomas y las pruebas que comprueban «Próximamente». Solo añadir fecha, enlace o disponibilidad si se proporciona información real. Cambiar únicamente la etiqueta no constituye un lanzamiento correcto.

### Información real de aplicaciones

Los identificadores `finance` y `pos` permanecen estables en `site-settings.ts`. Añadir únicamente datos confirmados al modelo y catálogo de `core/data/applications.data.ts`; las descripciones y nombres públicos se mantienen en ambos diccionarios. Los enlaces externos nuevos requieren destinos reales validados. Los iconos son ilustraciones genéricas, no logotipos oficiales. Hoy ambos CTA solo solicitan información por WhatsApp.

### Teléfono y dominio

Editar `whatsappNumber` y `publicSiteUrl` en `core/config/site-settings.ts`. El teléfono actual fue proporcionado por el usuario. Para retirar el contacto usar null. El dominio debe ser un origen raíz HTTPS real, sin ruta, credenciales, query ni fragmento; sigue pendiente. Tras cambiarlo, reconstruir y revisar canonical/hreflang, sitemap y robots en la salida. No editar directamente dist.

## Revisión final reproducible

```bash
npm run build:production
npm run check:prerender
npm run check:public
npm run test:ci
npm run test:i18n-validator
npm run test:seo
npm run typecheck
npm run check:i18n
npm run check:styles
npm run check:contrast
npm run check:assets
npm run format:check
```

`check:assets` permanece deliberadamente en error por el recurso pendiente de 1440 píxeles; no se oculta ese resultado. Los archivos usados por la landing son válidos. Informe y evidencias de la revisión completa: [auditoría final](docs/final-audit.md).

Para repetir el ensayo de texto aumentado y sin JavaScript, iniciar `npm run serve:static` y, en otra terminal, `node scripts/serve-audit.mjs`. Las URLs `http://127.0.0.1:4301/es?audit=text-200` y `http://127.0.0.1:4301/en?audit=no-js` son fixtures locales: no se publican ni forman parte de dist. El ensayo de texto al 200% no equivale a manipular el zoom nativo del navegador.

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
npm run check:assets
npm run format:check
```

`check:assets` informa un pendiente real: falta la fotografía de 1440 × 1200 porque el generador no entregó suficiente resolución nativa; no se ha ampliado artificialmente ni se referencia ese archivo inexistente. Ver `docs/assets.md`.

El build se genera en `dist/tech-services-landing/browser`. No hay backend, autenticación, base de datos ni configuración de despliegue. `npm run format` aplica Prettier. No se configura ESLint en esta etapa; tipos, compilación Angular y comprobación CSS cubren las verificaciones disponibles.

## Organización y edición

- `src/app/core/config`: datos de contacto confirmados; nunca inventar destinos.
- `src/app/core/data`: catálogos de navegación, servicios, aplicaciones y proceso con claves de traducción tipadas.
- `src/app/core/i18n/locales`: fuente única de todos los textos en `es.json` y `en.json`.
- `src/app/core/services`: cambios de idioma, metadatos y construcción validada de enlaces.
- `src/app/shared/components`: piezas reutilizables; cada una separa TS, HTML y CSS.
- `src/app/features/landing`: página cargada mediante ruta y componentes de sección.
- `public`: fotografías, fuentes, SVG, favicon y licencias locales.

Los diccionarios se empaquetan con la aplicación: no hay descarga de traducciones ni estados de carga por idioma. Español es el idioma inicial y el selector cambia también textos accesibles y metadatos. Los enlaces WhatsApp abren mensajes preparados; no envían mensajes automáticamente.

Tailwind conserva su integración PostCSS. Se importan tema y utilidades, con un reset CSS propio para evitar medidas en píxeles del preflight. El escaneo de Tailwind se limita a las plantillas HTML para que documentación y verificaciones no generen utilidades prohibidas. Usar `page-container` para el contenedor del diseño; `container` pertenece a Tailwind y aplica sus propios límites por breakpoint. No utilizar utilidades de posicionamiento ni `sr-only`.

Ver [brief](docs/brief.md), [recursos y licencias](docs/assets.md) y [revisión visual](design-qa.md).

Referencias técnicas: [Tailwind con Angular](https://tailwindcss.com/docs/installation/framework-guides/angular), [configuración de ngx-translate](https://ngx-translate.org/reference/configuration/).

Sistema visual: [tokens, componentes y contraste](docs/design-system.md). Ejecutar `npm run check:contrast` para validar la paleta.

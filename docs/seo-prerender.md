# SEO y prerender estático

Usamos `@angular/ssr` y `@angular/platform-server` 22.2.0, compatibles con Angular instalado, y el builder oficial `@angular/build:application` con `outputMode: static`. Referencia: [renderizado oficial de Angular](https://angular.dev/best-practices/performance/ssr). El lockfile conserva las versiones resueltas. No se requiere servidor Angular en producción.

## Rutas y contenido inicial

- `/es/index.html`: página completa en español.
- `/en/index.html`: página completa en inglés.
- `/index.html`: contenido español y redirección meta refresh a `/es`, que funciona sin JavaScript. Se enriquece la redirección generada por Angular con el HTML del idioma predeterminado.

El idioma procede del mapa explícito de rutas. El resolver espera al diccionario local incorporado al bundle. H1, servicios, condiciones, curso próximo y aplicaciones ya están en los HTML, antes de ejecutar JavaScript. No hay detección por navigator. localStorage está protegido por plataforma y excepciones. IntersectionObserver es opcional; las secciones son visibles de forma predeterminada. No se genera marcado de empresa, valoraciones, personas ni ofertas.

`provideClientHydration(withEventReplay())` comparte la configuración cliente/servidor. La navegación inicial ya no fuerza el modo bloqueante incompatible con la secuencia de hidratación. `ServicePricing` conserva en TransferState los importes producidos por Intl.NumberFormat con USD y locale explícito. El cliente reutiliza esos valores para evitar diferencias de espacios o agrupación entre versiones ICU; un cambio posterior de idioma utiliza su locale correspondiente.

## Metadatos y dominio pendiente

`SeoService` genera title, description, og:title, og:description, og:type y og:locale desde i18n/configuración. `publicSiteUrl` sigue en null. No inferimos el dominio desde localhost, el host de una petición o un entorno de preview.

Cuando se configure un origen raíz HTTPS público válido en `core/config/site-settings.ts`, se generarán canonical por idioma, og:url, alternativas es/en y x-default apuntando a `/es`. Se actualizan al navegar sin acumular duplicados. Por ahora se omiten, al igual que sitemap.xml, para no publicar URLs inventadas. El generador rechaza dominios configurados con formato inválido.

| Compilación                                    | robots.txt | Meta robots       | Sitemap                                       |
| ---------------------------------------------- | ---------- | ----------------- | --------------------------------------------- |
| `npm run build` (preview)                      | Disallow / | noindex, nofollow | omitido                                       |
| `npm run build:production`, sin dominio        | Disallow / | noindex, nofollow | omitido                                       |
| `npm run build:production`, con dominio válido | Allow /    | index, follow     | es/en con alternativas recíprocas y x-default |

`robots.txt` es una directiva de rastreo, no un control de acceso. El generador limpia sitemaps antiguos en builds de preview. No usa fechas ni prioridad ficticias.

## Servir localmente, sin desplegar

Con Node 24.21 y npm disponibles:

```bash
npm ci
npm run build
npm run check:prerender
npm run serve:static
```

Abrir `http://127.0.0.1:4300/`, `/es` y `/en`; recargar directamente. `PORT=4400 npm run serve:static` permite otro puerto. El servidor incluido solo escucha en loopback y sirve archivos de `dist/tech-services-landing/browser`; no transforma peticiones ni ejecuta SSR. Una ruta desconocida devuelve 404. En una futura configuración de hosting, servir los índices de directorio para `/es` y `/en`; no devolver el índice raíz para todas las rutas, pues perdería idioma y contenido inicial. La raíz puede configurarse como redirección HTTP a `/es` en ese hosting. Las navegaciones inválidas dentro de Angular mantienen la redirección controlada a español.

## Rendimiento y verificación

Se conservan WebP con srcset/sizes y dimensiones intrínsecas; solo la imagen del hero tiene prioridad alta. Manrope sigue local con swap y una precarga. Los iconos se solicitan individualmente; el SVG laptop no utilizado se archivó fuera de public. No añadimos analítica ni marketing.

`check:prerender` analiza los archivos con un DOM sin ejecutar scripts: valida texto completo de servicios, interpolaciones, importes transferidos, H1, idioma, metadatos, productos y ausencia de claves/nombres excluidos. Las pruebas de SeoService validan ausencia de dominio, URL inválida, canonical/alternativas y cambios de idioma; las pruebas del generador cubren ambos entornos y XML real. Los dominios de prueba son exclusivamente fixtures.

La documentación de recursos conserva por separado el pendiente anterior de la variante hero de 1440 píxeles. No se anuncia en srcset un archivo inexistente ni se amplía artificialmente el original.

## Resultado verificado

Build estático aprobado con tres rutas; 36 pruebas Angular y 3 pruebas del generador SEO (`npm run test:seo`) aprobadas. También pasan tipos, i18n, restricciones CSS y formato. Se abrió la salida de puerto 4300, con entrada directa y recarga de español e inglés, redirección de raíz y cambio de idioma tras hidratar, sin errores de hidratación registrados para ese origen. No se enviaron mensajes ni se desplegó.

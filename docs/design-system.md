# Sistema visual

Implementado con Tailwind CSS 4 y su integración PostCSS de Angular. La fuente de verdad es `src/styles.css`: `@theme static` expone los tokens como variables CSS y utilidades. Los componentes standalone conservan sus archivos propios y consumen el tema mediante `@reference` y `@variant`, sin duplicar breakpoints. Solo español e inglés.

## Paleta y contraste

| Token `--color-…` | Valor     | Uso                                                |
| ----------------- | --------- | -------------------------------------------------- |
| `background`      | `#FAF8F3` | Fondo crema                                        |
| `surface`         | `#FFFFFF` | Banda de aplicaciones, estados hover claros        |
| `primary`         | `#173F32` | Títulos, iconos y botones                          |
| `primary-hover`   | `#102D24` | Estados hover y activo                             |
| `accent`          | `#B45235` | Énfasis, tarifas, pasos y foco sobre fondos claros |
| `accent-strong`   | `#A6482E` | Texto de etiqueta                                  |
| `accent-soft`     | `#F6E7DE` | Fondo de etiqueta y selección de texto             |
| `text`            | `#152A23` | Texto principal                                    |
| `text-muted`      | `#5E625F` | Descripciones y condiciones                        |
| `divider`         | `#DDDAD2` | Separadores decorativos                            |
| `control-border`  | `#767A75` | Contorno de selector y menú                        |
| `on-primary`      | `#FAF8F3` | Texto y foco sobre verde                           |

El terracota inicial `#B95638` daba **4.45:1** sobre crema; se ajustó a `#B45235` para alcanzar **4.71:1**, incluso en texto normal. La variante de etiqueta alcanza **4.85:1** sobre su fondo suave.

| Combinación                          | Contraste |
| ------------------------------------ | --------- |
| Texto principal / crema              | 14.26:1   |
| Texto secundario / crema             | 5.84:1    |
| Texto secundario / blanco            | 6.20:1    |
| Verde / crema, crema / verde         | 11.03:1   |
| Verde / blanco                       | 11.71:1   |
| Crema / verde profundo               | 13.91:1   |
| Terracota / crema, crema / terracota | 4.71:1    |
| Terracota / blanco                   | 5.00:1    |
| Borde de control / crema             | 4.11:1    |
| Borde de control / blanco            | 4.37:1    |

`npm run check:contrast` calcula luminancia sRGB desde los tokens reales y falla por debajo de 4.5:1 para texto o 3:1 para límites de controles. Los divisores tenues son decorativos; no identifican controles. Estas comprobaciones de contraste no constituyen una auditoría completa de accesibilidad.

El contacto usa el WebP local con `background-image`, fondo verde y `background-blend-mode: multiply`. Esta mezcla no aclara ningún canal por encima del verde base: conserva un contraste mínimo de 11.03:1 para texto crema en toda la imagen. No depende de encontrar una zona oscura concreta ni requiere posicionamiento. El fondo verde funciona también si no carga la fotografía.

## Tipografía y medidas

Manrope variable local, pesos usados de 400 a 800, `font-display: swap`, respaldo `sans-serif`. El tamaño raíz conserva el valor del navegador; no se redefine para convertir rem a píxeles.

| Tokens                                                                  | Medida                                       |
| ----------------------------------------------------------------------- | -------------------------------------------- |
| `text-small`, `text-body`, `text-lead`                                  | 0.875rem, 1rem, 1.125rem                     |
| `text-card`, `text-price`                                               | 1.25rem, 1.75rem                             |
| `text-section`, `text-section-lg`                                       | 2rem, 2.5rem                                 |
| `text-display`, `text-display-sm`, `text-display-lg`, `text-display-xl` | 2.25rem, 2.75rem, 3.25rem, 4rem              |
| `leading-body`, `leading-heading`                                       | 1.6, 1.1                                     |
| `tracking-heading`, `tracking-eyebrow`                                  | -0.04em, 0.12em                              |
| `spacing`                                                               | Base de 0.25rem para utilidades de espaciado |
| `spacing-gutter`, `spacing-gutter-desktop`                              | 1.25rem, 2rem                                |
| `spacing-section`, `spacing-section-lg`                                 | 3.5rem, 5rem                                 |
| `spacing-control`                                                       | Altura mínima de 2.75rem                     |
| `container-page`, `container-copy`                                      | Máximos de 80rem, 36rem                      |
| `radius-control`, `radius-media`                                        | 0.75rem, 1rem                                |
| `border-fine`                                                           | 0.0625rem                                    |
| `outline-focus`, `outline-offset`                                       | 0.1875rem, 0.25rem                           |
| `duration-interaction`, `ease-interaction`                              | 160ms, `cubic-bezier(0.2, 0, 0, 1)`          |

No hay sombras, alturas fijas para texto ni truncamiento. Los controles crecen con su contenido. `gap`, `minmax(0, 1fr)`, `min-width: 0` y `flex-wrap` permiten reflujo de las traducciones. Las imágenes conservan dimensiones intrínsecas en píxeles y proporción 6:5. El atributo HTML `sizes` expresa el ancho fluido mediante `calc()` y unidades de viewport, exclusivamente para seleccionar la imagen; no define la maquetación CSS.

## Responsive

| Variante | Umbral | Comportamiento                                                               |
| -------- | ------ | ---------------------------------------------------------------------------- |
| Base     | —      | Hero, servicios, aplicaciones y proceso en una columna; menú desplegable     |
| `sm`     | 40rem  | H1 de 2.75rem                                                                |
| `md`     | 48rem  | Servicios 2 × 2 y aplicaciones en dos columnas; gutters de 2rem              |
| `lg`     | 64rem  | Hero en dos columnas, proceso en tres, navegación visible; secciones de 5rem |
| `xl`     | 80rem  | H1 de 4rem                                                                   |

El contenedor `.page-container` llega a 80rem, con márgenes automáticos y gutters mínimos. No sustituirlo por la utilidad `container` de Tailwind, cuyo comportamiento es distinto. Los servicios forman una cuadrícula abierta con divisores horizontales en móvil y divisores entre columnas desde `md`. Las aplicaciones cambian el separador horizontal por uno vertical desde `md`.

## Componentes reutilizables

- **`.button.button--primary`:** fondo verde, texto crema, hover verde profundo, tamaño mínimo accesible y contenido multilínea.
- **`.button.button--light`:** fondo crema y texto verde para la banda de contacto; hover blanco.
- **`.text-link`:** texto y flecha SVG local, separados mediante Flexbox; subrayado en hover y foco visible.
- **Selector de idioma:** `select` nativo con etiqueta accesible traducida, español e inglés, borde perceptible y sin ancho fijo.
- **`.badge`:** etiqueta traducida «Próximamente» / «Coming soon», terracota oscuro sobre fondo suave.
- **`.rate-block`:** agrupación de `.rate-amount` y `.rate-conditions`, con jerarquía tipográfica y separación de 0.5rem.
- **Menú móvil:** botón nativo con `aria-expanded`, `aria-controls` y nombre traducido; panel oculto con `display: none` cuando está cerrado. Al abrirlo, empuja el hero. Se cierra al seguir un enlace; Escape lo cierra y devuelve el foco al botón. En escritorio el panel siempre es visible y el botón queda oculto.
- **Foco de teclado:** contorno terracota sobre crema/blanco, crema sobre verde mediante `--focus-color`. El enlace para saltar al contenido se expande dentro del flujo al recibir foco.

Los iconos externos se usan como máscaras locales con el color del componente; no se supone que un `img` herede `currentColor`. Transiciones únicamente de color, fondo y borde. `prefers-reduced-motion` elimina transiciones y animaciones.

Ejemplo de consumo en un componente:

```css
@reference '../../../../../styles.css';

.example {
  color: var(--color-primary);
  gap: calc(4 * var(--spacing));
  @variant lg {
    gap: calc(8 * var(--spacing));
  }
}
```

Las utilidades existentes como `flex`, `flex-wrap`, `items-center` y `gap-6` consumen el mismo tema. No usar posicionamiento absoluto, relativo, fijo o sticky, tampoco en pseudoelementos. No usar `sr-only`, porque utiliza posicionamiento absoluto. Tailwind escanea solamente las plantillas HTML para no generar utilidades a partir de textos de documentación o pruebas.

## Verificación

- Compilación de producción, TypeScript estricto y suite Vitest, incluida apertura/cierre del menú y recuperación del foco.
- `check:styles` verifica las unidades y la prohibición de posicionamiento en fuentes.
- `check:contrast` valida las combinaciones usadas.
- Revisión en navegador de cuadrículas, menú, foco, traducciones y ausencia de desplazamiento horizontal. Evidencia de esta etapa en `docs/qa/design-system-*`.

La fotografía de hero de 1440 píxeles sigue pendiente de la etapa de recursos: los archivos de 480 y 960 son reales y se reutilizan sin ampliarlos. Consultar `assets.md` para origen, licencias y limitaciones; este sistema visual no modifica esos recursos.

Referencias: [tema de Tailwind](https://tailwindcss.com/docs/theme), [directivas `@reference` y `@variant`](https://tailwindcss.com/docs/functions-and-directives), [contraste mínimo WCAG](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum).

# Brief de la landing

## Alcance de esta etapa

Actualizar la base existente de Angular y dejarla compilando, con arquitectura por capas, componentes separados, internacionalización y una primera implementación responsive del diseño `diseño.png`. Esta especificación sustituye el enfoque de freelancer individual. Conservar todo trabajo compatible. No desplegar, crear commits ni publicar cambios.

## Identidad pública

- Descripción neutral en la cabecera: **Equipo independiente** (Independent team en inglés).
- Somos un equipo pequeño de profesionales independientes; hablar en plural: somos, desarrollamos, enseñamos, acompañamos.
- No fijar el número de integrantes ni presentar la página como una empresa registrada.
- Sustituir la marca personal anterior «Joel.» y su monograma.
- No usar SmartNova, SmartNova PTY, SmartAcademy ni Smart Academy en interfaz, metadatos, favicon ni recursos públicos.
- No explicar públicamente motivos relacionados con el registro de nombres.
- Mantener **SmartFinance PTY** y **SmartPOS PTY** exclusivamente como nombres de producto.
- No inventar testimonios, clientes, estadísticas, integrantes, certificaciones, fechas, funcionalidades de producto ni contactos.

## Servicios

1. Tutorías de programación y big data.
2. Curso de fundamentos de Python en vivo.
3. Desarrollo de software.
4. Mantenimiento de software, que sustituye al soporte técnico a domicilio.

Tarifas y condiciones tomadas de la referencia adjunta, no estimadas:

| Servicio       | Referencia       | Condiciones mostradas                                                                                                                             |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tutorías       | USD 30 / hora    | Diagnóstico, clase en vivo, ejercicios y seguimiento. Paquete de 4 horas: USD 120.                                                                |
| Python en vivo | USD 120 / alumno | Próximamente; 6 sesiones de 2 horas, ejercicios y proyecto final. Grupo de 4 a 6 alumnos. Lanzamiento tras validar contenido en tutorías.         |
| Desarrollo     | USD 50 / hora    | Aplicaciones web y móviles, sistemas internos, integraciones y automatizaciones. Ejemplo de 40 horas: USD 2,000. Alcance y entregables acordados. |
| Mantenimiento  | USD 100 / mes    | Hasta 2 horas; adicionales a USD 50, previa aprobación. Sujeto a evaluación del software.                                                         |

El tamaño del grupo de alumnos no describe el tamaño del equipo. Confirmamos alcance y disponibilidad antes de empezar.

## Estructura de la página

Header, selector de idioma, hero, servicios, aplicaciones, proceso de trabajo, contacto y footer. Un único h1 y secciones con encabezados y destinos de navegación accesibles.

Proceso: conversamos sobre la necesidad, acordamos alcance y costo, trabajamos contigo. Productos: mostrar nombre y consulta de información, sin inventar pantallas o prestaciones.

WhatsApp confirmado por el usuario: **+507 6870-2316**. Configuración central en `src/app/core/config/contact.config.ts`, con dígitos internacionales `50768702316`. Los enlaces preparan mensajes traducidos específicos; no envían mensajes automáticamente. No se agregan otros datos de contacto.

## Diseño y accesibilidad

- Referencia visual: `diseño.png`, conservada sin modificaciones.
- Fondo crema, verde bosque y detalles terracota; fotografía cálida de espacio compartido.
- Manrope local, fotografías WebP, iconos SVG locales y favicon ICO neutral.
- Mobile first, responsive, Flexbox y CSS Grid; todo en flujo normal.
- Prohibidos `position: absolute`, `relative`, `fixed` y `sticky`, incluidas utilidades Tailwind y pseudoelementos. No usar `sr-only` porque introduce posicionamiento absoluto.
- Tipografía, espacios, bordes, radios y breakpoints en rem/em. Permitir %, fr, auto y proporciones sin unidad para layouts fluidos.
- Reservar píxeles para dimensiones intrínsecas de imágenes, formatos que los requieran y herramientas de prueba.
- Mantener el tamaño raíz del navegador, sin convertir 1rem en 10px.
- Navegación por teclado, foco visible, enlace de salto en flujo normal, selector nativo con nombre accesible, imágenes con alt traducido y decoración oculta a lectores de pantalla.
- Respetar reducción de movimiento. No depender de animaciones para mostrar contenido.
- Terracota ajustada a `#B45235` para cumplir contraste AA sobre crema. Tokens y componentes documentados en `docs/design-system.md`; fuente de verdad en `src/styles.css`.

## Stack y capas

Angular standalone, TypeScript estricto y plantillas estrictas; Tailwind CSS 4 con `@tailwindcss/postcss` en `.postcssrc.json`; CSS global y de componentes; `@ngx-translate/core`. Mantener versiones estables compatibles y `package-lock.json`.

```text
src/app/
  app.*                       Composición, bootstrap y rutas
  core/
    config/                   Configuración de contacto
    data/                     Catálogos y claves i18n tipadas
    i18n/                     Tipos y loader local
      locales/                es.json y en.json
    services/                 Idioma, metadatos y enlaces de contacto
  shared/
    components/               Header, selector, footer, icono y enlace de contacto
    directives/               Reservado para comportamientos reutilizables necesarios
  features/landing/
    landing.*                 Composición de la página
    components/               Hero, servicios, aplicaciones, proceso y contacto
public/
  images/                     Fotografías WebP
  icons/                      SVG y licencias
  fonts/                      Manrope WOFF2 y licencia
  favicon.ico
docs/
scripts/
```

Cada componente tiene TypeScript, HTML y CSS separados. `features` consume `core` y `shared`; `core` no depende de componentes. Evitar capas vacías de lógica, dependencias nuevas innecesarias y directivas sin una necesidad real.

## Internacionalización

- Todo texto de interfaz proviene de los diccionarios, incluidos nombres de producto, precios, acciones, etiquetas, alt y metadatos.
- Únicamente español e inglés para contenido e interfaz. Español inicial e inglés seleccionable; se actualiza `html[lang]`, título, descripción y Open Graph.
- Diccionarios locales incorporados al bundle, disponibles antes de renderizar, sin cargador HTTP adicional.
- Los catálogos guardan claves, no traducciones copiadas. Comprobar paridad de claves entre idiomas.
- El selector no persiste preferencias en esta etapa.
- El título del HTML inicial queda vacío y se establece desde i18n al iniciar Angular. Si se necesita indexación sin JavaScript, evaluar prerender en una etapa posterior.

## Restricciones y verificación

No incorporar autenticación, administración, base de datos ni despliegue. No inventar endpoints, enlaces de producto o formularios que aparenten enviar datos.

Verificar build de producción, tipos estrictos, pruebas de comportamiento, formato y restricciones CSS. Revisar escritorio y móvil, idiomas, enlaces, consola y foco. No afirmar compatibilidad con navegadores o tecnologías asistivas que no se hayan probado. La verificación de enlaces no implica enviar mensajes ni confirmar la disponibilidad de una cuenta de WhatsApp.

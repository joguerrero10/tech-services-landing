# Interacciones de la landing

La configuración pública reside en `core/config/site.config.ts`. El número de WhatsApp está confirmado; el dominio público sigue en null. Los datos de producto se limitan a identificadores estables y claves de nombre traducibles. Las opciones del selector proceden de la lista de locales configurada.

`ContactInquiry` distingue consulta general, servicio (`tutoring`, `python-course`, `development`, `maintenance`) y producto (`finance`, `pos`). `ContactService.link()` devuelve una unión tipada: enlace disponible, configuración pendiente o inválida. Traduce el mensaje según el diccionario activo, interpola el nombre de producto y delega la codificación del texto en `encodeURIComponent`. Los enlaces calculados reaccionan al cambio de idioma incluso sin recrear el componente.

Los CTA usan enlaces semánticos. No hay temporizadores, popups, peticiones ni apertura automática de WhatsApp. El mensaje queda preparado y la persona debe enviarlo desde WhatsApp. La ausencia o invalidez del teléfono muestra texto traducido con `role="status"`, sin enlace falso ni control que parezca disponible.

Navegación local mediante RouterLink: servicios y explorar servicios → `servicios`; aplicaciones → `aplicaciones`; cómo trabajamos → `proceso`; hablemos/contacto → `contacto`; salto al contenido → `contenido`. La ruta de idioma se conserva. El menú nativo abre en el flujo, cierra al elegir sección, expone `aria-expanded`/`aria-controls` y Escape devuelve foco al botón. No se usa overlay ni focus trap. Iconos decorativos con `aria-hidden`, selector etiquetado y salto al contenido siempre visible.

## Verificación

- Pruebas de configuración ausente y número mal formado: ningún enlace y explicación accesible en ambos idiomas.
- Mensajes distintos para las siete consultas, interpolación de ambos productos y codificación de caracteres especiales.
- Cambio de mensaje español/inglés en la misma instancia de CTA; ninguna llamada a `window.open`.
- Pruebas existentes de cierre por navegación, Escape, destinos de sección y selector.
- Navegador integrado a 390 píxeles: salto por Enter enfocó `main#contenido`; navegación al proceso cerró el menú y enfocó `#proceso`; Escape cerró y enfocó «Abrir menú».
- Cambio a inglés conservó `/en#proceso`, actualizó los ocho enlaces visibles (dos generales, cuatro servicios y dos productos) y mantuvo ausencia de desplazamiento horizontal.

Se inspeccionaron los enlaces sin abrir WhatsApp ni enviar mensajes. La validación del formato telefónico no verifica si el destinatario tiene una cuenta. Teclado y controles de clic comprobados; no se afirma una prueba en dispositivo táctil físico ni con lector de pantalla real.

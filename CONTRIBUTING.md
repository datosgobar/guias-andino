# Cómo contribuir a la guía

Estas pautas buscan que la guía mantenga un mismo tono y un mismo criterio visual aunque la escriban varias personas a lo largo del tiempo.

## A quién le hablamos

La portada y la guía de uso están dirigidas a personas sin formación técnica: quienes deciden si su organismo implementa Andino y quienes publican datos. No incluyen comandos ni usan términos técnicos sin explicarlos. El resto de la guía de instalación está escrito para quien instala y mantiene el portal; se puede dar por sentado que esa persona maneja una terminal Linux y Docker, pero no que conoce CKAN.

## Cómo escribir

La guía se escribe en prosa: oraciones completas, enlazadas con conectores, que explican qué hay que hacer y por qué en el mismo párrafo. Una sucesión de oraciones breves y sueltas, como "Cada bloque es un contenedor. Tocalo para ver qué hace.", suena a texto publicitario y obliga a quien lee a reconstruir la relación entre las ideas, así que conviene unirlas en una sola oración que diga lo mismo con claridad.

- Se usa el voseo (*podés*, *revisá*) o la forma impersonal (*se puede*, *hay que*), nunca *usted*.
- Cuando algo puede fallar, se describe cómo se manifiesta el error y no solo que "puede fallar".
- Lo que todavía no se comprobó se marca como *A validar* en lugar de presentarse como un hecho.
- Los nombres de variables, comandos, archivos y plugins van siempre en formato `código`.
- Para la incorporación automática de datos de otros portales se usan los términos del equipo: *harvestear* como verbo y *harvesting* como sustantivo ("el harvesting"), nunca *cosechar* ni *cosecha*.

### Qué evitar

| Evitar | Por qué | En su lugar |
|---|---|---|
| Frases eslogan: "Todos los datos, un lugar", "Simple. Rápido. Abierto." | Suenan a folleto y no informan nada. | Una oración que diga qué hace la herramienta. |
| Oraciones cortas encadenadas: "Es rápido. Es seguro. Funciona." | Fragmentan la idea y tienen tono publicitario. | Una oración completa con conectores. |
| Dos puntos o guiones largos para crear suspenso: "La clave: el `.env`" | Es un recurso efectista que no agrega información. | "La configuración está en el `.env`". |
| Listas de tres adjetivos | Relleno. | Un dato concreto. |
| "Simplemente", "fácilmente", "solo tenés que" | Si a alguien le cuesta, se siente tonto. | Borrar la palabra. |
| Emojis | No suman información. | Nada. |
| Cerrar una sección resumiendo lo que se acaba de decir | Ya se leyó. | Terminar cuando se terminó. |

## Cómo está organizado el sitio

La guía usa [Starlight](https://starlight.astro.build/), el tema de documentación de Astro. Cada página es un archivo dentro de `src/content/docs/`, y el menú lateral se define en la opción `sidebar` de `astro.config.mjs`.

| Qué | Dónde |
|---|---|
| Portada | `src/content/docs/index.mdx` |
| Guía de instalación | `src/content/docs/instalacion/` |
| Anexos, incluido el registro de cambios | `src/content/docs/anexos/` |
| Guía de uso | `src/content/docs/uso/` |
| Datos del mapa de contenedores y de la lista de plugins | `src/data/arquitectura.js` |
| Diagrama, mapa y lista de plugins | `src/components/` |
| Scripts descargables | `scripts/` |
| Capturas de la guía de uso | `public/uso/capturas/` |
| Colores y tipografía | `src/styles/datos.css` |

Una página nueva empieza con este encabezado, y para que aparezca en el menú hay que sumarla en `sidebar`:

```markdown
---
title: Título de la página
description: Una oración que resuma la página, que también usan los buscadores.
---
```

Los enlaces internos se escriben con la ruta completa desde la raíz, como `/anexos/harvester/`, y el sitio les agrega el prefijo de la dirección base. Los títulos de los pasos de la instalación llevan número (`## 3. Revisar los plugins`), y ese número forma parte del ancla, así que si se reordenan los pasos hay que actualizar los enlaces que apuntan a ellos.

## Notas y avisos

Hay dos formas de destacar información, y las dos usan el mismo código de color: amarillo para lo que conviene saber y rojo para lo que deja el portal sin funcionar, borra datos o compromete la seguridad.

Las **notas desplegables** permiten agregar aclaraciones sobre un valor por defecto sin interrumpir la lectura. El título tiene que transmitir lo esencial aunque nadie abra la nota, y el contenido va entre líneas en blanco para que se interprete como Markdown:

```html
<details class="nota">
<summary>Título que ya dice de qué va la nota</summary>

Por qué el valor por defecto es así, cuándo conviene cambiarlo
y qué pasa si se cambia.

</details>
```

Para una nota grave se usa `<details class="nota grave">`.

Los **avisos** se ven siempre, sin necesidad de abrirlos, y se escriben con la sintaxis de Starlight: `caution` es amarillo y `danger` es rojo.

```markdown
:::caution[A validar]
Qué falta comprobar y qué hacer mientras tanto.
:::

:::danger[La operación no se puede deshacer]
Qué se pierde y qué precaución hay que tomar antes.
:::
```

## Registro de cambios

El registro está en `src/content/docs/anexos/cambios.md` y se ordena del más reciente al más antiguo. Cada fecha es un título de segundo nivel, con el formato `AAAA-MM-DD`, y cada cambio es una viñeta que empieza por su tipo:

```markdown
## 2026-10-15

- **Stack:** qué cambió y, si hace falta, qué variable hay que agregar o modificar en el `.env`.
- **Guía:** qué sección se agregó o se corrigió.
```

Se registra en **Stack** todo cambio del repositorio `portal-andino-v2` o de sus extensiones que afecte la instalación o el mantenimiento de un portal, y en **Guía** los cambios de contenido de esta documentación. Cuando un cambio del stack exige un paso manual al actualizar, conviene decirlo en la misma viñeta, porque es lo primero que busca quien actualiza un portal ya instalado.

## Scripts

Para sumar un script hay que guardarlo en `scripts/`, empezar el archivo con un bloque de comentarios que explique qué hace y cómo se usa, y agregar una sección en `src/content/docs/anexos/scripts.mdx` siguiendo el formato de las existentes. El enlace de descarga se genera solo a partir del archivo.

## Capturas de la guía de uso

Las capturas se guardan en `public/uso/capturas/`, en formato PNG y preferentemente tomadas sobre un portal con el perfil `apn`. Mientras falta una captura, en su lugar se deja un recuadro que describe qué tiene que mostrar:

```html
<figure class="captura pendiente">
Captura pendiente: formulario de alta de un dataset.
</figure>
```

Cuando la imagen está disponible, el recuadro se reemplaza por la captura con su texto alternativo:

```html
<figure class="captura">
<img src="/uso/capturas/alta-dataset.png" alt="Formulario de alta de un dataset con los campos obligatorios completos">
<figcaption>Primera etapa del alta de un dataset.</figcaption>
</figure>
```

## Diseño

La guía usa la paleta y la tipografía de Datos Abiertos sobre Starlight, en modo claro, y todos los valores están en `src/styles/datos.css`.

| Variable | Color | Uso |
|---|---|---|
| `--navy` | `#212D51` | Títulos y contenedores de datos |
| `--indigo` | `#393793` | Enlaces, botones y acento de Starlight |
| `--violeta` | `#B369ED` | Acentos puntuales, como el borde de las fichas del mapa |
| `--gris-mosaico` | `#ECECEC` | Tiles claros del mosaico |
| `--amarillo` | `#E7BA61` | Notas y avisos que conviene conocer |
| `--rojo` | `#C62828` | Notas y avisos graves |

- Se usa una sola tipografía, Montserrat, y la jerarquía se marca con el peso.
- Las esquinas son rectas, siguiendo el criterio de Poncho.
- El logo de Andino aparece en la portada, con el archivo original de `ckanext-gobar-theme`, y no se reemplaza por versiones redibujadas.
- El mosaico de glifos representa los contenedores del portal y solo se usa en Arquitectura, donde funciona como mapa interactivo.
- Si hace falta un color nuevo, se agrega como variable en `datos.css` y en esta tabla.

## Probar localmente

```bash
npm install
npm run dev
```

Antes de subir un cambio conviene ejecutar `npm run build` y confirmar que termina sin errores. El buscador solo funciona en el sitio construido, con `npm run build && npm run preview`.

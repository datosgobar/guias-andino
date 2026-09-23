---
title: Datasets y recursos
---

El dataset es la unidad principal del portal: reúne un conjunto de datos sobre un tema, describe quién lo produce y cada cuánto se actualiza, y contiene uno o más recursos, que son los archivos o enlaces concretos. Esta página explica cómo cargar un dataset completo, empezando por su descripción y siguiendo por sus recursos.

## Cargar un dataset

Con una cuenta que tenga permisos de edición en al menos una organización, la opción para agregar un dataset aparece en la sección de datasets. La carga tiene dos etapas: primero se completan los datos que describen al dataset y después se agregan sus recursos.

<figure class="captura pendiente">
Captura pendiente: primera etapa del formulario de alta de un dataset.
</figure>

Los campos obligatorios son los que exige el [Perfil Nacional de Metadatos](https://datosgobar.github.io/paquete-apertura-datos/perfil-metadatos/), y el formulario no deja avanzar si falta alguno:

| Campo | Qué se completa |
|---|---|
| Título del dataset | Un nombre que describa el contenido sin siglas sin desarrollar, por ejemplo "Presupuesto ejecutado por programa". |
| Organismo gestor | La organización del portal responsable del dataset. |
| Organismo publicador | El nombre del organismo que publica los datos. |
| Descripción del dataset | Qué contiene, cómo se elaboró y para qué puede servir. |
| Fecha de publicación | La fecha en que el dataset se publicó por primera vez. |
| Estado del dataset | Si el dataset sigue actualizándose o quedó discontinuado. |
| Tema general y tema específico | La clasificación temática, explicada en [Organizaciones y temas](/uso/organizaciones-y-temas/#temas). |
| Palabras clave | Términos que ayudan a encontrar el dataset en el buscador. |
| Categoría de alto valor | La categoría de datos de alto valor a la que corresponde, si corresponde a alguna. |
| Frecuencia de actualización | Cada cuánto se incorporan datos nuevos. |

Entre los campos optativos conviene completar al menos la licencia, la cobertura temporal y, cuando los datos se refieren a un territorio, la cobertura espacial, porque son los que más usa quien busca datos para reutilizarlos.

<details class="nota">
<summary>Cómo elegir buenas palabras clave</summary>

Las palabras clave funcionan mejor cuando reflejan cómo buscaría el dataset alguien que no conoce al organismo: palabras del lenguaje corriente, sin siglas ni nombres internos de programas, y escritas siempre de la misma manera en todos los datasets, de modo que el filtro por palabra clave agrupe efectivamente los datasets relacionados.

</details>

## Agregar recursos

Cada recurso puede ser un archivo que se sube al portal o un enlace a un archivo o servicio alojado en otro lugar. Además de la dirección o el archivo, conviene completar el nombre, una descripción y el formato, y en el caso de los archivos tabulares también el conjunto de caracteres, para que quien los descargue los abra sin problemas de acentos.

<figure class="captura pendiente">
Captura pendiente: formulario de alta de un recurso, con la opción de subir un archivo o indicar un enlace.
</figure>

Los campos de escala, proyección, metadatos ISO 19115 y geoservicio WFS solo corresponden a recursos geográficos, y se pueden dejar vacíos en cualquier otro caso.

<details class="nota grave">
<summary>Un dataset sin recursos no se puede harvestear</summary>

Si un dataset queda publicado sin ningún recurso con dirección, datos.gob.ar y los demás portales que harvestean el tuyo no lo incorporan, porque el perfil de metadatos no admite datasets vacíos.

</details>

## Diferencias con el Andino anterior

Algunas funciones que existían en la versión anterior todavía no tienen un equivalente confirmado en la versión 2, y quedan a validar antes de completar esta guía:

- la documentación de las columnas de cada recurso (título, tipo de dato y descripción de cada campo),
- la publicación de series de tiempo, que en la versión 2 se relaciona con la extensión `series_explorer`,
- la opción para destacar datasets en la página de inicio.

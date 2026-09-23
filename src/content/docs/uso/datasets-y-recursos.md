---
title: Datasets y recursos
---

El dataset es la unidad principal del portal: reúne un conjunto de datos sobre un tema, describe quién lo produce y cada cuánto se actualiza, y contiene uno o más recursos, que son los archivos o enlaces concretos. Esta página explica cómo cargar un dataset completo, empezando por su descripción y siguiendo por sus recursos, y qué conviene tener en cuenta para mantenerlo actualizado.

## Cargar un dataset

Con una cuenta que tenga permisos de edición en al menos un organismo, la opción para agregar un dataset aparece en la sección *Datasets*. La carga tiene dos etapas: primero se completan los metadatos que describen al dataset y después se agregan sus recursos.

<figure class="captura pendiente">
Captura pendiente: primera etapa del formulario de alta de un dataset.
</figure>

Los campos obligatorios, marcados con un asterisco, son los que exige el [Perfil de Aplicación Nacional de Metadatos](https://datosgobar.github.io/paquete-apertura-datos/perfil-metadatos/), y el formulario no deja avanzar si falta alguno:

| Campo | Qué se completa |
|---|---|
| Título del dataset | Un nombre que describa el contenido sin siglas sin desarrollar, por ejemplo "Presupuesto ejecutado por programa". |
| URL | La dirección del dataset dentro del portal. Se completa sola a partir del título y conviene no cambiarla una vez publicado, porque los enlaces que otras personas hayan guardado dejarían de funcionar. |
| Organismo gestor | El organismo del portal responsable del dataset. |
| Organismo publicador | El nombre del área que produce los datos. |
| Descripción del dataset | Qué contiene, cómo se elaboró y para qué puede servir. |
| Fecha de publicación | La fecha en que el dataset se publicó por primera vez. |
| Estado del dataset | *Actualizado*, *desactualizado* o *sin mantenimiento*. |
| Tema general y tema específico | La clasificación temática, explicada en [Organismos y temas](/uso/organizaciones-y-temas/#temas). |
| Palabras claves del dataset | Términos que ayudan a encontrar el dataset en el buscador. |
| Categoría de alto valor | La categoría de datos de alto valor que corresponda, o *no aplica*. |
| Frecuencia de actualización | Cada cuánto se incorporan datos nuevos, expresada con el código de la norma ISO 8601 que muestra la lista, como `R/P1M (mensualmente)` o `R/P1Y (anualmente)`. |

Entre los campos optativos conviene completar al menos la licencia, el contacto del organismo publicador, la cobertura temporal y, cuando los datos se refieren a un territorio, el identificador geográfico, porque son los que más usa quien busca datos para reutilizarlos.

<details class="nota">
<summary>Cómo elegir buenas palabras clave</summary>

Las palabras clave funcionan mejor cuando reflejan cómo buscaría el dataset alguien que no conoce al organismo: palabras del lenguaje corriente, sin siglas ni nombres internos de programas, y escritas siempre de la misma manera en todos los datasets, de modo que el filtro por palabra clave agrupe efectivamente los datasets relacionados.

</details>

## Agregar recursos

Cada recurso puede ser un archivo que se sube al portal o un enlace a un archivo o servicio alojado en otro lugar. Para agregar uno a un dataset ya creado hay que entrar al dataset y elegir *Agregar recurso*.

<figure class="captura pendiente">
Captura pendiente: formulario de alta de un recurso, con la opción de subir un archivo o indicar un enlace.
</figure>

Además del archivo o la URL, conviene completar estos campos, que mejoran la calidad de los datos para su reutilización:

| Campo | Qué se completa |
|---|---|
| Nombre y descripción | Qué contiene el archivo y en qué se diferencia de los otros recursos del dataset, por ejemplo el año o la región. |
| Formato | El formato del archivo, como CSV, XLSX o JSON. |
| Tipo de medio (IANA) | El tipo técnico del archivo, que se elige de una lista, como `text/csv`. |
| Categoría de distribución | Si el recurso es un conjunto de datos, un documento, una imagen u otro tipo de contenido. |
| Conjunto de caracteres | La codificación del texto. La opción recomendada es UTF-8, que evita problemas con acentos y eñes al abrir el archivo. |

Los campos de escala, proyección, metadatos ISO 19115 y geoservicio WFS solo corresponden a recursos geográficos, y se pueden dejar vacíos en cualquier otro caso.

<details class="nota grave">
<summary>Un dataset sin recursos no se puede harvestear</summary>

Si un dataset queda publicado sin ningún recurso con dirección, datos.gob.ar y los demás portales que harvestean el tuyo no lo incorporan, porque el perfil de metadatos no admite datasets vacíos.

</details>

## Cómo se ve un recurso publicado

En la página del dataset, cada recurso aparece en la lista *Datos y recursos* con el botón *Explorar*, que ofrece la previsualización, la descarga y el enlace a la página del recurso. En esa página se muestran la vista previa de los datos, que puede ser una tabla, un mapa o una imagen según el formato, las opciones para descargar los datos en CSV, TSV, JSON o XML y la dirección de la API de datos.

<figure class="captura pendiente">
Captura pendiente: página de un recurso, con la vista en tabla, el botón <em>Descargar</em> y el diccionario de datos.
</figure>

La vista en tabla, la descarga en varios formatos y la API de datos solo aparecen cuando el contenido del archivo se cargó en el DataStore, la base de datos del portal que guarda las tablas para consultarlas.

<details class="nota">
<summary>Si la vista previa no aparece</summary>

En el Andino anterior se podía forzar la carga desde *Editar recurso*, con la opción *Subir a DataStore*. En la versión 2 esa carga depende de que el portal tenga activado un servicio que la haga automáticamente, algo que no viene configurado en la instalación estándar. Si las vistas previas de las tablas no aparecen, hay que consultarlo con el equipo técnico.

</details>

## Diccionario de datos

El diccionario de datos documenta cada columna de un recurso tabular: su nombre, el tipo de dato y una descripción de lo que contiene. Reemplaza a la *Documentación de los campos del recurso* del Andino anterior y aparece en la página del recurso, debajo de la vista previa. Para completarlo hay que entrar en *Editar recurso* y abrir la pestaña *Diccionario de datos*, que solo está disponible cuando el recurso está cargado en el DataStore.

<figure class="captura pendiente">
Captura pendiente: pestaña <em>Diccionario de datos</em> al editar un recurso.
</figure>

## Series de tiempo

Una serie de tiempo es un recurso en el que cada fila corresponde a un momento y cada columna a un indicador, como la recaudación mensual o la población anual. Para que puedan procesarse sin ajustes, el archivo tiene que cumplir algunas reglas:

- estar en formato CSV, separado por comas;
- tener como primera columna `indice_tiempo`, con las fechas en formato `AAAA-MM-DD`, ordenadas de la más antigua a la más reciente, y usando siempre el primer día de cada período (por ejemplo, `2024-01-01` para el año 2024 o `2024-04-01` para el segundo trimestre);
- tener un encabezado por columna, que se mantenga igual en todas las actualizaciones.

La guía completa para publicadores está en la [documentación de la API de Series de Tiempo](https://datosgobar.github.io/series-tiempo-ar-api/publishers/quick_start/).

:::caution[A validar]
En el Andino anterior cada serie se documentaba en el propio portal, con una unidad y un identificador por columna, para que la API de Series de Tiempo la incorporara. La sección *Series* de la versión 2 consulta directamente la API nacional y no toma datos del portal, por lo que queda por definir cómo se solicita la incorporación de una serie nueva.
:::

## Buenas prácticas

La apertura de datos funciona mejor como un proceso gradual: conviene empezar por pocos datasets bien documentados y sumar otros a medida que el organismo se acostumbra a mantenerlos. Algunas recomendaciones que facilitan la reutilización:

- publicar los datos tabulares en CSV, que se abre con cualquier programa. Un archivo XLSX se puede convertir, por ejemplo, abriéndolo en una hoja de cálculo y descargándolo como valores separados por comas;
- escribir las fechas en formato `AAAA-MM-DD`;
- usar la codificación UTF-8;
- completar el diccionario de datos de cada recurso tabular.

Las guías del [Paquete de Apertura de Datos](https://datosgobar.github.io/paquete-apertura-datos/) desarrollan estos criterios en detalle, incluidas la publicación en formatos abiertos, el uso de metadatos y la identificación de entidades interoperables.

## Mantener los datasets

Cada dataset tiene una pestaña *Flujo de actividad* que muestra, en orden cronológico, los cambios realizados y la cuenta que hizo cada uno. Reemplaza al *Historial* del Andino anterior y es el primer lugar donde mirar cuando un dato aparece modificado sin que nadie lo recuerde.

<details class="nota grave">
<summary>Antes de borrar un dataset o un recurso</summary>

Si el portal está integrado a datos.gob.ar, borrar un dataset o un recurso afecta también lo que se publica en el portal nacional. Antes de hacerlo conviene avisar al equipo de la Dirección de Datos Abiertos, sobre todo si otras personas usan esos datos.

</details>

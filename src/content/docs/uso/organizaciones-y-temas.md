---
title: Organismos y temas
---

Cada dataset del portal pertenece a un organismo y se clasifica por tema. Los organismos indican quién es responsable de los datos, mientras que los temas permiten encontrarlos por asunto, tanto en el propio portal como en datos.gob.ar cuando lo harvestea.

## Organismos

Un organismo representa al área que gestiona un conjunto de datasets, como una secretaría, una dirección o un ente descentralizado. En CKAN se llaman organizaciones, pero el portal los muestra como *Organismos*, tanto en el menú principal como en el filtro del buscador de datasets.

Solo quien administra el portal puede crear organismos. Para hacerlo hay que ir a la sección *Organismos*, elegir la opción para agregar uno nuevo y completar su nombre, una descripción breve y, si se quiere, una imagen o logo.

<figure class="captura pendiente">
Captura pendiente: formulario de alta de un organismo.
</figure>

Un organismo puede depender de otro, por ejemplo una dirección dentro de una secretaría. La dependencia se elige en el mismo formulario de alta o de edición, y a partir de ahí el portal muestra la cadena completa en la ruta de navegación de cada dataset, desde el organismo de mayor jerarquía hasta el que gestiona los datos.

## Temas

El perfil de metadatos clasifica cada dataset en dos niveles, y los dos son obligatorios al cargarlo:

| Campo | Qué es |
|---|---|
| Tema general del dataset | Una lista fija de catorce categorías, basada en la taxonomía de la Unión Europea y común a todos los portales, como *Economía y finanzas*, *Salud* o *Transporte*. Permite que datos.gob.ar agrupe los datasets de todo el país con el mismo criterio. Un dataset puede tener más de uno. |
| Tema específico del dataset | Una clasificación más detallada, como *Género y diversidad sexual* o *Pobreza y desigualdad*, que en la versión 2 también es una lista fija del perfil de metadatos. Si ninguna opción corresponde, se elige *Sin tema específico*. |

En el Andino anterior cada organismo creaba sus propios temas específicos. En la versión 2 ya no hace falta, porque la lista viene definida, y eso evita que se repitan temas parecidos con nombres distintos.

### La sección Temas del portal

La sección *Temas* del menú principal y el filtro *Temas* del buscador muestran los temas del portal, que son grupos de CKAN independientes de los campos anteriores. Quien administra el portal los crea desde la sección *Temas*, y para asignar un dataset a un tema hay que abrir el dataset, entrar en su pestaña *Temas* y elegirlo de la lista.

<figure class="captura pendiente">
Captura pendiente: pestaña <em>Temas</em> de un dataset, con el selector para agregarlo a un tema.
</figure>

<details class="nota">
<summary>Conviene que los temas del portal coincidan con los temas generales</summary>

Los datasets que llegan por harvesting se asignan automáticamente al tema del portal que corresponde a su tema general, siempre que exista un tema con la dirección esperada. Por eso conviene crear los catorce temas con estas direcciones: `agroganaderia-pesca-y-forestacion`, `asuntos-internacionales`, `ciencia-y-tecnologia`, `defensa`, `economia`, `educacion-cultura-y-deportes`, `energia`, `gobierno-y-sector-publico`, `justicia-y-seguridad`, `medio-ambiente`, `poblacion-y-sociedad`, `salud`, `territorio` y `transporte`. Al cargar un dataset a mano, la asignación no es automática, así que hay que agregarlo al tema que coincida con el tema general elegido.

</details>

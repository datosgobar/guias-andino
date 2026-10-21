---
title: Desarrolladores
description: Cómo consultar el catálogo de un portal Andino de forma programática.
---

Todo lo que se publica en un portal Andino se puede consultar también desde un programa, una planilla de cálculo o cualquier herramienta que lea direcciones web. Los datasets públicos no piden cuenta ni clave: basta con armar la dirección de la consulta. Esta página resume las consultas más útiles; la referencia completa está en la documentación de CKAN, el sistema sobre el que funciona el portal.

En los ejemplos, `https://datos.miorganismo.gob.ar` es la dirección del portal.

## La API de CKAN

Las consultas se arman con la dirección del portal, seguida de `/api/3/action/` y el nombre de la consulta. Por ejemplo, para buscar datasets:

```
https://datos.miorganismo.gob.ar/api/3/action/package_search?q=presupuesto
```

La respuesta llega en formato JSON. El campo `success` indica si la consulta funcionó y `result` trae el contenido pedido.

```json
{
  "success": true,
  "result": {
    "count": 12,
    "results": [ { "name": "presupuesto-2026", "title": "Presupuesto 2026", "resources": [ … ] } ]
  }
}
```

Estas son las consultas más usadas:

| Consulta | Qué devuelve |
|---|---|
| `package_search` | Los datasets que coinciden con una búsqueda, con todos sus metadatos y recursos. |
| `package_show?id=<nombre>` | Un dataset, identificado por el nombre que aparece en su dirección. |
| `resource_show?id=<id>` | Un recurso, con la dirección para descargar el archivo en el campo `url`. |
| `package_list` | Los nombres de todos los datasets del portal. |
| `organization_list` y `organization_show?id=<nombre>` | Los organismos y el detalle de cada uno. |
| `group_list` y `group_show?id=<nombre>` | Los temas y el detalle de cada uno. |
| `tag_list` | Las etiquetas que se usan en el portal. |

## Buscar datasets

`package_search` acepta los mismos criterios que el buscador del portal:

- `q` busca por palabras en el título, la descripción y las etiquetas, por ejemplo `q=presupuesto`.
- `fq` filtra por organismo (`organization:`), tema (`groups:`), formato de los recursos (`res_format:`) o etiqueta (`tags:`), por ejemplo `fq=organization:ministerio-de-salud`. Para combinar filtros se usa `AND`.
- `rows` y `start` indican cuántos resultados traer y desde cuál, para recorrer el catálogo por partes, por ejemplo `rows=100&start=200`. Cada consulta trae hasta 1000.
- `sort` ordena los resultados; `sort=metadata_modified desc` trae primero los actualizados más recientemente.
- `ext_bbox` trae los datasets que cubren una zona, indicada como oeste, sur, este y norte, por ejemplo `ext_bbox=-58.53,-34.71,-58.33,-34.53`.

Por ejemplo, los diez datasets en CSV de un organismo actualizados más recientemente:

```
https://datos.miorganismo.gob.ar/api/3/action/package_search?fq=organization:ministerio-de-salud AND res_format:CSV&sort=metadata_modified desc&rows=10
```

## El catálogo en DCAT

El portal también publica sus metadatos según DCAT, el estándar que usan los catálogos de datos abiertos para intercambiar información. Es la forma más directa de leer el catálogo con herramientas de datos enlazados o de sumarlo a otro catálogo.

| Dirección | Qué devuelve |
|---|---|
| `/catalog.jsonld`, `/catalog.ttl`, `/catalog.xml` | El catálogo completo, en JSON-LD, Turtle o RDF/XML. Se recorre por páginas con `?page=2`, `?page=3` y así sucesivamente. |
| `/dataset/<nombre>.jsonld`, `.ttl` o `.rdf` | Los metadatos de un dataset. |

## Más información

- [Documentación de la API de CKAN 2.11](https://docs.ckan.org/en/2.11/api/), con todas las consultas y sus parámetros.
- [Documentación de ckanext-dcat](https://docs.ckan.org/projects/ckanext-dcat/en/latest/), la extensión que publica el catálogo en DCAT.

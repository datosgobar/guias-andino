---
title: Conceptos
---

Esta sección reúne los términos que se usan a lo largo de la guía y está pensada para quien no trabajó antes con CKAN. Si ya tenés experiencia con esa plataforma, la parte que más conviene revisar es [Configuración por variables](#configuración-por-variables), porque es donde Andino se aparta de una instalación tradicional.

## CKAN

[CKAN](https://ckan.org/) es el software libre sobre el que está construido Andino y el que usan portales de datos abiertos de muchos países. Andino no modifica su código: todo lo que es específico del Estado argentino se agrega mediante **extensiones** que se instalan sobre CKAN, lo que permite actualizarlo sin perder esas adaptaciones.

## Qué se publica en el portal

- Un **dataset** es un conjunto de datos sobre un tema determinado, acompañado de su descripción, el área responsable, la frecuencia con que se actualiza y la licencia bajo la que se ofrece; por ejemplo, "Presupuesto ejecutado 2025".
- Cada dataset contiene uno o más **recursos**, también llamados distribuciones, que son los archivos o enlaces concretos. Un mismo dataset puede incluir un CSV por año, un PDF con la metodología y un enlace a una API.
- La **organización** es el área que publica los datasets y responde por ellos. El nombre con que se muestran las organizaciones en el portal se puede configurar; en datos.gob.ar, por ejemplo, aparecen como "Organismos".
- Los **grupos** son categorías temáticas transversales, como "Economía" o "Salud", y un mismo dataset puede pertenecer a varios.
- Los **metadatos** son la información que describe a cada dataset y a cada recurso. Andino utiliza el [Perfil de Aplicación Nacional de Metadatos para Datos Abiertos](https://datosgobar.github.io/paquete-apertura-datos/perfil-metadatos/), conocido como Perfil Nacional de Metadatos, que define qué campos existen y cuáles son obligatorios. En el código, ese perfil está implementado en el archivo `ckan_dataset_datgobar.yaml` de la extensión `ckanext-scheming-gobar`.

## Extensiones y plugins

Una **extensión** es un paquete de Python que agrega funciones a CKAN. Cada extensión puede incluir uno o varios **plugins**, que se activan escribiendo su nombre en la variable `CKAN__PLUGINS`. La extensión `ckanext-gobar-harvest`, por ejemplo, incluye los plugins `harvest`, `ckan_harvester`, `gobar_ckan_harvester` y `xlsx_harvester`. La función de cada uno se describe en [Arquitectura](/instalacion/arquitectura/#plugins-habilitados).

## Configuración por variables

Toda la configuración del portal se define en un único archivo, `.env`. No se edita a mano el archivo `ckan.ini` ni se modifican archivos dentro de los contenedores, lo que garantiza que la instalación se pueda reproducir en otro servidor copiando solamente ese archivo.

El plugin `ckanext-envvars` es el que traduce las variables del `.env` a opciones de CKAN cada vez que el portal arranca, siguiendo una regla fija según la cual cada par de guiones bajos se convierte en un punto.

| Variable en `.env` | Opción en CKAN |
|---|---|
| `CKAN__SITE_TITLE` | `ckan.site_title` |
| `CKAN___SCHEMING__PRESETS` | `scheming.presets` |
| `CKANEXT__GOBAR_THEME__PROFILE` | `ckanext.gobar_theme.profile` |

Cuando la opción de CKAN no empieza con `ckan.`, como en el segundo ejemplo, el prefijo se escribe con tres guiones bajos (`CKAN___`), de modo que el primero se descarta al traducirla.

:::danger[El plugin envvars tiene que ir último]
En `CKAN__PLUGINS`, `envvars` tiene que ser el último de la lista. Si aparece antes que otro plugin, ese plugin lee su configuración antes de que se apliquen las variables del `.env` y arranca con valores equivocados.
:::

## Búsqueda

El buscador del portal no consulta directamente la base de datos, sino un índice de **Solr** en el que CKAN copia cada dataset cuando se crea o se modifica. Si el índice y la base quedan desincronizados, puede ocurrir que un dataset exista y se abra desde su dirección pero no aparezca en las búsquedas; en ese caso hay que [reconstruir el índice](/anexos/operacion/#reindexar-la-búsqueda).

## Datastore

Además de guardar los archivos tal como se suben, CKAN puede cargar el contenido de los archivos tabulares en una base de datos aparte, llamada **datastore**. Eso permite previsualizar las tablas en el navegador y consultarlas mediante la API. La carga la realiza un servicio independiente, que se describe en [Arquitectura](/instalacion/arquitectura/#contenedor-por-contenedor).

## Harvesting

Un portal puede incorporar en forma automática los datasets que publican otros portales, un proceso que en CKAN se llama *harvesting*; como verbo se usa harvestear. Al configurarlo aparecen con frecuencia estos términos:

- Una **fuente** es un catálogo externo que el portal harvestea, definido por su dirección, su tipo (por ejemplo `xlsx_harvester`) y una configuración opcional.
- Un **job** es cada ejecución del harvesting sobre una fuente.
- Cada job pasa por tres etapas, **gather**, **fetch** e **import**, en las que se obtiene la lista de datasets de la fuente, se descarga cada uno y se guarda en el portal.

El funcionamiento completo se explica en [Harvester](/anexos/harvester/).

## Perfil visual

La apariencia del portal se elige con la variable `CKANEXT__GOBAR_THEME__PROFILE`. Los organismos de la Administración Pública Nacional usan el perfil `apn`, basado en Poncho; el perfil `nacional` queda reservado para datos.gob.ar, y `subnacional` está previsto para provincias y municipios, aunque su diseño todavía no está definido. Los colores, los logos y los textos de la página de inicio también se ajustan mediante variables, sin necesidad de modificar plantillas.

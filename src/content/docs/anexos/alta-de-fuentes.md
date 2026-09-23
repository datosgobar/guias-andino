---
title: Alta de fuentes
---

Una fuente de harvesting se puede crear desde la web, en `/harvest/new` y con una cuenta de administración, o mediante la API. Para dar de alta una fuente aislada alcanza con la web, mientras que para cargar muchas fuentes, o para dejar registro de cómo se configuraron, resulta más práctico usar la API con el script [crear-fuente-harvest.sh](/anexos/scripts/#crear-fuente-harvestsh).

## Campos de una fuente

| Campo | Ejemplo | Observaciones |
|---|---|---|
| `name` | `ministerio-salud` | Es el identificador que aparece en la dirección y solo admite minúsculas, números y guiones. |
| `title` | `Ministerio de Salud` | Es el nombre que se muestra en el portal. |
| `url` | `https://datos.salud.gob.ar/catalog.xlsx` | No puede repetirse entre las fuentes activas. |
| `source_type` | `xlsx_harvester` | Los valores posibles se explican en [Tipos de fuente](/anexos/harvester/#tipos-de-fuente). |
| `owner_org` | `salud` | Es la organización del portal a la que se asignan los datasets harvesteados. |
| `frequency` | `DAILY` | Admite `MANUAL`, `ALWAYS`, `DAILY`, `WEEKLY`, `BIWEEKLY` y `MONTHLY`. |
| `config` | `{"skip_rows": 0}` | Es un JSON escrito como texto, cuyas opciones dependen del tipo de fuente. |

## Opciones de `xlsx_harvester`

Todas las opciones son optativas; si no se indican, se aplica el valor por defecto de la tabla.

| Opción | Tipo | Valor por defecto | Para qué sirve |
|---|---|---|---|
| `dataset_sheet` | texto | `dataset`, en mayúsculas o minúsculas y en singular o plural | Indica el nombre de la hoja que contiene los datasets. |
| `distribution_sheet` | texto | `distribution`, con las mismas variantes | Indica el nombre de la hoja que contiene los recursos. |
| `skip_rows` | número entero | `0` | Indica cuántas filas hay que saltear antes de los encabezados. |
| `default_owner_org` | texto | vacío | Define la organización que se asigna cuando una fila no indica ninguna. |
| `default_tags` | lista | vacía | Agrega etiquetas a todos los datasets, aunque hoy no funciona (ver la nota). |
| `user_agent` | texto | `ckanext-harvest-xlsx/1.0` | Define cómo se identifica la descarga ante el servidor de la fuente, algo útil cuando ese servidor bloquea el valor por defecto. |

Un ejemplo de configuración:

```json
{
  "skip_rows": 0,
  "default_owner_org": "salud",
  "user_agent": "portal-provincial/1.0"
}
```

<details class="nota grave">
<summary>La opción <code>default_tags</code> no se puede usar por ahora</summary>

La validación de la configuración exige una lista de objetos, como `[{"name": "salud"}]`, mientras que la etapa de import la interpreta como una lista de textos, como `["salud"]`. Con cualquiera de los dos formatos el harvesting falla en alguna de esas etapas, por lo que conviene no incluir esta opción hasta que se corrija en `ckanext-gobar-harvest`.

</details>

<details class="nota">
<summary>Algunas opciones se aceptan pero no tienen efecto</summary>

`default_extras`, `override_extras`, `force_all` y `read_only` pasan la validación de `xlsx_harvester` porque provienen del harvester de CKAN, donde sí funcionan, pero el código de este harvester no las utiliza.

</details>

<details class="nota">
<summary>Los datasets sin recursos no se incorporan</summary>

Si una fila del archivo XLSX describe un dataset que no tiene ningún recurso con dirección, la importación de ese dataset falla. Es un comportamiento intencional, ya que el Perfil Nacional de Metadatos no admite datasets vacíos.

</details>

## Opciones de `gobar_ckan` y `ckan`

Estos dos tipos de fuente comparten las opciones del harvester de CKAN, entre las que las más utilizadas son las siguientes.

| Opción | Para qué sirve |
|---|---|
| `organizations_filter_include` | Limita el harvesting a las organizaciones del portal remoto que se indican en la lista. |
| `organizations_filter_exclude` | Excluye del harvesting las organizaciones remotas que se indican. |
| `default_groups` | Agrega todos los datasets harvesteados a los grupos indicados del portal propio. |
| `remote_orgs` | Con el valor `create`, crea en el portal propio las organizaciones remotas que todavía no existen. |
| `api_key` | Permite indicar una clave de acceso cuando el portal remoto exige autenticación. |
| `force_all` | Con el valor `true`, trae todos los datasets en cada harvesting y no solo los modificados. |

La referencia completa está en la [documentación de ckanext-harvest](https://github.com/ckan/ckanext-harvest#the-ckan-harvester). Un ejemplo que harvestea una sola organización y asigna sus datasets a un grupo:

```json
{
  "organizations_filter_include": ["modernizacion"],
  "default_groups": ["gobierno"]
}
```

<details class="nota">
<summary>Cómo cuenta <code>gobar_ckan</code> los datasets que no cambiaron</summary>

El harvester de CKAN solo solicita los datasets modificados desde el último harvesting exitoso, por lo que el resumen de cada harvesting muestra siempre cero datasets sin cambios. `gobar_ckan` también contabiliza esos datasets, de modo que el resumen refleja la cantidad real.

</details>

## Reutilizar la dirección de una fuente eliminada

Cuando se elimina una fuente desde la web, CKAN la marca como borrada pero la conserva, y su dirección sigue reservada. Para volver a usarla en una fuente nueva hay que eliminar la anterior en forma definitiva:

```bash
docker compose exec ckan ckan dataset purge <nombre-de-la-fuente>
```

## Lanzar un harvesting manualmente

Sin esperar a la frecuencia configurada, se puede crear un job de harvesting para una fuente con este comando:

```bash
docker compose exec ckan ckan harvester job <nombre-de-la-fuente>
```

El trabajo se procesa en la siguiente revisión del cron, dentro de los cinco minutos, y su resultado se puede consultar en la página `/harvest/<nombre-de-la-fuente>` del portal.

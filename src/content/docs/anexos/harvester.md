---
title: Harvester
---

El harvesting puede darse en dos sentidos que conviene distinguir desde el principio. En el primero, tu portal incorpora los datasets que publican otros, como hace un portal provincial que reúne la información de sus ministerios o de sus municipios; para eso hace falta el harvester, y es lo que se explica en la mayor parte de esta página. En el segundo, es otro portal el que incorpora los datos del tuyo, como ocurre cuando datos.gob.ar suma la información de un organismo; en ese caso no hay que activar nada, aunque sí cumplir algunas condiciones que se detallan en [Si datos.gob.ar va a harvestear tu portal](#si-datosgobar-va-a-harvestear-tu-portal).

Un organismo que solo publica sus propios datos puede [desactivar el harvester](#desactivarlo).

## Cómo funciona

Cada job de harvesting atraviesa estas etapas, en este orden:

1. Cada cinco minutos, **cron** ejecuta `harvester run`, que revisa si hay jobs de harvesting pendientes.
2. **CKAN** coloca en la cola de Redis los trabajos que están en estado *New*.
3. El proceso **gather** le pide a la fuente la lista de sus datasets y encola cada uno por separado.
4. El proceso **fetch** descarga cada dataset desde la fuente.
5. En la etapa de **import**, el dataset se adapta al Perfil Nacional de Metadatos y se crea o se actualiza en el portal.

Todas estas tareas se ejecutan en el contenedor `ckan-worker`, separado de la aplicación web. Allí, cron lanza cada cinco minutos el comando definido en `ckan/cron_ckan`, que no harvestea por sí mismo sino que encola los trabajos pendientes y cierra los que ya terminaron, mientras que supervisord mantiene en funcionamiento los dos procesos que hacen el trabajo, `ckan_gather_consumer` y `ckan_fetch_consumer`. Si ese contenedor no está activo, los jobs de harvesting quedan indefinidamente en estado Running.

## Tipos de fuente

El tipo de fuente determina cómo se lee el catálogo externo y se indica en el campo `source_type` al darla de alta.

| `source_type` | Qué harvestea | Plugin |
|---|---|---|
| `xlsx_harvester` | Un archivo `catalog.xlsx` con el formato de datos.gob.ar, con las hojas `dataset` y `distribution` | `xlsx_harvester` |
| `gobar_ckan` | Portales Andino de la primera versión, basados en CKAN 2.6, a cuyos datasets aplica las adaptaciones del Perfil Nacional de Metadatos | `gobar_ckan_harvester` |
| `ckan` | Cualquier portal CKAN, sin adaptaciones propias | `ckan_harvester` |

<details class="nota">
<summary>El nombre del plugin y el tipo de fuente no coinciden</summary>

El plugin se activa con el nombre `gobar_ckan_harvester`, pero el harvester se registra internamente como `gobar_ckan`, que es el valor que hay que usar en `source_type` al crear una fuente por API. Queda a validar la documentación del repositorio del stack, que menciona `gobar_ckan_harvester` como tipo de fuente.

</details>

## Configuración en el `.env`

El harvesting necesita que los plugins correspondientes estén en `CKAN__PLUGINS` y que la cola de trabajos apunte al Redis del stack:

```dotenv
CKAN__PLUGINS="... harvest gobar_ckan_harvester ckan_harvester xlsx_harvester ... envvars"

CKAN__HARVEST__MQ__TYPE=redis
CKAN__HARVEST__MQ__HOSTNAME=redis
CKAN__HARVEST__MQ__PORT=6379
CKAN__HARVEST__MQ__REDIS_DB=1
```

Al arrancar, el script `03_setup_harvester.sh` crea las tablas que usa el harvesting, siempre que `ckan_harvester` figure en la lista de plugins.

<details class="nota">
<summary>Por qué se usa Redis y no RabbitMQ</summary>

`ckanext-harvest` admite ambos sistemas de colas, pero sus desarrolladores recomiendan Redis y el stack ya lo incluye para otras funciones. Incorporar RabbitMQ implicaría mantener un contenedor más sin ninguna ventaja para el volumen de harvesting habitual de un portal Andino.

</details>

<details class="nota grave">
<summary>Dos portales que comparten un Redis necesitan identificadores distintos</summary>

Las claves de la cola se separan según `ckan.site_id`. Si dos portales usan el mismo Redis con el mismo `CKAN_SITE_ID`, cada uno toma trabajos del otro y los jobs de harvesting fallan de manera difícil de diagnosticar. En la instalación por defecto esto no ocurre, porque cada portal tiene su propio Redis.

</details>

## Verificar que el harvesting funciona

El primer control es comprobar que los dos procesos de harvesting estén en marcha; ambos tienen que figurar como `RUNNING`:

```bash
docker compose exec ckan-worker supervisorctl status
```

También se puede listar las fuentes configuradas y revisar el registro del proceso periódico:

```bash
docker compose exec ckan ckan harvester sources
docker compose exec ckan-worker tail -n 50 /var/log/ckan_harvester.log
```

Los registros detallados de cada proceso están en la carpeta `/var/log/supervisor/` del mismo contenedor.

## Frecuencia del harvesting

La frecuencia con que se harvestea cada fuente se define en la propia fuente, mediante el campo `frequency`, que admite los valores `MANUAL`, `ALWAYS`, `DAILY`, `WEEKLY`, `BIWEEKLY` y `MONTHLY`. Los cinco minutos del cron solo determinan cada cuánto se revisa si hay trabajos pendientes, de modo que reducir ese intervalo no hace que las fuentes se harvesteen más seguido.

## Desactivarlo

Para desactivar el harvesting hay que quitar `harvest`, `gobar_ckan_harvester`, `ckan_harvester` y `xlsx_harvester` de `CKAN__PLUGINS` y recrear los contenedores con `docker compose up -d`. Como el contenedor `ckan-worker` deja de tener trabajo, también se puede detener con `docker compose stop ckan-worker`. Las tablas del harvesting permanecen en la base de datos, pero no tienen ningún efecto.

## Si datos.gob.ar va a harvestear tu portal

En este caso no hace falta activar ningún plugin en tu portal, porque datos.gob.ar lee el catálogo a través de la API pública de CKAN. Para que el harvesting funcione, el portal tiene que estar accesible desde internet con HTTPS y un certificado válido, sus datasets tienen que estar completos según el Perfil Nacional de Metadatos, dado que los que no tienen recursos o les faltan campos obligatorios no se incorporan, y el esquema de metadatos tiene que mantenerse sin modificaciones.

:::caution[A validar]
Todavía falta documentar el procedimiento para solicitar la incorporación a datos.gob.ar, es decir, con qué área se coordina y qué información hay que enviar.
:::

El alta de fuentes en tu propio portal se explica en [Alta de fuentes](/anexos/alta-de-fuentes/).

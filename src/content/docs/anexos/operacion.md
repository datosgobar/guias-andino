---
title: Operación
---

Una vez publicado, el portal necesita algunas tareas periódicas de mantenimiento: revisar los registros cuando algo no funciona, aplicar cambios de configuración, actualizar las extensiones y resguardar la información. Todos los comandos de esta página se ejecutan desde la carpeta del repositorio en el servidor.

## Consultar los registros

Cada contenedor guarda su propio registro, y lo habitual es empezar por el de la aplicación web cuando el portal muestra un error, o por el de `ckan-worker` cuando el problema está en el harvesting:

```bash
docker compose logs -f ckan            # aplicación web
docker compose logs -f ckan-worker     # harvesting y tareas programadas
docker compose logs --since 1h nginx   # accesos de la última hora
```

## Aplicar un cambio en el `.env`

Después de modificar el archivo de configuración hay que recrear los contenedores con este comando:

```bash
docker compose up -d
```

<details class="nota grave">
<summary><code>docker compose restart</code> no aplica los cambios del <code>.env</code></summary>

Ese comando reinicia los contenedores conservando las variables con las que fueron creados, de modo que el portal sigue funcionando con la configuración anterior aunque el archivo ya esté modificado. Para confirmar qué valor está usando un contenedor se puede ejecutar, por ejemplo, `docker compose exec ckan printenv CKAN_SITE_URL`.

</details>

## Actualizar las extensiones

Las extensiones se descargan de GitHub cada vez que se construye la imagen, por lo que para obtener sus últimas versiones hay que actualizar el repositorio y reconstruir sin usar la caché:

```bash
git pull
docker compose build --no-cache ckan ckan-worker
docker compose up -d
```

<details class="nota">
<summary>Algunas extensiones tienen versión fija y otras no</summary>

`ckanext-spatial` y `ckanext-dcat` están fijadas en las versiones 2.3.1 y 2.4.2, mientras que las extensiones de Datos Argentina se instalan desde su rama principal, de modo que cada reconstrucción incorpora sus últimos cambios. Queda a validar la conveniencia de fijarlas también a una versión, para que dos construcciones hechas en fechas distintas den exactamente el mismo resultado.

</details>

## Reindexar la búsqueda

Cuando un dataset existe y se abre desde su dirección pero no aparece en el buscador, el índice de Solr quedó desactualizado y hay que reconstruirlo:

```bash
docker compose exec ckan ckan search-index rebuild
```

En portales con muchos datasets el proceso puede demorar. Si se agrega la opción `-o`, solo se indexan los datasets que faltan en el índice, lo que resulta bastante más rápido.

## Copias de seguridad

La información del portal está repartida en tres lugares, y cada uno se resguarda de una manera distinta:

| Qué | Dónde está | Cómo se resguarda |
|---|---|---|
| Base de CKAN y datastore | Volumen `pg_data` | Con el script [backup-db.sh](/anexos/scripts/#backup-dbsh) |
| Archivos subidos al portal | Volumen `ckan_storage` | Con una copia del volumen, como se muestra abajo |
| Configuración | Archivo `.env` | Guardando una copia fuera del servidor, en un lugar seguro, porque contiene claves |

El índice de Solr no necesita copia, porque se puede reconstruir en cualquier momento a partir de la base de datos. Para copiar el volumen de archivos se puede usar este comando:

```bash
docker run --rm -v portal-andino-v2_ckan_storage:/datos -v "$PWD/backups":/destino \
  alpine tar czf /destino/ckan_storage-$(date +%Y%m%d).tar.gz -C /datos .
```

:::caution[A validar]
Todavía falta probar y documentar la restauración completa de una copia en un servidor nuevo.
:::

## Borrar la instalación

Este comando elimina los contenedores junto con todos sus volúmenes, es decir, la base de datos, los archivos subidos y el índice de búsqueda:

```bash
docker compose down -v --remove-orphans
```

:::danger[La operación no se puede deshacer]
Antes de ejecutarla en un portal publicado hay que tener una copia de seguridad reciente de la base y de los archivos.
:::

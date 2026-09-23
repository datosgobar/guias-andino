---
title: Problemas conocidos
---

Esta página recoge los problemas que ya aparecieron en instalaciones anteriores, con la forma en que se manifiestan, su causa y la manera de resolverlos. Si encontrás uno que no figura acá, sumalo con la misma estructura para que le sirva a la próxima persona.

## El mapa, los filtros y los autocompletados no funcionan

La página carga con normalidad, pero ningún componente interactivo responde y tampoco se muestra un mensaje de error. Si se abre la consola del navegador, aparece un error `ERR_NAME_NOT_RESOLVED` en el pedido a `/api/i18n/es_AR`.

Ocurre porque la variable `CKAN_SITE_URL` apunta a una dirección que el navegador no puede resolver. El código JavaScript de CKAN descarga las traducciones antes de iniciar cualquier componente, y si esa descarga falla no se inicia ninguno.

Para resolverlo hay que escribir en `CKAN_SITE_URL` la dirección real con la que se accede al portal y ejecutar `docker compose up -d`.

## Un cambio en el `.env` no se refleja en el portal

Casi siempre se debe a que los contenedores se reiniciaron con `docker compose restart`, que conserva las variables anteriores. Hay que ejecutar `docker compose up -d` para que se recreen con la configuración nueva, y se puede confirmar el valor en uso con `docker compose exec ckan printenv` seguido del nombre de la variable.

## CKAN no encuentra una extensión recién agregada en la instalación de prueba

En el entorno de desarrollo aparece un error `PluginNotFoundException` después de agregar una extensión al Dockerfile y reconstruir la imagen. Sucede porque en ese entorno las carpetas de paquetes de Python y de la aplicación son volúmenes, y Docker solo copia en ellos el contenido de la imagen cuando están vacíos, de modo que el contenedor sigue usando los paquetes anteriores.

La solución es eliminar esos volúmenes y volver a levantar el entorno con `bin/compose down -v && bin/compose up -d`, teniendo en cuenta que así se borran también los datos de la instalación de prueba.

## El puerto 5000 está ocupado en macOS

En las computadoras Mac, el receptor de AirPlay usa el puerto 5000, que es el que la instalación de prueba usa por defecto. Se resuelve eligiendo otro puerto en el `.env`, por ejemplo con `CKAN_PORT_HOST=5001` y `CKAN_SITE_URL=http://localhost:5001`.

## `bin/reset` no deja limpia la instalación de prueba

El script intenta borrar los volúmenes por su nombre corto, como `ckan_storage`, cuando el nombre real incluye el prefijo del proyecto (`portal-andino-v2-dev_ckan_storage`), y además no toca la base de datos ni el índice de Solr. Para una limpieza completa hay que usar `bin/compose down -v --remove-orphans`.

## Los jobs de harvesting quedan en estado Running sin avanzar

Esto indica que el contenedor `ckan-worker` no está funcionando o que los procesos de harvesting no llegaron a iniciarse. El estado de esos procesos se consulta con `docker compose exec ckan-worker supervisorctl status`, y si no figuran como `RUNNING`, la causa suele estar en los registros de la carpeta `/var/log/supervisor/` dentro del mismo contenedor.

## No se puede dar de alta una fuente con una dirección que ya se usó

Cuando se elimina una fuente desde la web, CKAN la marca como borrada pero la conserva, y la dirección sigue reservada. Para volver a usarla hay que eliminar la fuente anterior en forma definitiva, como se explica en [Reutilizar la dirección de una fuente eliminada](/anexos/alta-de-fuentes/#reutilizar-la-dirección-de-una-fuente-eliminada).

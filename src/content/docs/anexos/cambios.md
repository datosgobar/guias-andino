---
title: Registro de cambios
# Última página de la guía de instalación: no sigue hacia la guía de uso.
next: false
---

Este registro reúne, ordenados del más reciente al más antiguo, los cambios en el stack de Portal Andino V2 que afectan la instalación o el mantenimiento de un portal, junto con las actualizaciones de esta guía. Antes de actualizar un portal ya instalado conviene revisar las entradas posteriores a la última actualización, porque algunas requieren agregar o modificar variables en el `.env`.

## 2026-09-23

- **Guía:** la guía de uso adopta los nombres que muestra el portal (*Organismos*, *Temas*, *Flujo de actividad*) y suma el diccionario de datos, las series de tiempo, las buenas prácticas de publicación y los canales de consulta.

## 2026-09-22

- **Guía:** primera versión de la guía de instalación y de la guía de uso de Portal Andino V2.

## 2026-07-23

- **Stack:** se agrega `ckanext-googleanalytics` en modo de medición desde el navegador, tanto en la imagen de desarrollo como en la de producción. Para activarlo hay que definir `CKAN___GOOGLEANALYTICS__ID` en el `.env` con el identificador del organismo.

## 2026-07-16

- **Stack:** `ckan.auth.public_user_details` pasa a `false`, de modo que los visitantes sin cuenta ya no pueden ver la lista de usuarios de cada organización.
- **Stack:** `ckanext-series-explorer` se instala también en la imagen de desarrollo, igual que en la de producción.

## 2026-07-08

- **Stack:** se agrega el plugin `series_explorer` a `CKAN__PLUGINS` y la duración de la cookie de sesión recordada pasa a 3600 segundos.

## 2026-07-02

- **Stack:** el catálogo de traducciones de JavaScript se genera en cada arranque, con el script `04_build_js_translations.sh`, para que los textos de los componentes interactivos aparezcan en español también en producción.
- **Stack:** los archivos `docker-compose` fijan el nombre del proyecto, lo que evita que la instalación de prueba y la de producción compartan volúmenes en la misma máquina.
- **Stack:** Solr pasa a usar un `managed-schema` incluido en el repositorio.

## 2026-06-26

- **Stack:** el cron de `ckan-worker` ejecuta `harvester run` cada cinco minutos y registra su salida en `/var/log/ckan_harvester.log`.

## 2026-06-23

- **Stack:** se agrega el contenedor `solr-init`, que crea el campo espacial en Solr al levantar el stack.

## 2026-06-22

- **Stack:** el `.env.example` usa `localhost` en `CKAN_SITE_URL`.
- **Stack:** el harvesting y el perfil de metadatos quedan habilitados también en la imagen de desarrollo.

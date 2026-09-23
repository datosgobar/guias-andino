---
title: Prerrequisitos
---

Antes de iniciar la instalación conviene tener resuelto todo lo que se describe en esta página, porque la mayoría de los inconvenientes que aparecen en una primera instalación se deben a algún elemento de esta lista que quedó pendiente.

## Servidor

El portal puede funcionar en un servidor propio del organismo o en una máquina virtual contratada en la nube, siempre que tenga Linux y pueda ejecutar Docker.

| Recurso | Mínimo | Recomendado |
|---|---|---|
| Sistema operativo | Linux x86_64 con Docker | Ubuntu Server 22.04 o 24.04 LTS |
| CPU | 2 vCPU | 4 vCPU |
| Memoria | 4 GB | 8 GB |
| Disco | 40 GB | 100 GB o más, si se van a subir archivos al portal |

:::caution[A validar]
Estos valores son de referencia y todavía no se contrastaron con instalaciones en producción. Solr y PostgreSQL son los servicios que más memoria consumen, de modo que si el portal va a harvestear muchos catálogos conviene partir de la configuración recomendada.
:::

El espacio en disco crece sobre todo con los archivos que se suben al portal, que se guardan en el volumen `ckan_storage`, y con el contenido que se carga en el datastore. Si los recursos se publican como enlaces a archivos alojados en otro servidor, el consumo de disco se mantiene bajo.

## Software

En el servidor solo hace falta instalar tres herramientas, ya que todos los servicios del portal (Python, PostgreSQL, Solr y el resto) se ejecutan dentro de contenedores:

- **Docker Engine** 24 o superior, junto con el plugin **Docker Compose v2**. Con esta versión el comando se escribe `docker compose`, sin guion.
- **git**, para descargar el repositorio del portal.
- **openssl**, para generar las claves secretas que se completan en el archivo `.env`.

## Red y dominio

El portal necesita un dominio o subdominio del organismo que apunte a la dirección IP del servidor, por ejemplo `datos.miorganismo.gob.ar`, y un certificado TLS emitido para ese nombre. Desde internet solo tienen que estar abiertos los puertos 80 y 443, porque el resto de los servicios se comunica por redes internas de Docker.

Si el portal va a harvestear datos de otros portales, el servidor también necesita poder conectarse por HTTP y HTTPS a las direcciones de esos catálogos.

## Cuenta de correo

CKAN envía correos electrónicos, entre otras cosas, para que los usuarios recuperen su contraseña. Para eso hace falta una cuenta en un servidor SMTP, con su usuario y contraseña. El portal funciona sin esta configuración, pero en ese caso nadie puede recuperar el acceso a su cuenta.

## Conocimientos del equipo

La persona que instale el portal tiene que manejarse con soltura en una terminal Linux, saber editar archivos de configuración y conocer los conceptos básicos de Docker: qué son una imagen, un contenedor y un volumen, y cómo consultar los registros de un contenedor. No es necesario saber programar en Python ni haber trabajado antes con CKAN, porque los conceptos propios de CKAN se explican en la sección [Conceptos](/instalacion/conceptos/).

## Lista de verificación

- [ ] El servidor tiene Docker y Compose v2 funcionando, y `docker compose version` responde sin errores.
- [ ] El dominio ya resuelve a la dirección IP del servidor.
- [ ] El certificado TLS está disponible.
- [ ] Están los datos de la cuenta SMTP.
- [ ] Están definidos el nombre, el correo y la contraseña de la cuenta de administración del portal.
- [ ] Si se va a personalizar la apariencia, están el logo y los colores del organismo.

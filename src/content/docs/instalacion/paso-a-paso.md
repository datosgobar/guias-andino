---
title: Instalación paso a paso
description: El procedimiento completo para instalar Portal Andino V2 en un servidor, con aclaraciones sobre cada valor por defecto.
---

El procedimiento parte de la configuración que trae el repositorio por defecto. En los puntos donde conviene conocer algún detalle antes de aceptar ese valor aparece una nota desplegable, en amarillo cuando se trata de una aclaración y en rojo cuando no tenerla en cuenta puede dejar el portal inseguro o sin funcionar.

<details class="nota">
<summary>Cómo hacer una instalación de prueba en una computadora</summary>

Antes de instalar en el servidor conviene probar el procedimiento en una computadora con Docker. Los pasos son los mismos, pero se usa `bin/compose` en lugar de `docker compose`, lo que levanta el entorno definido en `docker-compose.dev.yml`, y el contenedor web se llama `ckan-dev` en lugar de `ckan`. En ese entorno el portal queda disponible en `http://localhost:5000`, sin nginx ni HTTPS. En las computadoras Mac el puerto 5000 suele estar ocupado por el sistema; la solución se explica en [Problemas conocidos](/anexos/problemas/#el-puerto-5000-está-ocupado-en-macos).

</details>

## 1. Descargar el repositorio

```bash
git clone https://github.com/datosgobar/portal-andino-v2.git
cd portal-andino-v2
```

## 2. Crear el archivo de configuración

El repositorio incluye un archivo de ejemplo que sirve como punto de partida:

```bash
cp .env.example .env
```

En el nuevo `.env` hay que completar al menos las siguientes variables:

| Variable | Valor |
|---|---|
| `CKAN_SITE_URL` | La dirección pública exacta del portal, con el protocolo; por ejemplo `https://datos.miorganismo.gob.ar` |
| `CKAN___BEAKER__SESSION__SECRET` | Una clave aleatoria |
| `CKAN___SECRET_KEY` | Otra clave aleatoria, distinta de la anterior |
| `CKAN_SYSADMIN_NAME`, `CKAN_SYSADMIN_PASSWORD`, `CKAN_SYSADMIN_EMAIL` | Los datos de la cuenta de administración |
| `POSTGRES_PASSWORD`, `CKAN_DB_PASSWORD`, `DATASTORE_READONLY_PASSWORD` | Contraseñas nuevas para la base de datos |
| `CKAN_SMTP_*` | Los datos del servidor de correo |
| `CKAN__SITE_TITLE`, `CKAN_SITE_ID` | El nombre del portal y un identificador corto, sin espacios |

Cada clave aleatoria se puede generar con este comando:

```bash
openssl rand -hex 32
```

<details class="nota grave">
<summary>Las contraseñas de ejemplo tienen que cambiarse antes del primer arranque</summary>

El archivo de ejemplo trae `test1234` como contraseña del administrador y `postgres` como contraseña de la base de datos, valores que solo son aceptables para una prueba local. El usuario administrador se crea en el primer arranque con lo que diga el `.env` en ese momento, así que en un servidor accesible desde internet hay que reemplazarlas antes de levantar el portal.

</details>

<details class="nota grave">
<summary>Al cambiar las contraseñas de la base también hay que actualizar las direcciones de conexión</summary>

Las variables `CKAN_SQLALCHEMY_URL`, `CKAN_DATASTORE_WRITE_URL` y `CKAN_DATASTORE_READ_URL` repiten el usuario y la contraseña de la base dentro de la dirección, y no se actualizan solas a partir de `CKAN_DB_PASSWORD` ni de `DATASTORE_READONLY_PASSWORD`. Si se cambia una contraseña y no la dirección correspondiente, CKAN no puede conectarse a la base y no arranca.

</details>

<details class="nota grave">
<summary><code>CKAN_SITE_URL</code> tiene que coincidir con la dirección que se usa en el navegador</summary>

El código JavaScript del portal descarga sus traducciones desde esa dirección antes de iniciar cualquier componente interactivo. Si el navegador no puede resolverla, como ocurre con `http://andino.local` cuando no está declarada en `/etc/hosts`, el mapa, los filtros y los autocompletados dejan de funcionar sin mostrar ningún mensaje de error. En una instalación de prueba el valor correcto es `http://localhost:` seguido del puerto configurado en `CKAN_PORT_HOST`.

</details>

## 3. Revisar los plugins

La variable `CKAN__PLUGINS` del archivo de ejemplo activa todas las funciones, incluido el harvesting. Si el portal no va a incorporar datos de otros portales, se pueden quitar de la lista `harvest`, `gobar_ckan_harvester`, `ckan_harvester` y `xlsx_harvester`.

<details class="nota">
<summary>Por qué el harvesting viene activado por defecto</summary>

Así el portal queda preparado para harvestear sin necesidad de reconstruir las imágenes más adelante. Mientras no haya fuentes cargadas, tenerla activa no tiene ningún efecto, porque el proceso que se ejecuta cada cinco minutos no encuentra trabajos pendientes. Si se decide quitarla, conviene detener también el contenedor `ckan-worker`, como se explica en [Harvester](/anexos/harvester/#desactivarlo).

</details>

<details class="nota">
<summary>El identificador de Google Analytics del archivo de ejemplo no es real</summary>

El `.env.example` trae `CKAN___GOOGLEANALYTICS__ID=GTM-XXXXXXX`, un valor de ejemplo con el que el plugin inserta un código que no registra ninguna visita. Hay que reemplazarlo por el identificador del organismo o quitar `googleanalytics` de la lista de plugins.

</details>

## 4. Elegir el perfil y la identidad del organismo

La apariencia del portal depende del perfil del theme, que es **obligatorio**: si el `.env` no lo define, o tiene un valor que no es uno de los dos admitidos, CKAN no arranca y el error queda en el log. Para los organismos de la Administración Pública Nacional, que son el caso que cubre esta guía, el perfil es `apn`:

```dotenv
CKANEXT__GOBAR_THEME__PROFILE=apn
```

El perfil `apn` aplica Poncho, el sistema de diseño de argentina.gob.ar, de modo que el portal queda integrado visualmente con el resto de los sitios del Estado nacional. El otro perfil, `datosgobar`, reproduce la identidad de la Dirección de Datos Abiertos y está reservado para datos.gob.ar; si el `.env.example` lo trae configurado, hay que cambiarlo por `apn`.

Con el perfil solo, el portal muestra el título como texto en lugar de logo y no muestra contacto ni texto institucional. El resto de la identidad del organismo se completa con unas pocas variables más. Este es un `.env` mínimo de ejemplo, que se agrega al final del archivo con los datos propios:

```dotenv
CKANEXT__GOBAR_THEME__PROFILE=apn
CKAN__SITE_TITLE=Datos Agro
CKAN__SITE_LOGO=https://www.magyp.gob.ar/logos/datos-blanco.svg
CKAN__SITE_DESCRIPTION=Portal de datos abiertos del Ministerio de Agricultura, Ganadería y Pesca.
CKAN__SITE_ABOUT=Este portal reúne los datos abiertos del **Ministerio de Agricultura, Ganadería y Pesca**.
CKANEXT__GOBAR_THEME__SUBTITLE=Datos del sector agropecuario y sus temas relacionados.
CKANEXT__GOBAR_THEME__CONTACT_URL=mailto:datospublicos@magyp.gob.ar
CKANEXT__GOBAR_THEME__INSTITUTIONAL_NAME=Ministerio de Agricultura, Ganadería y Pesca
CKANEXT__GOBAR_THEME__INSTITUTIONAL_URL=https://www.magyp.gob.ar
```

| Variable | Qué define |
|---|---|
| `CKAN__SITE_TITLE` | El nombre del portal, que aparece en la pestaña del navegador y como título de la página de inicio. |
| `CKAN__SITE_LOGO` | El logo del encabezado y del pie. Va sobre el color institucional, así que conviene una versión blanca o clara. Puede ser una dirección completa (`https://…`). |
| `CKAN__SITE_DESCRIPTION` | El texto que aparece debajo del logo, en el pie de página. |
| `CKAN__SITE_ABOUT` | El texto de la página *Acerca*. Admite Markdown, pero tiene que ir en una sola línea. |
| `CKANEXT__GOBAR_THEME__SUBTITLE` | La frase que acompaña al título en la página de inicio. |
| `CKANEXT__GOBAR_THEME__CONTACT_URL` | El enlace *Contacto* del pie: una dirección web o un correo con el formato `mailto:`. |
| `CKANEXT__GOBAR_THEME__INSTITUTIONAL_NAME` y `_URL` | El nombre y la dirección del organismo, que aparecen como enlace institucional en el pie. |

<details class="nota">
<summary>Colores propios del organismo</summary>

Si no se define ningún color, el portal usa los de Poncho. Para aplicar el color institucional alcanza con una variable, y los tonos claros, los bordes y los enlaces se calculan a partir de ella:

```dotenv
CKANEXT__GOBAR_THEME__COLOR_BRAND=#00703C
```

Opcionalmente se pueden definir también `COLOR_BRAND_DARK` (pie de página), `COLOR_INTERACTIVE` (enlaces y botones) y `COLOR_ACCENT` (detalles), siempre con el prefijo `CKANEXT__GOBAR_THEME__`. El color de marca tiene que ser oscuro, porque el texto del encabezado y de los botones es blanco; si no tiene contraste suficiente, el portal arranca igual pero deja un aviso en el log.

</details>

<details class="nota">
<summary>Cómo escribir los valores en el .env</summary>

Los colores, que empiezan con `#`, van sin comillas y sin un comentario en la misma línea. Además, el archivo tiene que terminar con un salto de línea: si no, la próxima variable que se agregue al final queda pegada a la anterior. Los cambios del `.env` se aplican al recrear el contenedor con `docker compose up -d ckan`; reiniciarlo no alcanza.

</details>

<details class="nota">
<summary>El aviso «Reportar un problema»</summary>

En las páginas de cada dataset y recurso, el perfil `apn` no muestra el aviso para reportar un problema hasta que se define `CKANEXT__GOBAR_THEME__REPORT_URL` con la dirección del formulario del organismo. Ese formulario tiene que aceptar el parámetro `?referencia=`, con el que el portal le pasa la dirección del dataset o del recurso.

</details>

<details class="nota">
<summary>Portales de provincias y municipios</summary>

Por ahora el theme no tiene una variante visual para provincias y municipios. Antes de instalar un portal de ese tipo conviene consultar con la Dirección de Datos Abiertos, escribiendo a [datosargentina@sicyt.gob.ar](mailto:datosargentina@sicyt.gob.ar).

</details>

<details class="nota">
<summary>Otras opciones de personalización</summary>

También se pueden ajustar la imagen de fondo de la página de inicio, el logo de la esquina inferior del pie, el favicon y el nombre con que se muestran las organizaciones, entre otras opciones. La lista completa está en la [guía de personalización del theme](https://github.com/datosgobar/ckanext-gobar-theme/blob/main/docs/personalizacion.md), y ninguna de ellas requiere editar plantillas.

</details>

## 5. Construir y levantar el portal

```bash
docker compose up -d --build
```

La primera ejecución demora varios minutos, porque se construyen las imágenes y se instalan todas las extensiones.

## 6. Verificar la instalación

El primer control consiste en revisar el estado de los contenedores:

```bash
docker compose ps
```

Todos los servicios tienen que figurar como `running` o `healthy`, con excepción de `solr-init`, que termina su tarea y queda como `exited (0)`. Después conviene consultar la API del portal:

```bash
curl -k https://localhost:8443/api/action/status_show
```

La respuesta tiene que ser un JSON que incluya `"success": true` y la lista de extensiones activas. El script [verificar-stack.sh](/anexos/scripts/#verificar-stacksh) hace estos controles y algunos más en un solo paso.

<details class="nota">
<summary>Por qué HTTPS responde en el puerto 8443</summary>

El `.env.example` publica HTTPS en el puerto 8443, mediante la variable `NGINX_SSLPORT_HOST`, para no interferir con otros servicios que pueda haber en el servidor. En un servidor dedicado al portal se puede cambiar a 443.

</details>

## 7. Instalar el certificado TLS

:::danger[Pendiente de resolver]
En la versión actual, la imagen de nginx genera un certificado autofirmado para `localhost` cada vez que arranca, y el nombre del servidor está fijado en `localhost`. Antes de publicar el primer portal hace falta definir cómo se incorpora el certificado real del organismo, ya sea montando los archivos del certificado en el contenedor o ubicando delante un proxy que se ocupe del cifrado.
:::

## 8. Ingresar como administrador

El acceso está en `/user/login`, con el usuario y la contraseña definidos en las variables `CKAN_SYSADMIN_*`. Desde esa cuenta se crean las organizaciones y se empiezan a cargar los datasets.

## 9. Configurar el harvesting, si corresponde

Este paso solo es necesario si el portal va a incorporar datasets de otros portales, y se explica en el anexo [Harvester](/anexos/harvester/).

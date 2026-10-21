---
title: Personalización y métricas
---

En el Andino anterior buena parte de la apariencia del portal se configuraba desde una sección de administración. En la versión 2 esos ajustes se definen en el archivo de configuración del servidor, de modo que quedan registrados y se conservan al actualizar el portal. Por eso, para cambiar la apariencia hay que pedirlo al equipo técnico que administra la instalación.

## Qué se puede personalizar

La apariencia general depende del perfil del portal, que para los organismos de la Administración Pública Nacional es `apn`, basado en Poncho. Sobre esa base, cada organismo muestra su propia identidad:

| Qué se ve en el portal | Qué hay que pedir al equipo técnico |
|---|---|
| El nombre del portal y la frase de la página de inicio | El título y una frase breve que describa el portal. |
| El logo del encabezado y del pie | El logo en una versión blanca o clara, porque va sobre el color institucional. |
| El texto del pie de página y el enlace al organismo | Una oración que presente el portal, y el nombre y la dirección web del organismo. |
| La página *Acerca* | El texto que presenta el portal, en un solo párrafo. |
| El enlace *Contacto* del pie | Un correo o un formulario de contacto del organismo. |
| La dirección, el teléfono y el correo en el pie | Los datos de contacto que el organismo quiera publicar. |
| El escudo en la esquina inferior del pie | El escudo o logo del organismo, en versión blanca o clara. |
| El aviso *Reportar un problema* en cada dataset | Un formulario donde se puedan recibir esos reportes. Si no se configura, el aviso no aparece. |
| Los colores | El color institucional, que tiene que ser oscuro para que el texto blanco se lea bien. Si no se indica, el portal usa los colores de Poncho. |

También se pueden adaptar la imagen de fondo de la página de inicio, el ícono que muestra el navegador en la pestaña y el nombre con que se muestran las organizaciones.

<figure class="captura pendiente">
Captura pendiente: página de inicio de un portal con el perfil <code>apn</code>, señalando los elementos que se pueden personalizar.
</figure>

El equipo técnico encuentra cómo cargar cada uno de estos datos en la [Guía de instalación](/instalacion/paso-a-paso/#4-elegir-el-perfil-y-la-identidad-del-organismo), y la lista completa de opciones en la [guía de personalización del theme](https://github.com/datosgobar/ckanext-gobar-theme/blob/main/docs/personalizacion.md).

<details class="nota">
<summary>Lo que todavía no se puede personalizar</summary>

A diferencia del Andino anterior, la versión 2 no tiene enlaces a redes sociales en el pie, una página *Acerca* con varias secciones ni distintas plantillas para la página de inicio. Las imágenes de los temas se cargan en cada tema desde el propio portal, por lo que no cambian con los colores del organismo.

</details>

## Métricas de uso

El portal registra las visitas con Google Analytics cuando el equipo técnico configura el identificador de la cuenta del organismo. Para ver las estadísticas no se entra al portal, sino a la cuenta de Google Analytics, por lo que las personas que necesiten consultarlas tienen que pedir acceso a quien administre esa cuenta en el organismo.

<details class="nota">
<summary>Si el portal no registra visitas</summary>

Lo más habitual es que el identificador de Google Analytics no se haya cambiado y siga el valor de ejemplo del archivo de configuración, que no corresponde a ninguna cuenta. En ese caso hay que pedir al equipo técnico que cargue el identificador real, como se indica en la [Guía de instalación](/instalacion/paso-a-paso/#3-revisar-los-plugins).

</details>

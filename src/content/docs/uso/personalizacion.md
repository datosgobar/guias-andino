---
title: Personalización y métricas
---

En el Andino anterior buena parte de la apariencia del portal se configuraba desde una sección de administración. En la versión 2 esos ajustes se definen en el archivo de configuración del servidor, de modo que quedan registrados y se conservan al actualizar el portal. Por eso, para cambiar la apariencia hay que pedirlo al equipo técnico que administra la instalación.

## Qué se puede personalizar

La apariencia general depende del perfil visual del portal, que para los organismos de la Administración Pública Nacional es `apn`, basado en Poncho. Sobre esa base se pueden adaptar, entre otras cosas, los colores, la imagen y los títulos de la página de inicio, el logo institucional del pie de página y el nombre con que se muestran las organizaciones.

<figure class="captura pendiente">
Captura pendiente: página de inicio de un portal con el perfil <code>apn</code>, señalando los elementos que se pueden personalizar.
</figure>

La lista completa de opciones, con ejemplos, está en la [guía de personalización del theme](https://github.com/datosgobar/ckanext-gobar-theme/blob/main/docs/personalizacion.md), pensada para el equipo técnico.

## Métricas de uso

El portal registra las visitas con Google Analytics cuando el equipo técnico configura el identificador de la cuenta del organismo. Para ver las estadísticas no se entra al portal, sino a la cuenta de Google Analytics, por lo que las personas que necesiten consultarlas tienen que pedir acceso a quien administre esa cuenta en el organismo.

<details class="nota">
<summary>Si el portal no registra visitas</summary>

Lo más habitual es que el identificador de Google Analytics no se haya cambiado y siga el valor de ejemplo del archivo de configuración, que no corresponde a ninguna cuenta. En ese caso hay que pedir al equipo técnico que cargue el identificador real, como se indica en la [Guía de instalación](/instalacion/paso-a-paso/#3-revisar-los-plugins).

</details>

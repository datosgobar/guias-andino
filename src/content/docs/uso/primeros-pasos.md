---
title: Primeros pasos
---

Antes de empezar a publicar hace falta una cuenta en el portal con los permisos adecuados. Esta página explica cómo ingresar, qué puede hacer cada tipo de usuario y cómo se reparten las tareas entre las personas que van a trabajar con el portal.

## Entrar y salir del portal

Para ingresar hay que abrir la dirección del portal seguida de `/user/login`, por ejemplo `https://datos.miorganismo.gob.ar/user/login`, y completar el nombre de usuario o el correo electrónico junto con la contraseña. La opción *Recordarme* mantiene la sesión abierta en ese navegador. Una vez dentro, el nombre de la cuenta aparece en la parte superior de la página, y desde ese mismo menú se sale del portal.

<figure class="captura pendiente">
Captura pendiente: pantalla <em>Iniciar sesión</em>, con los campos de usuario y contraseña.
</figure>

En el Andino anterior la dirección de ingreso era `/ingresar`. Si alguien olvida su contraseña, puede pedir una nueva desde el enlace *¿Olvidaste tu contraseña?* del mismo formulario, siempre que el portal tenga configurado el envío de correos.

## Tipos de usuario

El Andino anterior distinguía entre administradores y colaboradores. En la versión 2 esa distinción se mantiene, pero los permisos se asignan en dos niveles: el portal completo y cada organismo.

| Rol | Dónde se asigna | Qué puede hacer |
|---|---|---|
| Administrador del portal | En todo el portal | Crear organismos, temas y usuarios, asignar roles y modificar cualquier dataset. Equivale al administrador del Andino anterior. |
| Administrador del organismo | En un organismo | Cargar y editar los datasets de su organismo y decidir quiénes más trabajan en él. |
| Editor | En un organismo | Cargar y editar los datasets de su organismo. Equivale al colaborador del Andino anterior. |
| Miembro | En un organismo | Ver los datasets privados de su organismo, sin modificarlos. |

Como cualquier cuenta con permisos de edición puede cambiar datos publicados, conviene que cada persona use su propia cuenta, con una contraseña de al menos ocho caracteres que combine letras, números y algún carácter especial, y que nunca se compartan cuentas entre personas.

## Crear cuentas y dar permisos

Los visitantes no pueden registrarse por su cuenta: las cuentas las crea quien administra el portal. Una vez que la persona tiene su cuenta, quien administre el organismo entra a la página del organismo, abre la sección de miembros, elige la cuenta y le asigna el rol que corresponda.

<figure class="captura pendiente">
Captura pendiente: sección de miembros de un organismo, con el selector de rol.
</figure>

<details class="nota">
<summary>Cómo se nombra a un nuevo administrador del portal</summary>

El rol de administrador del portal lo asigna el equipo técnico desde el servidor, con el comando `docker compose exec ckan ckan sysadmin add` seguido del nombre de usuario. Conviene que haya pocas personas con este rol, porque permite modificar cualquier contenido del portal.

</details>

<details class="nota">
<summary>Por qué no aparece la opción de registrarse</summary>

En CKAN 2.11 la opción `ckan.auth.create_user_via_web` está desactivada por defecto y el `.env` del portal no la modifica, de modo que solo una cuenta de administrador puede dar de alta a otras personas.

</details>

## Consultas y soporte

La Dirección de Datos Abiertos acompaña a los organismos que publican con Andino. Las consultas pueden hacerse por correo a datosargentina@jefatura.gob.ar o en los canales de Mattermost de la red de nodos, en [chat.argentina.gob.ar](https://chat.argentina.gob.ar/), que sirven para intercambiar dudas y enterarse de novedades. Para usar Mattermost hace falta un correo institucional y una cuenta que la Dirección crea a pedido del organismo.

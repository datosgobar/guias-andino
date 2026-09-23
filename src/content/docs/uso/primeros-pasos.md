---
title: Primeros pasos
---

Antes de empezar a publicar hace falta una cuenta en el portal con los permisos adecuados. Esta página explica cómo ingresar y qué puede hacer cada tipo de usuario, para que el organismo pueda repartir las tareas entre las personas que van a trabajar con el portal.

## Ingresar y salir del portal

Para ingresar hay que abrir la dirección del portal seguida de `/user/login` (por ejemplo, `https://datos.miorganismo.gob.ar/user/login`) y completar el nombre de usuario, o el correo electrónico, junto con la contraseña. Una vez dentro, el nombre de la cuenta aparece en la parte superior de la página, y desde ese mismo menú se accede a la opción para salir.

<figure class="captura pendiente">
Captura pendiente: formulario de ingreso al portal.
</figure>

Si alguien olvida su contraseña, puede pedir una nueva desde el enlace que aparece en el formulario de ingreso, siempre que el portal tenga configurado el envío de correos.

## Tipos de usuario

El Andino anterior distinguía entre administradores y colaboradores. En la versión 2 esa distinción se mantiene, pero los permisos se asignan en dos niveles: el portal completo y cada organización.

| Rol | Dónde se asigna | Qué puede hacer |
|---|---|---|
| Administrador del portal | En todo el portal | Crear organizaciones y usuarios, asignar roles y modificar cualquier dataset. Equivale al administrador del Andino anterior. |
| Administrador de la organización | En una organización | Cargar y editar los datasets de su organización y decidir quiénes más trabajan en ella. |
| Editor | En una organización | Cargar y editar los datasets de su organización. Equivale al colaborador del Andino anterior. |
| Miembro | En una organización | Ver los datasets privados de su organización, sin modificarlos. |

## Dar permisos a otra persona

Para sumar a alguien a una organización, primero esa persona tiene que tener una cuenta en el portal. Después, quien administre la organización entra a la página de la organización, abre la sección de miembros, elige la cuenta y le asigna el rol que corresponda.

<figure class="captura pendiente">
Captura pendiente: sección de miembros de una organización, con el selector de rol.
</figure>

<details class="nota">
<summary>Cómo se nombra a un nuevo administrador del portal</summary>

El rol de administrador del portal lo asigna el equipo técnico desde el servidor, con el comando `docker compose exec ckan ckan sysadmin add` seguido del nombre de usuario. Conviene que haya pocas personas con este rol, porque permite modificar cualquier contenido del portal.

</details>

<details class="nota">
<summary>Solo quien administra el portal puede crear cuentas nuevas</summary>

En CKAN 2.11 los visitantes no pueden registrarse por su cuenta, porque la opción `ckan.auth.create_user_via_web` está desactivada por defecto y el `.env` del portal no la modifica. Las cuentas las crea quien administra el portal, desde la página de registro de usuarios y con su sesión iniciada.

</details>

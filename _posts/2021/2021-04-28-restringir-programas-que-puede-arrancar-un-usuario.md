---
title: Restringir una cuenta de usuario administrador (o no) a que solo pueda ejecutar ciertos programas en windows 10
autor: David Pascual
category: sysadmin
layout: post
tags: [windows, politicas]
---

Hace poco me ha aparecido una casuística que no veía desde los tiempos de windows xp, el permitir a un usuario el arrancar una aplicación con permisos de administrador local ya que sin ellos la aplicación no funciona (hay desarrolladores que simplemente quieren ver el mundo arder).

El caso es que en windows xp la solución a este problema era relativamente sencilla, simplemente con dejar un acceso directo en el escritorio que con el siguiente contenido:

```cmd
runas /user:nombre-maquina\nombre-administrador /savedcred "L:\a\ruta\al\ejecutable.exe"
```

Ejecutándolo tu mismo e introduciendo la contraseña del administrador local una vez, el usuario podía arrancar ese programa como administrador sin saber la contraseña del mismo.

A partir de windows 7, si intentamos usar este "truquillo" del runas nos aparecerá el siguiente mensaje:

<div class="image" markdown="1">
![Error 740: La operación solicitada requiere elevación](/img/news/202104221306/error-runas-elevacion.webp)
</div>

La solución mas rápida para permitir al usuario ejecutar el programa seria deshabilitar el UAC, pero esta solución no es en absoluto recomendable. No obstante se puede conseguir una màquina en donde un usuario (en nuestro caso un administrador de la maquina) solo pueda ejecutar un programa y nada mas.


### Crear usuario para ejecutar el programa

Crearemos un usuario administrador local, en nuestro caso, ya que el programa en cuestión necesita de permisos de administrador.

```powershell
New-LocalUser -AccountNeverExpires -UserMayNotChangePassword -PasswordNeverExpires -Name "usuario-programa"
Add-LocalGroupMember -Group "Administradores" -Member "usuario-programa"
```

### Configurar políticas locales para limitar ejecución de programas para el usuario

#### Abrir editor de políticas para un usuario en concreto del equipo local.

`Win + R` y ejecutaremos mmc

<div class="image" markdown="1">
![Ejecutar Microsoft Management Console](/img/news/202104221306/configurar-politicas-restringir-aplicaciones.webp)
</div>

Una vez que tengamos la MMC abierta añadiremos el complemento mediante la entrada de menú **Archivo --> Agregar o quitar complemento..."** o mediante el shortcut `Ctrl + M`:

<div class="image" markdown="1">
![Agregar complemento a la consola](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-02.webp)
</div>

Cuando se nos abra el cuadro de dialogo de **Agregar o quitar complementos** buscaremos la entrada de *Complementos disponibles:* **Editor de objetos y directivas de grupo** y pulsaremos en **Agregar**:

<div class="image" markdown="1">
![Agregar Editor de objetos y directivas de grupo](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-03.webp)
</div>

En el asistente que nos aparecerá pulsaremos sobre el botón **Examinar...**:

<div class="image" markdown="1">
![Agregar Editor de objetos y directivas de grupo 02](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-04.webp)
</div>

En la ventana que nos aparecerá seleccionaremos la pestaña **Usuarios** y dentro de usuarios seleccionaremos el usuario que hemos creado en el paso anterior (*usuario-programa*) y pulsaremos en **Aceptar**:

<div class="image" markdown="1">
![Agregar Editor de objetos y directivas de grupo 03](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-05.webp)
![Agregar Editor de objetos y directivas de grupo 04](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-06.webp)
</div>

Una vez que le hemos dado a Aceptar podremos ver en el asistente que nos aparece seleccionado como **Objeto de directiva de grupo** el usuario que hemos creado en el paso anterior, pulsaremos en **Finalizar** para agregar el complemento a la consola de administración.

<div class="image" markdown="1">
![Agregar Editor de objetos y directivas de grupo 05](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-07.webp)
</div>

#### Configurar la política para limitar la ejecución de programas a un solo programa.

Accederemos a **Configuración de usuario -> Plantillas administrativas -> Sistema** y haremos doble click sobre la entrada **Ejecutar solo aplicaciones especificas de Windows**:

<div class="image" markdown="1">
![Configurar política Ejecutar solo aplicaciones especificas de Windows 01](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-08.webp)
</div>

En la ventana de configuración de la política que nos aparece, habilitaremos la politica selccionando **Habilitada** y pulsaremos el botón **Mostrar...** de la opcion **Lista de aplicaciones permitidas**

<div class="image" markdown="1">
![Configurar política Ejecutar solo aplicaciones especificas de Windows 02](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-09.webp)
</div>

En el cuadro de dialogo que nos aparecerá introduciremos el nombre del ejecutable que queremos permitir que se ejecute (para este articulo usaremos firefox como ejemplo) y pulsaremos en **Aceptar**.

<div class="image" markdown="1">
![Configurar política Ejecutar solo aplicaciones especificas de Windows 03](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-10.webp)
</div>

**Importante**: En la ventana anterior hay que poner **solo** el nombre del programa que queremos permitir ejecutar, no hay que poner la ruta del hacia el ejecutable.

Pulsaremos **Aceptar** en la ventana e configuración de la política 

<div class="image" markdown="1">
![Configurar política Ejecutar solo aplicaciones especificas de Windows 04](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-11.webp)
</div>

Y ya nos aparecerá como configurada y habilitada:

<div class="image" markdown="1">
![Configurar política Ejecutar solo aplicaciones especificas de Windows 05](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-12.webp)
</div>

### Comprobación de la política 

Si iniciamos sesión con el usuario **usuario-programa** que hemos creado en el primer paso e intentamos abrir cualquier aplicación, excepto firefox, nos aparecerá el siguiente mensaje de error:

<div class="image" markdown="1">
![Comprobación aplicación política 01](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-13.webp)
</div>

En cambio si ejecutamos firefox, se nos abrirá sin problema alguno.

<div class="image" markdown="1">
![Comprobación aplicación política 02](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-14.webp)
</div>

<div style="text-align:center" class="alert alert-danger" role="alert">
<div>&nbsp;</div>
<strong>MUCHO CUIDADO!!!</strong>
<div>&nbsp;</div>
</div>

Esta solución solo vale para las sesiones interactivas del usuario sobre el que configuramos la política, si por ejemplo tenemos un usuario en el mismo equipo que sabe la contraseña del administrador capado e intenta ejecutar cualquier cosa mediante ejecutar como administrador y selecciona este administrador:

<div class="image" markdown="1">
![Ejecutar como administrador se salta la política 01](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-15.webp)
![Ejecutar como administrador se salta la política 02](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-16.webp)
</div>

Podrá hacerlo sin ningún problema:

<div class="image" markdown="1">
![Ejecutar como administrador se salta la política 03](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-17.webp)
</div>

Comento esto por que mi idea inicial era configurar esta política, darle la contraseña a un usuario y dejar que ejecutar la aplicación que requería permisos de administrador mediante "Ejecutar como administrador".

### Notas finales

Para solventar el problema de que el usuario no pueda arrancar programas a través del "Ejecutar como administrador" se ha creado una VM en la misma màquina y para entrar al programa se arranca la VM y se conecta por rdp a esta con el administrador con restricciones.

Si en lugar de configurar esta política configuramos la política **"No ejecutar aplicaciones de Windows especificas"**

<div class="image" markdown="1">
![Política No ejecutar aplicaciones de Windows especificas](/img/news/202104221306/configurar-politicas-restringir-aplicaciones-18.webp)
</div>

El usuario podrá ejecutar cualquier cosa excepto lo que nosotros especifiquemos, por ejemplo podríamos configurar que un usuario no arranque los navegadores para impedir que navegue por internet.

### Documentación

* [https://www.howtogeek.com/howto/8739/restrict-users-to-run-only-specified-programs-in-windows-7/](https://www.howtogeek.com/howto/8739/restrict-users-to-run-only-specified-programs-in-windows-7/)
* [https://www.howtogeek.com/248206/how-to-apply-local-group-policy-tweaks-to-specific-users/](https://www.howtogeek.com/248206/how-to-apply-local-group-policy-tweaks-to-specific-users/)
* [https://docs.microsoft.com/en-gb/windows/configuration/kiosk-methods](https://docs.microsoft.com/en-gb/windows/configuration/kiosk-methods)
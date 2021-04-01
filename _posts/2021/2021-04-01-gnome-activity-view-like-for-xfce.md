---
title: Conmutador de ventanas tipo vista de actividades de gnome 3 para xfce
author: David Pascual
category: linux
layout: post
tags: [xfce, activity view, exposé]
---

Una de las features que mas me gustan de Gnome 3 es la vista de actividades:

<div class="image" markdown="1">
![Ejemplo vista actividades Gnome 3](/img/news/202012040917/ejemplo-vista-actividades-gnome-3.png)
</div>

En donde, mediante un simple shortcut de teclado, o un click de ratón, aparecen todas las ventanas que tenemos abiertas en el escritorio como una miniatura y podemos cambiar a la que queremos llegar identificándola por su miniatura y clickando sobre ella nos lleva directamente a ella. Si eres, como yo, una persona que llega a tener decenas de ventanas abiertas al mismo tiempo durante el desarrollo de la jornada de trabajo, probablemente te guste esta feature.

En macOS también existe esta feature y recibe el nombré de exposé, en windows 10 también la tenemos al pulsar `Win` + `Tab`.

Por desgracia, el sistema de escritorio **xfce**, mi favorito para equipos poco potentes (o no tan poco potentes) por su ligereza y velocidad de respuesta, no trae ninguna característica como esta integrada.

Si buscan en google te aparecen alternativas como [skippy-xd](https://github.com/richardgv/skippy-xd), pero su código (tal y como se puede ver en el repositorio de github) no se actualiza desde hace 7 años y la PPA a la que apuntan para instalar en ubuntu no tiene paquetes mas allá de la release 16.04.

En este articulo vamos a configurar una utilidad llamada [xfdashboard](https://docs.xfce.org/apps/xfdashboard/start), que tiene pinta de ser parte del proyecto xfce y que ademas distros como [ubuntu 20.04](https://packages.ubuntu.com/focal/xfce/xfdashboard) o [fedora](https://fedora.pkgs.org/31/fedora-x86_64/xfdashboard-0.7.5-4.fc31.x86_64.rpm.html) la ofrecen ya empaquetada.

En este articulo nos centraremos en su instalación y configuración en xubuntu 20.04.

### Instalación de xfdashboard

Como hemos dicho la utilidad viene por defecto en los repositorios de ubuntu, asi que instalarla es simplemente escribir en un terminal:

```bash
sudo apt install xfdashboard -y
```

si ejecutamos en un terminal `xfdashboard` podremos ver que ya nos aparece la vista de actividades de gnome.

### Ejecución en backgroud y shortcut

Aunque podríamos crear solamente el shortcut de teclado que nos lance esta vista, la solución mas optima es ejecutar el programa mediante la opción *daemonize*, para dejarlo en segundo plano, al iniciar sesión y una vez lanzado todas las veces que lo llamemos no lanzara una instancia nueva sino que nos mostrara la que esta ejecutandose en backgroud.

#### Ejecución en segundo plano.

Simplemente añadiremos a aplicaciones de inicio en **Settings -> Session and Startup -> Application Autostart** que se ejecute el comando:

```text
xfdashboard -daemonize
```
<div class="image" markdown="1">
![Añadir xfdashboard como daemon al inicio de sesión](/img/news/202012040917/anadir-daemon-inicio-sesion.png)
</div>

Ahora si salimos/cerramos nuestra sesión y volvemos a entrar podremos ver que xfdashboard se esta ejecutando en segundo plano:

<div class="image" markdown="1">
![xfdashboard ejecutandose en segundo plano](/img/news/202012040917/xfdashboard-ejecutandose-segundo-plano.png)
</div>

#### Creación de un shortcut de teclado

Ahora que ya tenemos xfdashboard ejecutándose en segundo plano procederemos a crear un atajo de teclado para poder lanzar la vista de actividades. En **Settings -> Keyboard ->Applicattion Shortcuts** pulsaremos sobre **Add** para añadir un nuevo shortcut.

En el primer cuadro de dialogo nos pide el programa que se va a ejecutar con el atajo de teclado, introduciremos simplemente `xfdashboard`:

<div class="image" markdown="1">
![Creación shortcut de teclado](/img/news/202012040917/shorcut-teclado-xfdashboard.png)
</div>

En el segundo cuadro de dialogo nos pedira que pulsemos la combinación de teclas que queremos asignar a este nuevo atajo de teclado, la pulsaremos. A mi personalmente me gusta la combinación de teclado **<Super>+W**, pero se puede introducir cualquiera (como por ejemplo <Super>+<Tab> para tener un shortcut equivalente al de windows).

**Nota:** si elegimos un shortcut que xfce ya tiene asignado (por ejemplo la combiancion *<Super>+W* esta ya asignada a lanzar el navegador web), nos preguntará si queremos reasignarla.

Una vez tenemos el shortcut definido si lo pulsamos podremos ver que nos aparece el xfdashboard.

<div class="image" markdown="1">
![xfdashboard funcionando](/img/news/202012040917/xfdashboard-funcionando.png)
</div>
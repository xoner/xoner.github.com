---
title: Hacer que los ficheros con cierta extensión sean ejecutables en windows
layout: post
author: David Pascual Rocher
category: windows
tags: [windows, extension, executable]
---

<div class="post-updates">
    <div class="update">
        <div class="header">Actualización 16/06/2020:</div>
        <div class="content">Se añade la creación de las claves de registro mediante powershell</div>
    </div>
</div>


En los entornos linux/unix hacer que un script sea directamente ejecutable es algo tan sencillo como marcar el fichero como ejecutable, mediante `chmod`, y poner en la primera linea del script el path del interprete comentado. En windows esto mismo no es posible, no obstante es posible asociar cada extensión de fichero con que programa se ha de usar por defecto al ejecutarlo. En este articulo haremos que los ficheros `.py` se ejecuten con el interprete de python [IronPython](https://ironpython.net/), implementación de python sobre el clr de .NET)

## Habilitar HKEY_CLASS_ROOT en powershell

Por defecto powershell no tiene acceso al grupo de claves de registro `HKEY_CLASSES_ROOT`, para poder tener acceso a este conjunto de claves de registro hay que ejecutar el siguiente comando en powershell:

```powershell
New-PSDrive -PSProvider registry -Root HKEY_CLASSES_ROOT -Name HKCR
```


## Crear una clave de registro para el tipo de archivo (si no existe)

### Version regedit 

1. Abrir el editor de registro de windows i sobre la clave de registro `HKEY_CLASSES_ROOT` crear una nueva clave con la extension de archivos que queremos hacer ejecutable (en nuestro caso **.py**)
2. Sobre esta nueva clave de registro que hemos creado, crear un nuevo valor con estos valores:

<table class="table table-bordered" style="max-width:475px;margin:0 auto">
    <thead>
        <tr><th>Nombre</th><th>Tipo</th><th>Datos</th></tr>
    </thead>
    <tbody>
        <tr><td>Content</td><td>Type</td><td>REG_SZ  text/plain</td></tr>
    </tbody>
</table>

3. Sobre esta nueva clave de registro que hemos creado cambiar el valor *(Predeterminado)* para que quede de la siguiente forma:

<table class="table table-bordered" style="max-width:475px;margin:0 auto">
    <thead>
        <tr><th>Nombre</th><th>Tipo</th><th>Datos</th></tr>
    </thead>
    <tbody>
        <tr><td>(Predeterminado)</td><td>REG_SZ</td><td>IronPython.File</td></tr>
    </tbody>
</table>

### Versión powershell

```powershell
Set-Location HKCR:
New-Item -Path HKCR:\ -Name '.py'
Set-ItemProperty -Path  HKCR:\.py -Name '(Default)' -Value 'IronPython.File'
```


## Crear una clau para el manejador de archivo que hemos declarado anteriormente

### Versión regedit

1. Sobre la clave de registro `HKEY_CLASS_ROOT` crear una nueva clave con el valor introducido en el punto 3 del apartado anterior (En nuestro caso **IronPython.File**).
2. Sobre la clave de registro creada en el paso anterior crear una subclave llamada **Shell**.
3. Sobre la clave creada en el paso anterior crear una subclave llamada **Open**, editar el valor del valor **(Predeterminado)** de la clave **Open**. para que quede de la siguiente forma.

<table class="table table-bordered" style="max-width:475px;margin:0 auto">
    <thead>
        <tr><th>Nombre</th><th>Tipo</th><th>Datos</th></tr>
    </thead>
    <tbody>
        <tr><td>(Predeterminado)</td><td>REG_SZ</td><td>Open</td></tr>
    </tbody>
</table>

4. Sobre la clave de registro creada en el paso anterior crear una subclave **Command**.
5. Editar el valor **(Predeterminado)** de la clave creada en el paso anteiror para que quede de la siguiente forma:

<table class="table table-bordered" style="max-width:645px;margin:0 auto">
    <thead>
        <tr><th>Nombre</th><th>Tipo</th><th>Datos</th></tr>
    </thead>
    <tbody>
        <tr><td>(Predeterminado)</td><td>REG_SZ</td><td>“C:\Archivos de programa\IronPython 2.6\ipy.exe” “%1″ %*</td></tr>
    </tbody>
</table>

<span class="label label-warning">Nota!!: </span> C:\Archivos de programa\IronPython 2.6\ipy.exe es la ruta cap a l’executable d’IronPython.

### Versión powershell

```powershell
New-Item -Path HKCR:\ -Name 'IronPython.File'
New-Item -Path HKCR:\IronPython.File -Name 'Shell'
New-Item -Path HKCR:\IronPython.File\Shell -Name 'Open'
New-ItemProperty -Path HKCR:\IronPython.File\Shell\Open -Name '(Default)' -Value 'Open'

New-Item -Path HKCR:\IronPython.File\Shell\Open -Name 'Command'
New-ItemProperty -Path HKCR:\IronPython.File\Shell\Open\Command -Name '(Default)' -Value '"C:\Program Files\IronPython 2.7\ipy.exe" "%1" %*'
```
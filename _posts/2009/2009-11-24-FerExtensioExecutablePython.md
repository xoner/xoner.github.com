---
title: Fer els fitxers amb certa extensió executables en windows
layout: post
author: David Pascual Rocher
category: windows
tags: [windows, extension, executable]
---
En el mundillo unix fer un script executable es quelcom tan senzil com donar-li permisos d’execució al fitxer i posar en la primera lina del script el path de l’executable que interpretará l’script. En windows aço no es posible, no obstant es pot associar a cada extensió de fitxer amb quin programá s’ha d’executar per defecte . En aquest exemple farem que el scripts python (*.py) s’executen amb IronPython (implementació de python sobre .net de Microsoft).

### Crear clau per a l'extensió d'arxiu

1. Obrir el editor de registre de windows i sobre la clau HKEY_CLASS_ROOT crear una nova clau amb l’extensió que volem fer executable (en el nostre cas “.py”)
2. Sobre aquesta nova clau que hem creat, crear nou valor amb aquestos valors:
<table class="table table-bordered" style="width:475px;margin:0 auto">
    <thead>
        <tr><th>Nombre</th><th>Tipo</th><th>Datos</th></tr>
    </thead>
    <tbody>
        <tr><td>Content</td><td>Type</td><td>REG_SZ  text/plain</td></tr>
    </tbody>
</table>
3. Sobre aquesta nova clau que hem creat en el valor predeterminat canviar les dades per a que quede de la següent forma:<table class="table table-bordered" style="width:475px;margin:0 auto">
    <thead>
        <tr><th>Nombre</th><th>Tipo</th><th>Datos</th></tr>
    </thead>
    <tbody>
        <tr><td>(Predeterminado)</td><td>REG_SZ</td><td>IronPython.File</td></tr>
    </tbody>
</table>

### Crear una clau per al tipus d'arxiu

1.Sobre la clau HKEY_CLASS_ROOT crear una nova clau amb el valor de les dades en el valor predeterminat, valor introduït en el punt anterior (En el nostre cas “IronPython.File”)
2.Sobre la clau creada en el pas anterior crear una sub clau anomenada shell
3.Sobre la clau creada en el pas anterior crear una sub clau anomenada open, editar la clau predeterminada per a que tinga els següents valors:
<table class="table table-bordered" style="width:475px;margin:0 auto">
    <thead>
        <tr><th>Nombre</th><th>Tipo</th><th>Datos</th></tr>
    </thead>
    <tbody>
        <tr><td>(Predeterminado)</td><td>REG_SZ</td><td>Open</td></tr>
    </tbody>
</table>
4.Sobre la clau creada en el pas anterior crear una sub clau anomenada command
5.Editar el valor predeterminat de la clau creada en el pas anterior per a que quede de la següent forma:
<table class="table table-bordered" style="width:645px;margin:0 auto">
    <thead>
        <tr><th>Nombre</th><th>Tipo</th><th>Datos</th></tr>
    </thead>
    <tbody>
        <tr><td>(Predeterminado)</td><td>REG_SZ</td><td>“C:\Archivos de programa\IronPython 2.6\ipy.exe” “%1″ %*</td></tr>
    </tbody>
</table>
<span class="label label-warning">Nota!!: </span> C:\Archivos de programa\IronPython 2.6\ipy.exe es la ruta cap a l’executable d’IronPython.
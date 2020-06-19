---
title: Cambiar la fuente de la GUI del thunderbird
author: David Pascual
layout: post
category: software
tags: [thunderbird, gui, font]
---

La fuente que trae por defecto el thunderbird no casa demasiado con el look and feel de OSX, no obstante se puede cambiar si realizamos los siguientes cambios.

En la carpeta del perfil de usuario (en OSX */Users/xoner/Library/Thunderbird/Profiles/xxxxxxxxx.default*) crear una carpeta que se llame **chrome** i crear en ella un fichero que se llame **userChrome.css**. 

Editar el fichero que hemos creado anteriormente e introducir el siguiente contenido:

```css
* {
	font-size: 14px !important;
	font-family: "Lucida Grande", Arial !important;
}
```

Se suporne que este truco también tiene que funcionar con la gui del firefox, si se coloca el fichero `chrome\userChrome.css` en la carpeta del perfil de firefox.

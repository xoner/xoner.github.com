---
title: Canviar font de la GUI del thunderbird
author: David Pascual
layout: post
category: software
tags: [thunderbird, gui, font]
---

En la carpeta del perfil d'usuari (en OSX */Users/xoner/Library/Thunderbird/Profiles/xxxxxxxxx.default*) crear una carpeta que s'anomene **chrome** i crear en ella un fitxer que s'anomene **userChrome.css**. Posar el següent codi per a fer thunderbird més mac-frinedly:

{% highlight css %}
* {
	font-size: 14px !important;
	font-family: "Lucida Grande", Arial !important;
}
{% endhighlight %}

Se suposa que este truquet també ha de funcionar amb firefox, si es coloca una fixer chrome/userChrome.css en la carpeta del perfil de firefox.
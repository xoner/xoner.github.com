---
title: Resetejar activació windows al virtualitzar màquina física
author: David Pascual
layout: post
category: virtualitzacio
tags: [vmware, P2V, windows, activació, inici sessió]
---
De vegades he tingut que virtualitzar màquines windows que estan en producció, per a trastejar amb programes que estan instal·lats en la màquina sense repercutir en la màquina en producció per exemple. Però al tractar-se de windows hi ha un problema, al virtualitzar windows detecta que massa coses han canviat en el hardware que suporta la versió de windows i el sistema antipirateria de windows bota demanant que s'active windows en línia, no deixant que s'inicie sessió si es fa l'activació. Açò es quelcom problemàtic ja que es tracta d'un duplicat d'una màquina en producció (destinada a proves) i probablement si s'activa la llicencia de la màquina en producció quede invalidada.

Com a solució, ja que es tracta d'una màquina que sols va a utilitzar-se temporalment per a proves, es pot reiniciar el període d'activació de windows i aixi la màquina passa a demanar que s'ha d'activar windows en 30 dies si no es bloquejarà. Per a fer-ho:

* Arrancar el windows en *Modo a prueba de fallos con simbolo del sistema*, ja que en aquest mode ens deixa iniciar sessió i "botar-nos" la protecció de l'activació.
* Executar el següent comando en la consola:

{% highlight PowerShell %}
rundll32.exe syssetup,SetupOobeBnk
{% endhighlight %}

* Reiniciar el sistema.

Al reiniciar el sistema ja podrem entrar, i l'únic que ens apareixerà es un missatge de que la nostra còpia de windows no està activada i pop-up de que tenim 30 dies per activar windows.

Solució trobada [via](http://shayandes.blogspot.com.es/2011/07/vmware-p2v-conversion-windows-xp.html).
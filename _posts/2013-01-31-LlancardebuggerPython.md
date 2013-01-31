---
title: Llançar el depurador en python
layout: post
author: David Pascual
category: python
tags: [python, debugger]
---

Per a posar un breakpoint i llançar el depurador en python simplement amb aquestes dues línies:

{% highlight python %}
import pdb

# Alla on volem posar el break point:
pdb.set_trace()
{% endhighlight %}

Fent açò ens apareixerà en la consola en la que hem llançat l'interpret de python una consola per traçar l'execució del programa, veure el contingut de les variables de l'entorn d'execució on hem posat el breakpoint, etc.

Simplement awesome.

Molt util per a debugejar aplicacionetes [Flask](http://flask.pocoo.org/)
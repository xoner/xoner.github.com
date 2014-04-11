---
title: Instal·lar les vmware tools en una maquina ubuntu server
author: David Pascual
layout: post
category: virtualització
tags: [vmware, workstar]
---

Per a instal·lar les vmware tools en un servidor linux headless basat en debian, cal seguir aquestos passos.


- Actualitzar el servidor

{% highlight bash %}
sudo apt-get update && sudo apt-get upgrade -y
# Reiniciar el sistema si cal
{% endhighlight %}

- Instal·lar els paquets necessaris per a compilar mòduls del nucli:

{% highlight bash %}
sudo apt-get -y install linux-headers-server build-essential
{% endhighlight %}

- Crear el punt de muntatge per al cdrom (si no existeix):

{% highlight bash %}
sudo mkdir /media/cdrom
{% endhighlight %}

- "Introduir" el CD de les vmware tools, des de el VMware Workstation sel·leccionar **Guest --> Install/Upgrade VMware Tools**.

- Muntar el cdrom:

{% highlight bash %}
sudo mount /dev/cdrom /media/cdrom
{% endhighlight %}

- Copiar el comprimit amb l'instal·lador al disc local:

{% highlight bash %}
cp /media/cdrom/VM*.tar.gz /tmp
{% endhighlight %}

- Entrar en el directori dels temporals.

{% highlight bash %}
cd /tmp
{% endhighlight %}

- Descomprimir l'instal·lador:

{% highlight bash %}
tar xzvf VM*.tar.gz
{% endhighlight %}

- Executar l'instal·lador:

{% highlight bash %}
sudo vmware-tools-distrib/vmware-install.pl -d
{% endhighlight %}

El flag -d autocontesta totes les preguntes amb la resposta per defecte

- Reiniciar:

{% highlight bash %}
sudo reboot
{% endhighlight %}

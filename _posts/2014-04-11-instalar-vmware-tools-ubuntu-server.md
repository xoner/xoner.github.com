---
title: Instal·lar les vmware tools en una maquina ubuntu server
author: David Pascual
layout: post
category: virtualització
tags: [vmware, workstar]
---

Per a instal·lar les vmware tools en un servidor linux headless basat en debian, cal seguir aqeustos passos.


1. Actualitzar el servidor

{% highlight bash %}
sudo apt-get update && sudo apt-get upgrade -y
# Reiniciar el sistema si cal
{% endhighlight %}

2. Instal·lar els paquets necesaris per a compilar mòduls del nucli:

{% highlight bash %}
sudo apt-get -y install linux-headers-server build-essential
{% endhighlight %}

3. Crear el punt de muntatge per al cdrom (si no existeix):

{% highlight bash %}
sudo mkdir /media/cdrom
{% endhighlight %}

4. "Introduir" el CD de les vmware tools, desde el VMware Workstation sel·leccionar **Guest --> Install/Upgrade VMware Tools**.

5. Muntar el cdrom:

{% highlight bash %}
sudo mount /dev/cdrom /media/cdrom
{% endhighlight %}

6. Copiar el comprimit amb l'instal·lador al disc local:

{% highlight bash %}
cp /media/cdrom/VM*.tar.gz /tmp
{% endhighlight %}

7. Entrar en el directori dels temporals.

{% highlight bash %}
cd /tmp
{% endhighlight %}

8. Descomprimir l'instal·lador:

{% highlight bash %}
$ tar xzvf VM*.tar.gz
{% endhighlight %}

9. Executar l'instal·lador:

{% highlight bash %}
sudo vmware-tools-distrib/vmware-install.pl -d
{% endhighlight %}

El flag -d autocontesta totes les preguntes amb la resposta per defecte

10. Reiniciar:

{% highlight bash %}
sudo reboot
{% endhighlight %}

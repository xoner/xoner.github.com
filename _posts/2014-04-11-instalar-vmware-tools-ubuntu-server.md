---
title: Instal·lar les vmware tools en una maquina ubuntu server
author: David Pascual
layout: post
category: virtualitzacio
tags: [vmware, workstar]
---

<div class="update">
    <strong>Update 2017-08-17:</strong> Afegida la forma standaritzada de instal·lar les vmware tools mitjançant open-vm-tools
</div>

### Ubuntu 16.04 i posteriors

Instal·lar les vmware tools és tan senzill com instal·lar el paquet `open-vm-tools`:

{% highlight bash %}
sudo apt install open-vm-tools
{% endhighlight %}

Si tenim una maquina amb escriptori també cal instal·lar el paquet `open-vm-tools-desktop` per a que també s'apliquen les millores a l'escriptori (millor rendiment driver pantalla, integracio ratolí/teclat, etc):

{% highlight bash %}
sudo apt install open-vm-tools open-vm-tools-desktop
{% endhighlight %}


<!--more-->
### Pre ubuntu 16.04


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

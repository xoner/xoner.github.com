---
title: Actualizar zabbix server de la version 4 a la version 5
author: David Pascual
category: zabbix
layout: post
tags: [zabbix, server, 4.0, 5.0, upgrade, actualización]
---

Recientemente he actualizado unas instalaciones de zabbix de la versión 4.0 a la 5.0 que mantengo. Una en un server ubuntu, una en un server debian y una en una raspberrypi, aqui dejo el proceso para actualizar el servidor de zabbix.

### Actualizar los repositorios

Simplemente seguir las instrucciones que hay en la [documentación](https://www.zabbix.com/download?zabbix=5.0&os_distribution=ubuntu&os_version=18.04_bionic&db=mysql&ws=apache), como si fueramos a instalar por primera vez zabbix, para el caso de un servidor ubuntu 18.04, por ejemplo, ejecutariamos:

```bash
wget https://repo.zabbix.com/zabbix/5.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_5.0-1+bionic_all.deb
sudo dpkg -i zabbix-release_5.0-1+bionic_all.deb
```

### Parar los servicios de zabbix

```bash
sudo systemctl stop zabbix-server
sudo systemctl stop zabbix-agent
```

### Actualizar los paquetes

En la documentación oficial se indica otro modo, pero simplemente si ejecutamos:

```bash
sudo apt update && sudo apt upgrade -y
```

funciona igualmente.

Durante la actualización nos preguntara que hacer con los ficheros de configuración `/etc/zabbix/zabbix_server.conf` y `/etc/zabbix/zabbix_agentd.conf`, si queremos conservar las versiones instaladas o instalar la versión que viene con el paquete, contestaremos que no (N, opción por defecto) para no perder la configuración del servidor.

**Nota** en raspbian, o raspberry OS como se llama ahora, la actualización marca como no necearios los paquetes *libapache2-mod-php libapache2-mod-php7.3 libsodium23 php7.3-cli php7.3-json php7.3-opcache php7.3-readline*, con lo que si ejecutamos un `sudo apt autoremove -y` se desinstalarán y el frontend de zabbix dejará de funcionar, hay que marcarlos como que són necesareos.

```bash
apt install libapache2-mod-php libapache2-mod-php7.3 libsodium23 php7.3-cli php7.3-json php7.3-opcache php7.3-readline -y
```

### Quitar error "Database history tables upgraded: No"

Una vez realizado el upgrade a la versión 5.0 en el dashboard principal, nos apaarecerá el mensaje de error **"Database history tables upgraded: No"**:

<div style="text-align:center" markdown="1">

<img alt="Error 'Database history tables upgraded: No'" src="/img/news/20200612/dbupgradefloat.png" class="img-fluid">

</div>

Para que este mensaje desaparezca tenemos que:

#### Descargar y pasar el patch 'double.sql'

```bash
wget https://git.zabbix.com/projects/ZBX/repos/zabbix/raw/database/mysql/double.sql
mysql -u'zabbix' -p zabbix < double.sql
```

**Nota:** Nos pedira el password del usuario de la base de datos zabbix.

#### Editar el fichero zabbix.conf.php

Tendremos que editar los contenidos del fichero `/etc/zabbix/web/zabbix.conf.php` y añadir la siguiente línea:

```php
$DB['DOUBLE_IEEE754'] = 'true';
```

### Notas finales

El proceso de actualización de los agentes zabbix en linux es muy similar al del servidor. Estoy trabajando en un playbook ansible para automatizar todo el proceso de actualizar los agentes de zabbix en linux.

### Enlaces

* [Proceso de actualización, documentación oficial](https://www.zabbix.com/documentation/current/manual/installation/upgrade/packages/debian_ubuntu)
* [Notas de actualización de la versión 5.0](https://www.zabbix.com/documentation/current/manual/installation/upgrade_notes_500#configuration_parameters)
* [Quitar error "Database history tables upgraded: No" en bestmonitoringtools.com](https://bestmonitoringtools.com/upgrade-zabbix-to-the-latest-version/#Step_6_Patch_DB_and_fix_warning_database_is_not_upgraded_to_use_double_precision_values)
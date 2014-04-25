---
title: Desplegar la configuració de seguretat de java a tots els usuaris d'una màquina
author: David Pascual
category: configuracions
layout: post
tldr: true
tags: [java, jre1.7u51, security]
---

Amb la versió 1.7u51 de java, oracle va donar un pas endavant en el tema de la seguretat, no permetent per defecte que els applets que no estiguen firmats ni els applets autofirmats s'executen en el nostre navegador. Encara que en l'anterior update de java ja s'advertia que aquest seria el comportament a partir de la pròxima versió i que calia començar a firmar els applets amb certificats reconeguts. Arribat el dia en que es publica aquest update, PEIM!!! una de les aplicacions web que utilitzem a diari, pertanyent a un proveïdor extern al qual paguem manteniment, continua utilitzant un applet autofirmat.

Com que això de fer les coses be no concorda amb l'estil patri, els certificat electrònics son molt cars [ironia, dolça ironia] l'empresa en compte de firmar el seu applet correctament ens imposa:

* Que baixem el nivell de seguretat d'*Alta* (per defecte) a *Media*.
* Afegir l'url de l'aplicació web a la llista d'excepcions de llocs web.

<div id="extended">&nbsp;</div>

Cosa que està molt be, i podria resumir-se amb aquesta conversa imaginaria:

- (Usuari) Ei que oracle ha tret una actualització de seguretat i la vostra aplicació no funciona. Caldria que firmareu el vostre applet.
- (Proveïdor) No em toques els collons, me la sua el que diga un grapat d'enginyers sobre seguretat. Desfés totes les millores de seguretat i a fer feina.

<div class="img-centered">
    <img src="/img/memes/are-you-serious.jpg" alt="Are you serious" title="Are you serious">
</div>

Com que estem terriblement lligats al servici que ens proporciona el proveïdor i sabent que el entrar en una discussió amb el proveïdor sobre que és el que s'ha de fer i que no sols allargaria el temps d'inactivitat dels usuaris sense treure res de trellat a la fi. Decidim començar a desplegar la configuració imposada pel proveïdor. Però al desplegar la configuració en els servidors RDS, ens trobem amb un problema: La configuració de seguretat de java es a nivell d'usuari i en els nostres servidors de terminal els usuaris tenen capat el accés al *Panel de Control* cosa que fa relativament complicada la configuració usuari a usuari.

[Buscant un poc per la xarxa](http://www.darkoperator.com/blog/2013/1/12/pushing-security-configuration-for-java-7-update-10-via-gpo.html) trobem un article que explica com gestionar la configuració de seguretat mitjançant GPOs. La idea principal es configurar un usuari amb el perfil de seguretat de java que volem i després copiar els següents fitxers:

* Fitxer amb els nivells de seguretat:
    - `%APPDATA%\LocalLow\Sun\Java\Deployment\deployment.properties` en Windows Vista o superior.
    - `%APPDATA%\Sun\Java\Deployment\deployment.properties` en Windows XP o Server 2003.
* Fitxer amb els llocs web de confiança:
    - `%APPDATA%\LocalLow\Sun\Java\Deployment\security\exception.sites` en Windows Vista o superior.
    - `%APPDATA%\Sun\Java\Deployment\security\exception.sites` en Windows XP o Server 2013.

En l'article s'utilitzen GPOs per a automatitzar el procés de còpia d'aquestos fitxers, però com que el tema de les GPOs el tenim un poc "parat", en la nostra infraestructura hem d'utilitzar mètodes més tradicionals. Per facilitar el procés de còpia d'aquestos fitxers, sobretot en entorns de Remote Desktop, s'ha desenvolupat aquest xicotet script en powershell per automatitzar el procés de còpia, el qual busca en el directori on es troben els perfils d'usuari perfils que tinguen el directori de configuració de Java i copia la configuració de seguretat de l'usuari que executa l'script.

<script src="https://gist.github.com/xoner/10970093.js"></script>

Aixi si com a administrador actualitzem java, configurem el nivell de seguretat i els llocs web permesos i després executem l'script tindrem una configuració homogènia per a tots els usuaris.
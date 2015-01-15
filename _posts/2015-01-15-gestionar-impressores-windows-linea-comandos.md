---
title: Gestionar impressores des de la línea de comandaments en windows
author: David Pascual
category: windows
layout: post
tags: [windows, cmd, impressores]
---

Es poden afegir impressores en Windows des de la línia de comandaments (cmd) mitjançant la 'utilitat' `rundll32 printui.dll,PrintUIEntry`.

### Exemples d'utilització

Afegir impressora per a tots els usuaris de una màquina:

	rundll32 printui.dll PrintUIEntry /ga /n\\machine\printer

Eliminar impressora instal·lada per a tots els usuaris:

	rundll32 printui.dll PrintUIEntry /gd /n\\machine\printer

Instal·lar impressora sols per a un usuari:

	rundll32 printui.dll PrintUIEntry /in /n\\machine\printer

Eliminar impressora instal·lada sols per a un usuari:

	rundll32 printui.dll PrintUIEntry /dn /n\\machine\printer

### Sintaxi completa del comandament

	RUNDLL32 PRINTUI.DLL,PrintUIEntry [ options ] [ @commandfile ]
	
	/a[file] 	binary file name
	/b[name] 	base printer name
	/c[name] 	unc machine name if the action is on a remote machine
	/dl 	delete local printer
	/dn 	delete network printer connection
	/dd 	delete printer driver
	/e 	display printing preferences
	/f[file] 	either inf file or output file
	/ga 	add per machine printer connections
	/ge 	enum per machine printer connections
	/gd 	delete per machine printer connections
	/h[arch] 	driver architecture, one of the following:
	Alpha | Intel | Mips | PowerPC
	/ia 	install printer driver using inf file
	/id 	install printer driver using add printer driver wizard
	/if 	install printer using inf file
	/ii 	install printer using add printer wizard with an inf file
	/il 	install printer using add printer wizard
	/in 	add network printer connection
	/j[provider] 	print provider name
	/k 	print test page to specified printer, cannot be combined with command when installing a printer
	/l[path] 	printer driver source path
	/m[model] 	printer driver model name
	/n[name] 	printer name
	/o 	display printer queue view
	/p 	display printer properties
	/q 	quiet mode, do not display error messages
	/r[port] 	port name
	/s 	display server properties
	/Ss 	Store printer settings into a file
	/Sr 	
	
	Restore printer settings from a file
  		Store or restore printer settings option flags that must be placed at the end of command:
	  	2 	PRINTER_INFO_2
	  	7 	PRINTER_INFO_7
	  	c 	Color Profile
	  	d 	PrinterData
	  	s 	Security descriptor
	  	g 	Global DevMode
	  	m 	Minimal settings
	  	u 	User DevMode
	  	r 	Resolve name conflicts
	  	f 	Force name
	  	p 	Resolve port
	/u 	use the existing printer driver if it's already installed
	/t[#] 	zero based index page to start on
	/v[version] 	driver version, one of the following:
	Windows 95 or 98 | Windows NT 3.1 | Windows NT 3.5 or 3.51 | Windows NT 3.51 | Windows NT 4.0 | Windows NT 4.0 or 2000 | Windows 2000
	/w 	prompt the user for a driver if specified driver is not found in the inf
	/y 	set printer as the default
	/Xg 	get printer settings
	/Xs 	set printer settings
	/z 	do not auto share this printer
	/Z 	share this printer, can only be used with the /if option
	/? 	help this message
	@[file] 	command line argument file
---
title: Crear galería de imágenes a partir de un conjunto estructurado de pdfs
author: David Pascual
category: programming
layout: post
tags: [pdf, imagenes, galeria, images, gallery]
---

Hace poco me pasaron un tochaco de pdfs para publicar en la pagina web, escaneos de diferentes publicaciones anuales. Por suerte la info venia ya estructurada de la siguiente forma:

```text
.
├── 1942
│   └── 1942.pdf
├── 1944
│   └── 1944.pdf
├── 1945
│   └── 1945.pdf
.
.
.
└── 1985
    └── 1985.pdf
```

Automáticamente pensé que la mejor opción para publicarlo seria una galería con la portada de cada publicación enlazando al pdf de la publicación y que con el poder unix/linux seria una tarea sencilla el poder generar los thumbnais de las portadas de las publicaciones.

En este articulo veremos el proceso para generar esta galería a partir de un conjunto de pdfs.

### Prerequisitos

Necesitaremos una maquina linux (en nuestro caso una ubuntu 20.04) con las utilidades `pdftk`, `convert` y `mogrify` todas ellas presentes en los paquetes **imagemagick** y **pdftk**. Para instalarlas simplemente ejecutaremos.

```text
sudo apt install imagemagick pdftk -y
```

### Extraer la portada de cada pdf

El primer paso es extraer la primera pagina de cada pdf, que contiene la portada de la publicación, en un archivo a parte, si ejecutamos sobre un fichero pdf

```text
pdftk pdf-origen.pdf cat 1 output pdf-orinen-front.pdf
```

nos generara un pdf nuevo con solo la primera pagina del original.

Para hacerlo sobre todos los pdf presentes en la estructura de en la estructura de directorios y ficheros que hemos visto antes, ejecutaremos la siguiente secuencia de comandos en la carpeta pricipal que contiene todas las carpetas con los pdfs.

```text
find . -iname "*.pdf" | xargs -I{} echo "{}" | sed 's/\.pdf//g' | xargs -I{} pdftk "{}.pdf" cat 1 output "{}-front.pdf"
```

Ahora pasamos a destripar un poco este *oneliner*:

* `find . -iname "*.pdf"`: Nos encontrará todos los archivos pdfs presentes en la carpeta y subcarpetas.
* `xargs -I{} echo "{}" | sed 's/\.pdf//g'`: elimina la extensión pdf de la ruta del archivo para asi poder trabajar con el nombre del archivo mejor, se introduce `xargs -I{} echo "{}"` antes de quitar el **.pdf** de la cadena con sed por que si se le hace el pipe desde el find directamente a sed, sed busca y substituye **.pdf** en el contenido del fichero y empieza a escupir un churro de caracteres (el contenido del pdf) en pantalla.
* `xargs -I{} pdftk "{}.pdf" cat 1 output "{}-front.pdf"`: se genera un pdf a partir del existente con solo la primera pagina del pdf original, en la carpeta donde teniamos el pdf original cuyo nombre es *[nombre_pdf]-front.pdf*.

Una vez ejecutado este *oneliner* nos quedara una estructura de carpetas y contenido como la siguiente:

```text
.
├── 1942
│   ├── 1942-front.pdf
│   └── 1942.pdf
├── 1944
│   ├── 1944-front.pdf
│   └── 1944.pdf
├── 1945
│   ├── 1945-front.pdf
│   └── 1945.pdf
.
.
.
```

### Convertir la portada a imagen

El siguiente paso es convertir el pdf que tenemos con la portada en una imagen, ejecutando lo siguiente:

```text
convert 1942.pdf 1942.jpg
```

conseguiremos que nuestro pdf con la portada se convierta en un jpg.

Para hacerlo sobre todas las portadas que hemos extraido en el paso anterior, ejecutaremos:

```text
find . -name "*-front.pdf" | xargs -I{} echo "{}" | sed 's/\.pdf//g' | xargs -I{} convert "{}.pdf" "{}.jpg"
```

Destripando este oneliner tenemos que:

* `find . -name "*-front.pdf"`: nos encuentra todos los achivos pdfs con las portadas que hemos generado en el paso anterior.
* `xargs -I{} echo "{}" | sed 's/\.pdf//g'`: elimina la extensión pdf de la ruta del archivo, al igual que en la seccion anterior se usa el truquete del **echo** para que sed no trabaje sobre el contenido del fichero.
* `xargs -I{} convert "{}.pdf" "{}.jpg"`: convierte el pdf con la portada a una imagen jpg 

una vez ejecutado tendremos una estructura de carpetas y contenido como la siguiente:

```text
.
├── 1942
│   ├── 1942-front.jpg
│   ├── 1942-front.pdf
│   └── 1942.pdf
├── 1944
│   ├── 1944-front.jpg
│   ├── 1944-front.pdf
│   └── 1944.pdf
├── 1945
│   ├── 1945-front.jpg
│   ├── 1945-front.pdf
│   └── 1945.pdf
.
.
.
```

#### Corregir error imagemagick

Al ejecutar el comando convert en ubuntu 20.04, nos aparecerá el siguiente error:

```text
onvert-im6.q16: no images defined `./1977/1977-front.jpg' @ error/convert.c/ConvertImageCommand/3258.
convert-im6.q16: attempt to perform an operation not allowed by the security policy `PDF' @ error/constitute.c/IsCoderAuthorized/408.
```

Para solventarlo hay que aplicar lo que se dice en el siguiente [hilo de stackoverflow](https://stackoverflow.com/questions/52998331/imagemagick-security-policy-pdf-blocking-conversion) y cambiar en el fichero `/etc/ImageMagick-6/policy.xml` la siguiente línea:

```diff
-<policy domain="coder" rights="none" pattern="PDF" />
+<policy domain="coder" rights="read | write" pattern="PDF" />
```


### Eliminar pdf de la portada

Ahora que ya tenemos la imagen, los pdf donde hemos extraido la portada en el primer paso ya no nos interesan, podemos deshacernos de ellos ejecutando

```text
find . -name "*-front.pdf" -delete
```

una vez ejecutado nos quedara la estructura de carpetas y contenido del siguiente modo:

```text
.
├── 1942
│   ├── 1942-front.jpg
│   └── 1942.pdf
├── 1944
│   ├── 1944-front.jpg
│   └── 1944.pdf
├── 1945
│   ├── 1945-front.jpg
│   └── 1945.pdf
.
.
.
```

### Reducir tamaño de la imagen y normalizarla como thumbnail

El conjunto de imágenes generadas contiene tanto imagenes apaisadas como imagenes horizontales, ademas el tamaño de estas es mejorable para que el el tiempo de carga de la pagina sea mas optimo.

Por ejemplo, tenemos la siguiente imagen `1942-front.jpg` que nos ocupa 148KB:

```text
 ls -lh
total 32M
-rw-rw-r--  1 david david 148K abr  7 09:32 1942-front.jpg
-rw-r--r--  1 david david  32M dic 18 10:42 1942.pdf
```

Si ejecutamos:

```text
mogrify -resize 242x200 -background white -gravity center -extent 242x200 -format jpg -quality 75 1942-front.jpg
```

nos generara un thumbnail a partir de la imagen que:

* tiene una tamaño de 242px x 200px: `-extent 242x200`
* la imagen original se ajustara al tamaño 242x200, `-resize 242x200`
* la imagen original aparecera centrada dentro del thumbnail: `-gravity center`
* se rellerara lo que no ocupe la imagen original con el color blanco: `-background white`
* nos generara un jpg con una calidad un 25% inferior al original: `-format jpg -quality 75`

con lo que despues de ejecutar este comando obtendremos un thumbnail que nos ocupa 11KB (una reduccion del 93%):

```text
s -lh
total 32M
-rw-rw-r-- 1 david david 11K abr  7 09:37 1942-front.jpg
-rw-r--r-- 1 david david 32M dic 18 10:42 1942.pdf
```

Para conseguir un thumbnail de todas las imagenes que hemos conseguido en los passos anteriores ejecutaremos:

```text
find . -name "*-front.jpg" | xargs -I{} mogrify -resize 242x200 -background white -gravity center -extent 242x200 -format jpg -quality 75 "{}"
```


### Mostrar las imagenes en el navegador

Con el siguiente snippet en php conseguiremos que nos pinte la galeria en el navegador a partir de la estructura de carpetas y contenido que tenemos.

```php
<?php foreach(glob($_SERVER['DOCUMENT_ROOT'].'/path/directorio/pdfs/*/*.pdf') as $pdfFile) : ?>
<?php
    $path_parts = pathinfo($pdfFile);
    $html_base_path = str_replace($_SERVER['DOCUMENT_ROOT'], "", $path_parts['dirname']);
    $pdf_path = $html_base_path."/".$path_parts['basename'];
    $image_path = $html_base_path."/".$path_parts['filename']."-front.jpg";
?>

<div class="col-sm-6 col-md-4">
    <a href="<?=$pdf_path?>">
      <div class="thumbnail">
        <img src="<?=$image_path?>" alt="Llibre Festes <?=$path_parts['filename']?>">
        <div class="caption" style="text-align:center">
          <h3>Llibre Festes <?=$path_parts['filename']?></h3>
        </div>
      </div>
    </a>
  </div>
<?php endforeach ?>
```

Esto nos pintará una galería como la de la siguiente imagen:

<div style="margin:0 auto; text-align:center" markdown="1">
![galeria](/img/news/202104070857/vista-galeria.png)
</div>

Tambien podeis ver el resultado en [vivo](https://www.pego.org/serveis/cultura/llibres-festes/).
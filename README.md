![GitHub Logo](/addons/images/icono-Oscuro.png)

# Información sobre Purchase

Puchase es una aplicación de búsquedas en varias API y proyecto de clase realizado por:

**Alejandro José Cordero Gutiérrez**
**Eduardo Rodríguez Carballo**
**Armando Sánchez Suárez**

## Objetivos del proyecto

Con este proyecto, Purchase pretende conseguir los siguientes objetivos:

* Poder buscar por categorías y subcategorías en las API de Walmart, e eBay
* Presentar los resultados en una misma lista y diferenciar la tienda de la que provengan
* Incluir un sistema de login a la página usando diferentes sistemas de logueo:
 * GitHub
 * Facebook
 * Google
 * Twitter

También se ha preparado diferentes maneras de las que se pueda acceder a la documentación, ejecución y presentación:

Link al Prezi:
Link a gitHub pages: https://sansaur.github.io/equipoTrabajoDEW/
Link a la documentación JSDoc: https://drive.google.com/open?id=1H5Xe9HrlHlKELD640Y73p2rjOkDh8N5H

## Herramientas usadas

API de búsquedas Walmart: https://developer.walmartlabs.com/
API de búsquedas de eBay: https://go.developer.ebay.com/
API de "Personas" y "Autenticación" de Google: https://console.developers.google.com/apis?project=dew06-t02
API de aplicaciones con autenticación de Twitter: https://apps.twitter.com
Firebase (Usado para linkear la autenticación de Twitter): https://console.firebase.google.com
API de aplicaciones de Facebook: https://developers.facebook.com
API de desarrolladores de GitHub: https://github.com/settings/developers
simplePagination: http://flaviusmatis.github.io/simplePagination.js/
jQuery: https://jquery.com/
React: https://reactjs.org/
Slack: https://pruebasslackespacio.slack.com
Trello: https://trello.com/b/0bSrWBXK/tareas-del-equipo-de-dew

*Lenguajes de código:* HTML, CSS, JavaScript.

## Estructura del proyecto

* **public_html**: Tenemos la página principal index.html y la página de login.html
 * **Styles**: Aquí tenemos los estilos en cascada CSS
 * **Addons**: En esta carpeta se guardan los recursos a usar, como imágenes o gráficos vectoriales.
 * **Apuntes**: En esta carpeta hemos guardado los apuntes iniciales del proyecto como un archivo de texto
 * **ejemplos_Webs**: Contiene unas cuantas páginas HTML cuyo único servicio es demonstrar como debería usarse cada API
 * **js**: Aquí tenemos los archivos de código JavaScript
  * **frontend**: Contiene los arhivos de JS que se encargan del montaje en la página por medio de React
  * **backend**: Contiene archivos que guardan datos, asociaciones, y objetos para acceder a las APIs usadas en el proyecto
  * **libs**: Contiene las librerías que se han usado en el proyecto
  
## Anotaciones

> La API está preparada para también poder usar filtros de ordenación
> sin embargo, debido a la falta de tiempo, no fueron implementados.



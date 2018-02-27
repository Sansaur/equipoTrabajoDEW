// URL Con documentación sobre todo este rollo: https://developer.ebay.com/Devzone/finding/CallRef/index.html
/*
 * Este array contiene los objetos JSON definidos en asociacionCategorias, para poder recibir el valor algo tal que así:
 * 
 * filtrosCategoria["Electronicos"]["Walmart"]
 * @type Array
 */
var filtrosCategoria = [];

$.getJSON("../js/backend/asociacionCategorias.json", function (data) {
    $.each(data, function (key, val) {
        filtrosCategoria[key] = val;
    });
    console.warn(filtrosCategoria);
    console.warn("Cargados los filtros de categoría, ejemplo, dime el filtro de eBay de deportes: " + filtrosCategoria["Deportes"].eBay);
});

//Array de filtros que vayamos a usar. Tienen uso en buildURLArray()
var filterarray = [];
// Variable que se le añade a la URL para aplicar los filtros, se construye en buildURLArray
var urlfilter = "";

/**
 * Función de pruebas.
 * @returns {undefined}
 */
function addFiltro() {
    construirFiltros($('#nombreFiltro').val(), $('#valorFiltro').val());
}
/**
 *  A esta función se le envían los filtros de uno en uno.
 *  Luego se construye el array de filtros, y se pasa para construir la URL con filtros
 * @returns {undefined}
 */
function construirFiltros(nombre, valor) {
    var nuevoObjeto = {
        name: nombre,
        value: valor
    };
    for (var i in filterarray) {
        if (filterarray[i].name === nuevoObjeto.name) {
            filterarray[i].value = nuevoObjeto.value;
			console.log(filterarray);
            return;
        }
    }
    filterarray.push(nuevoObjeto);
    console.log(filterarray);
    // Construimos la URL con los filtros.
    buildURLArray(filterarray);
}

/**
 * Esta función construye la variable urlfilter a partir de los objetos en el array de filtros
 * @returns {undefined}
 */
function  buildURLArray() {
    // Limpiamos UrlFilter
    urlfilter = "";
    // Pasamos por cada filtro
    for (var i = 0; i < filterarray.length; i++) {
        // Cogemos el objeto al que apunte el filtro
        var itemfilter = filterarray[i];
        // Por cada parámetro del objeto...
        for (var index in itemfilter) {
            // ... Revisamos si tienen valor
            if (itemfilter[index] !== "") {
                // ... Comprobamos si es un Array
                // Si es un array, hacemos iteración por cada uno de sus valores y los añadimos a urlfilter
                if (itemfilter[index] instanceof Array) {
                    for (var r = 0; r < itemfilter[index].length; r++) {
                        var value = itemfilter[index][r];
                        urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
                    }
                }
                // Si no, urlfilter será rellenada con el valor de por si.
                else {
                    urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                }
            }
        }
    }

    console.log("URL de filtros:" + urlfilter);
}

// Esta es la URL completa que se usará para contactar con la API de eBay.
var url = "";
/**
 * Limite de numero de resultados = 100
 * 
 * @param {type} parametro
 * @param {type} numeroResultados
 * @param {type} numeroPagina
 * @returns {undefined}
 */
function buscarPorClave(parametro, numeroResultados, numeroPagina) {
    // Qué operación vamos a realizar.
    url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    // Nuestra Application Key
    url += "&SECURITY-APPNAME=ArmandoS-equipoTr-PRD-d5d80d3bd-e53316c1";
    // Nos vamos a conectar a los servidores de españa de eBay.
    url += "&GLOBAL-ID=EBAY-ES";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    // Tendremos que cambiar las palabras claves
    parametro.replace(' ', '%20');
    url += "&keywords=" + parametro;
    url += "&paginationInput.entriesPerPage=" + numeroResultados;
    url += "&paginationInput.pageNumber=" + numeroPagina;
    url += "&outputSelector=SellerInfo";
    // Añadimos nuestros filtros.
    url += urlfilter;
    peticionAJAX("findItemsByKeywordsResponse");
}
function busquedaPorClaveYCategoria(parametro, categoria, numeroResultados, numeroPagina) {
    // Qué operación vamos a realizar.
    url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsAdvanced";
    url += "&SERVICE-VERSION=1.0.0";
    // Nuestra Application Key
    url += "&SECURITY-APPNAME=ArmandoS-equipoTr-PRD-d5d80d3bd-e53316c1";
    // Nos vamos a conectar a los servidores de españa de eBay.
    url += "&GLOBAL-ID=EBAY-ES";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    // Tendremos que cambiar las palabras claves
    parametro.replace(' ', '%20');
    url += "&keywords=" + parametro;
    url += "&categoryId=" + categoria;
    url += "&paginationInput.entriesPerPage=" + numeroResultados;
    url += "&paginationInput.pageNumber=" + numeroPagina;
    url += "&outputSelector=SellerInfo";
    // Añadimos nuestros filtros.
    url += urlfilter;
    return peticionAJAX("findItemsAdvancedResponse");
}



// Aquí realizamos la llamada a la URL construida previamente, en el success pondremos la generación de datos.
function peticionAJAX(tipoOperacion) {
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        success: function (response) {
            return transformarRespuesta(response, tipoOperacion);
        },
        complete: function () {

        },
        error: function (error, codigo, algo) {
            console.error(error);
            console.error(codigo);
            console.error(algo);
        }
    });
}

function transformarRespuesta(response, tipoOperacion) {
    var arrayObjetosRetorno = [];
    // response['findItemsByKeywordsResponse'][0].searchResult[0].item
    for (var i in response[tipoOperacion][0].searchResult[0].item) {
        var objetoActual = response[tipoOperacion][0].searchResult[0].item[i];
        console.log(objetoActual);
        var nuevoObjeto = {
            id: objetoActual.itemId ? objetoActual.itemId[0] : null, // Si no tiene ID ponemos null para que sea más fácil
            nombre: objetoActual.title ? objetoActual.title[0] : null,
            descripcionCorta: null, // eBay tiene las descripciones en un sitio diferente a los objetos, parece ser que se tiene que usar la SHOPPING API, nosotros usamos la FINDING API
            descripcion: null,
            imagenGrande: objetoActual.galleryPlusPictureURL ? objetoActual.galleryPlusPictureURL[0] : null, // Sustituir esto por una imagen placeholder
            imagen: objetoActual.galleryURL[0] ? objetoActual.galleryURL[0] : null,
            id_categoria: objetoActual.primaryCategory[0].categoryId ? objetoActual.primaryCategory[0].categoryId[0] : null, // Cogemos la ID de categoría porque las que vienen de Walmart están en ingles, las traducimos nostoros
            marca: objetoActual.sellerInfo ? objetoActual.sellerInfo[0].sellerUserName[0] : null, // eBay no da marcas, pero da vendedores.
            puntuacion: objetoActual.sellerInfo ? objetoActual.sellerInfo[0].positiveFeedbackPercent[0] : null, // eBay da un porcentaje de satisfacción.
            // Cambiamos el precio aquí.
            precio: objetoActual.sellingStatus[0].currentPrice[0] ? traducirPrecio(objetoActual.sellingStatus[0].currentPrice[0]['__value__'], objetoActual.sellingStatus[0].currentPrice[0]['@currencyId']) : 0,
            // ATENCIÓN, EBAY DEVUELVE "ACTIVE" O "INACTIVE"
            stock: objetoActual.sellingStatus[0].sellingState ? objetoActual.sellingStatus[0].sellingState[0] : null
        };
        arrayObjetosRetorno.push(nuevoObjeto);
    }
    console.warn(arrayObjetosRetorno);
    return arrayObjetosRetorno;
}
function traducirPrecio(precio, moneda) {
    let p = parseInt(precio);
    switch (moneda) {
        case "GBP":
            return (p * 1.13589).toFixed(2);
        case "EUR":
            return p;
        case "USD":
            return (p * 0.81331891).toFixed(2);
        case "PHP":
            return (p * 0.0156936).toFixed(2);
        case "AUD":
            return (p * 0.638016).toFixed(2);
        default:
             return p.toFixed(2);
    }
}

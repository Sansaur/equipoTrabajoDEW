// URL Con documentación sobre todo este rollo: https://developer.ebay.com/Devzone/finding/CallRef/index.html
/*
 * Este array contiene los objetos JSON definidos en asociacionCategorias, para poder recibir el valor algo tal que así:
 * 
 * filtrosCategoria["Electronicos"]["Walmart"]
 * @type Array
 */
var filtrosCategoria = [];

$.getJSON("js/backend/asociacionCategorias.json", function (data) {
    $.each(data, function (key, val) {
        filtrosCategoria[key] = val;
    });
    console.warn(filtrosCategoria);
    console.warn("Cargados los filtros de categoría, ejemplo, dime el filtro de eBay de deportes: " + filtrosCategoria["Deportes"].eBay);
});

//Array de filtros que vayamos a usar. Tienen uso en buildURLArray()
var filterarray = [];
// Variable que se le añade a la URL para aplicar los filtros, se construye en buildURLArray
var url2filter = "";

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
		buildURLArray(filterarray);
		
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
 * Esta función construye la variable url2filter a partir de los objetos en el array de filtros
 * @returns {undefined}
 */
function  buildURLArray() {
    // Limpiamos UrlFilter
    url2filter = "";
    // Pasamos por cada filtro
    for (var i = 0; i < filterarray.length; i++) {
        // Cogemos el objeto al que apunte el filtro
        var itemfilter = filterarray[i];
        // Por cada parámetro del objeto...
        for (var index in itemfilter) {
            // ... Revisamos si tienen valor
            if (itemfilter[index] !== "") {
                // ... Comprobamos si es un Array
                // Si es un array, hacemos iteración por cada uno de sus valores y los añadimos a url2filter
                if (itemfilter[index] instanceof Array) {
                    for (var r = 0; r < itemfilter[index].length; r++) {
                        var value = itemfilter[index][r];
                        url2filter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
                    }
                }
                // Si no, url2filter será rellenada con el valor de por si.
                else {
                    url2filter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                }
            }
        }
    }

    console.log("URL de filtros:" + url2filter);
}

// Esta es la URL completa que se usará para contactar con la API de eBay.
var url2 = "";
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
    url2 = "http://svcs.ebay.com/services/search/FindingService/v1";
    url2 += "?OPERATION-NAME=findItemsByKeywords";
    url2 += "&SERVICE-VERSION=1.0.0";
    // Nuestra Application Key
    url2 += "&SECURITY-APPNAME=ArmandoS-equipoTr-PRD-d5d80d3bd-e53316c1";
    // Nos vamos a conectar a los servidores de españa de eBay.
    url2 += "&GLOBAL-ID=EBAY-ES";
    url2 += "&RESPONSE-DATA-FORMAT=JSON";
    url2 += "&REST-PAYLOAD";
    // Tendremos que cambiar las palabras claves
    parametro.replace(' ', '%20');
    url2 += "&keywords=" + parametro;
    url2 += "&paginationInput.entriesPerPage=" + numeroResultados;
    url2 += "&paginationInput.pageNumber=" + numeroPagina;
    url2 += "&outputSelector=SellerInfo";
    // Añadimos nuestros filtros.
    url2 += url2filter;
    peticionAJAX("findItemsByKeywordsResponse");
}
function busquedaPorClaveYCategoria(parametro, categoria, numeroResultados, numeroPagina) {
    // Qué operación vamos a realizar.
    url2 = "http://svcs.ebay.com/services/search/FindingService/v1";
    url2 += "?OPERATION-NAME=findItemsAdvanced";
    url2 += "&SERVICE-VERSION=1.0.0";
    // Nuestra Application Key
    url2 += "&SECURITY-APPNAME=ArmandoS-equipoTr-PRD-d5d80d3bd-e53316c1";
    // Nos vamos a conectar a los servidores de españa de eBay.
    url2 += "&GLOBAL-ID=EBAY-ES";
    url2 += "&RESPONSE-DATA-FORMAT=JSON";
    url2 += "&REST-PAYLOAD";
    // Tendremos que cambiar las palabras claves
    parametro.replace(' ', '%20');
    url2 += "&keywords=" + parametro;
    url2 += "&categoryId=" + categoria;
    url2 += "&paginationInput.entriesPerPage=" + numeroResultados;
    url2 += "&paginationInput.pageNumber=" + numeroPagina;
    url2 += "&outputSelector=SellerInfo";
    // Añadimos nuestros filtros.
    url2 += url2filter;
    return peticionAJAX("findItemsAdvancedResponse");
}



// Aquí realizamos la llamada a la URL construida previamente, en el success pondremos la generación de datos.
function peticionAJAX(tipoOperacion) {
    console.warn(url2);
    $.ajax({
        url: url2,
        jsonp: "callback",
        dataType: "jsonp",
        success: function (response) {
            console.warn(response);
            construccion(transformarRespuesta(response, tipoOperacion));
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
            imagenGrande: objetoActual.galleryPlusPictureURL ? objetoActual.galleryPlusPictureURL[0] : null, // Sustituir esto por una imagen placeholder
            imagen: objetoActual.galleryURL[0] ? objetoActual.galleryURL[0] : null,
            id_categoria: objetoActual.primaryCategory[0].categoryId ? objetoActual.primaryCategory[0].categoryId[0] : null, // Cogemos la ID de categoría porque las que vienen de Walmart están en ingles, las traducimos nostoros
            marca: objetoActual.sellerInfo ? objetoActual.sellerInfo[0].sellerUserName[0] : null, // eBay no da marcas, pero da vendedores.
            puntuacion: objetoActual.sellerInfo ? objetoActual.sellerInfo[0].positiveFeedbackPercent[0] : null, // eBay da un porcentaje de satisfacción.
            // Cambiamos el precio aquí.
            precio: objetoActual.sellingStatus[0].currentPrice[0] ? traducirPrecio(objetoActual.sellingStatus[0].currentPrice[0]['__value__'], objetoActual.sellingStatus[0].currentPrice[0]['@currencyId']) : 0,
            // ATENCIÓN, EBAY DEVUELVE "ACTIVE" O "INACTIVE"
            stock: objetoActual.sellingStatus[0].sellingState ? objetoActual.sellingStatus[0].sellingState[0] : null,
            descripcionCorta: "Este es un objeto de eBay, su nombre es: "+objetoActual.title[0]+"", // eBay tiene las descripciones en un sitio diferente a los objetos, parece ser que se tiene que usar la SHOPPING API, nosotros usamos la FINDING API
            descripcion: null,
            tienda: "eBay"
        };
        let estado = objetoActual.condition ? objetoActual.condition[0].conditionDisplayName[0] : "desconocido";
        var DESC = "Este es un objeto de eBay para pagar por él " + objetoActual.autoPay[0] ? "se permite auto-pago" : "no se permite auto-pago,  ";
        DESC += "se encuentra en estado: "+ estado + " y se encuentra a la venta en "+ objetoActual.location ? objetoActual.location[0] : "algún sitio ";
        DESC += "para pagar por el se usa "+ objetoActual.paymentMethod[0] + " y el objeto pertenece a la categoría " + objetoActual.primaryCategory[0].categoryName[0];
        nuevoObjeto.descripcion = DESC;
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
        case "CAD":
            return (p * 0.638636792).toFixed(2);
        case "CHF":
            return (p * 0.86717168).toFixed(2);
        case "HKD":
            return (p * 0.104741058).toFixed(2);
        case "INR":
            return (p * 0.0125761414).toFixed(2);
        case "PLN":
            return (p * 0.23888).toFixed(2);
        default:
             return p.toFixed(2);
    }
}

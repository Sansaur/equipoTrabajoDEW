const API_KEY = "rfpejk24jysvvba6u9gftq6a";
/**
 * ids es OBLIGATORIO, si no, hace return null.
 * Se le envía IDS de productos y termina retornando el resultado de la cadena this() -> peticionAJAX() -> transformarRespuesta()
 * Esta es la función para la búsqueda de objetos específicos.
 * @param {Array} ids
 * @returns Array
 */
function productLookup(ids) {
    var url = "http://api.walmartlabs.com/v1/items";
    url += "?apiKey=" + API_KEY;
    if (!ids) {
        return null;
    } else {
        url += "&ids=";
        for (var i = 0; i < ids.length; i++) {
            if (i === ids.length) {
                alert("A");
                url += ids[i];

            } else {
                url += ids[i] + ",";
            }
        }
        console.log(url);
        return peticionAJAX(url);
    }
}
/**
 * LA FUNCIÓN IMPORTANTE
 * 
 * QUERY ES OBLIGATORIA (A ver como vamos a meter eso)
 * 
 * categoryId es la categoría por donde vamos a buscar.
 * start es el número de respuestas que se salta empezando desde 0 (para el paginado)
 * sort es la manera de la que las respuestas se ordenarán (ver las elecciones en el ejemplo de Walmart)
 * order es la manera de la que se ordena el sort (ascendiente o descendiente)
 * numItems es cuantos objetos deberán mostrarse (hasta un máximo de 25)
 * @param {type} query
 * @param {type} categoryId
 * @param {type} start
 * @param {type} sort
 * @param {type} order
 * @param {type} numItems
 * @returns {undefined}
 */
function search(query, categoryId, start, sort, order, numItems) {
    var url = "http://api.walmartlabs.com/v1/search";
    url += "?apiKey=" + API_KEY;
    if (!query) {
        return null;
    } else {
        url += "&query=" + query;
        if (categoryId) {
            url += "&categoryId=" + categoryId;
        }
        if (start) {
            url += "&start=" + start;
        }
        if (sort) {
            url += "&sort=" + sort;
        }
        if (order) {
            url += "&order=" + order;
        }
        if (numItems) {
            url += "&numItems" + numItems;
        }
        console.log(url);
        return peticionAJAX(url);
    }
}

function pruebaProductLookup(){
    var valor = $('#Ids').val();
    console.log(valor);
    valor = pasarValorANumeros(valor);
    console.log(valor);
    productLookup(valor);
}

function pruebaSearch(){
    var Id = $('#category').val();// SOLO SE PERMITE UNA ID AQUI
    let query = $('#query').val();
    let start = parseInt($('#start').val());
    let number = parseInt($('#number').val());
    let sort = $('#sort').val();
    let order = $('#order').val();
    console.log(Id);
    search(query,Id,start,sort,order,number);
}
function pasarValorANumeros(valor){
    valor = valor.split(',');
    let arrayNumeros = [];
    for(var i in valor){
        arrayNumeros.push(parseInt(valor[i]));
    }
    return arrayNumeros;
}

/*
 * No usar esto, no devuelve JSONP
 * 
function busquedaPaginada(category, brand) {
    var url = "http://api.walmartlabs.com/v1/paginated/items";
    url += "?apiKey=" + API_KEY;
    if (category) {
        url += "&categoryId=" + category;
    }
    if (brand) {
        url += "&start=" + brand;
    }
    console.log(url);
    return peticionAJAX(url);
}
*/

/**
 * Esta función se encarga de usar la URL que construimos en otras funciones de petición a las APIs para hacerlas pasar por AJAX
 * @param {String} url
 * @returns {undefined}
 */
function peticionAJAX(url) {
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        success: function (response) {
            console.log("Respuesta incial");
            console.log(response);
            return transformarRespuesta(response);
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
/**
 * Esta función transforma el array de objetos de la respuesta de la petición AJAX en un array de objetos normalizados para nuestro uso.
 * @param {Object} response
 * @returns {Array|transformarRespuesta.arrayObjetosRetorno}
 */
function transformarRespuesta(response) {
    var arrayObjetosRetorno = [];
    for (var i in response.items) {
        console.log(response.items[i]);
        let objetoActual = response.items[i];
        // Valores que considero que pueden ser importantes
        var nuevoObjeto = {
            id: objetoActual.itemId ? objetoActual.itemId : null,
            nombre: objetoActual.name ? objetoActual.name : "No tiene nombre",
            descripcionCorta: objetoActual.shortDescription ? objetoActual.shortDescription : "No tiene descripción corta",
            descripcion: objetoActual.longDescription ? objetoActual.longDescription : "No tiene descripción larga",
            imagenGrande: objetoActual.largeImage ? objetoActual.largeImage : "sin_imagen.jpg", // Sustituir esto por una imagen placeholder
            imagen: objetoActual.mediumImage ? objetoActual.mediumImage : "sin_imagen.jpg",
            id_categoria: objetoActual.categoryNode ? objetoActual.categoryNode : "Sin ID de categoría", // Cogemos la ID de categoría porque las que vienen de Walmart están en ingles, las traducimos nostoros
            marca: objetoActual.brandName ? objetoActual.brandName : "Sin marca",
            puntuacion: objetoActual.customerRating ? objetoActual.customerRating : 0,
            // Cambiamos el precio aquí.
            precio: objetoActual.salePrice ? traducirPrecio(objetoActual.salePrice) : 0,
            stock: objetoActual.stock ? objetoActual.stock : "No se sabe si hay o no" // Esto devuelve "Not Available" o "Available"
        };
        arrayObjetosRetorno.push(nuevoObjeto);
    }
    for (var i in arrayObjetosRetorno) {
        console.warn(arrayObjetosRetorno[i]);
    }
    return arrayObjetosRetorno;
}
/**
 * Función para traducir el precio de dólares a euros
 * Se puede usar la librería de Forex en el futuro.
 * @param {type} dolares
 * @returns {undefined}
 */
function traducirPrecio(dolares) {
    //1 U.S. dollar = 0.81331891 Euros
    return (dolares * 0.81331891).toFixed(2);
}
"use strict";

//Contiene las propiedades de los filtros
var _data = void 0;
var objetosAleatorios = void 0;

$(document).ready(function () {
    getFiltros();
    nombreUsuarioLogeado();
    busquedaSinFiltrado();
});

/*
    Lee el Json asocionCategorias para obtener las categorias de filtrado.
*/
function getFiltros() {
    $.ajax({
        url: "js/backend/asociacionCategoriasNuevo.json",
        dataType: "JSON",
        success: function success(data) {
            _data = data;
            ReactDOM.render(React.createElement(App, null), document.body);
            $(".subFiltro").on("click", busquedaFiltrada);
        },
        error: function error() {
            alert("Error en Elementos");
        }
    });
}

var App = function App() {
    return React.createElement(
        "div",
        { className: "App" },
        React.createElement(Cabecera, null),
        React.createElement(Cuerpo, null)
    );
};

/*---------------------------------
    Cabecera contiene todos los componentes que necesitamos para visualizar los filtros
-----------------------------------*/
var Cabecera = function Cabecera() {
    /*
    ------------- Falta----------
    despues del div cabecera, que es un botón de prueba de armando
    */
    return React.createElement(
        "div",
        { className: "cabecera" },
        React.createElement(Nav, null),
        React.createElement(ListaFiltros, { list: construyeFiltros() }),
        React.createElement(AbrirFiltro, null)
    );
};

var Nav = function Nav() {
    return React.createElement(
        "div",
        { id: "nav", className: "sombra" },
        React.createElement(
            "a",
            { id: "logotipo", href: "index.html" },
            React.createElement("img", { src: "addons/images/icono-Claro.png", alt: "logotipo" })
        ),
        React.createElement(
            "div",
            { id: "bucador" },
            React.createElement("input", { type: "text", id: "TbxBuscar" }),
            React.createElement(
                "span",
                { id: "lupa" },
                React.createElement("img", { src: "addons/icons/lupa.svg", alt: "lupa buscar", className: "formatoIcono" })
            )
        ),
        React.createElement(
            "div",
            { id: "cesta" },
            React.createElement(
                "span",
                { id: "numObjCesta" },
                "0"
            ),
            React.createElement("img", { src: "addons/icons/carro.svg", alt: "carrito", className: "formatoIcono" }),
            React.createElement(
                "p",
                null,
                "Carrito"
            )
        ),
        React.createElement(
            "div",
            { id: "login" },
            React.createElement(
                "a",
                { id: "loginLink", className: "loginLink", href: "login.html" },
                React.createElement("img", { src: "addons/icons/usuario.svg", alt: "usuario", className: "formatoIcono" }),
                React.createElement(
                    "span",
                    null,
                    "Hola. Identif\xEDcate"
                )
            ),
            React.createElement("img", { src: "addons/icons/salir.svg", alt: "salir", className: "formatoIcono" })
        )
    );
};

var ListaFiltros = function ListaFiltros(props) {
    var listaFiltros = props.list.map(function (filtro, i) {
        return React.createElement(Filtro, { filtro: filtro, key: i });
    });
    return React.createElement(
        "div",
        { id: "bloqueFiltro", className: "sombra" },
        React.createElement(
            "h3",
            { className: "fuenteTitulos" },
            "Filtros"
        ),
        listaFiltros
    );
};

var Filtro = function Filtro(props) {
    var listaSubFiltros = props.filtro["hijosWalmart"].map(function (subFiltro, j) {
        return React.createElement(SubFiltro, { subFiltro: subFiltro, key: j });
    });
    return React.createElement(
        "div",
        { className: "columna" },
        React.createElement(
            "h3",
            { className: "fuenteTitulos" },
            props.filtro["nombreFiltro"]
        ),
        React.createElement(
            "ul",
            { data: props.filtro["eBay"] },
            listaSubFiltros
        )
    );
};

var SubFiltro = function SubFiltro(props) {
    return React.createElement(
        "li",
        { className: "subFiltro", data: props.subFiltro["id"] },
        props.subFiltro["nombreSubfiltro"]
    );
};

var AbrirFiltro = function AbrirFiltro() {
    return React.createElement(
        "div",
        { className: "AbrirFiltro sombra" },
        React.createElement(
            "div",
            null,
            "Filtro"
        ),
        React.createElement("img", { src: "addons/icons/row-down.svg", alt: "abrirFiltro", className: "formatoIcono" })
    );
};

/*---------------------------------
    Cabecera termina 
-----------------------------------*/

/*--------------------------------
    Resultados contiene todos los componentes necesarios para mostrar los productos de la tienda
..................................*/

var Cuerpo = function Cuerpo() {
    return React.createElement("div", { className: "Cuerpo", id: "Cuerpo" });
};

var ListaResultados = function ListaResultados(props) {
    var listaResultados = props.list.map(function (resultado, c) {
        return React.createElement(Resultado, { resultado: resultado, key: c });
    });
    return React.createElement(
        "div",
        { className: "resultado" },
        listaResultados
    );
}; /*
                  <div class="cabezaproducto">
                      <img id="ProductoImagen" src="${objetoVenta.imagen}" alt="imagen"/>            
                      <img class="Tipoproducto" src="addons/images/ebay_icon.svg" alt=""/>
                  </div>
                  <div class="ProductoInfo">
                      <div id="Productonombre">${objetoVenta.nombre}</div>
                      <div id="Productodescripcion">${objetoVenta.descripcionCorta}</div>
                      <p>
                          <label>Puntuación: </label>
                          <label id="Productopuntuacion">${objetoVenta.puntuacion} puntos</label>                        
                      </p>
                      <p>
                          <label>Precio:</label>
                          <div class="precioCarrito">
                              <label id="Productoprecio" class="sombraTexto">${objetoVenta.precio} €</label>
                              <img id="addItem" src="addons/icons/add_item.svg" alt=""/>                     
                          </div>                        
                      </p>
                  </div>                
              </div>`;
              */
//Hay que distinguir si es eBay o de Walmart para poner la foto de la tienda
//<img class="Tipoproducto" src="addons/images/ebay_icon.svg" alt=""/>
var Resultado = function Resultado(props) {
    var foto = "addons/images/";
    if (props.resultado["tienda"] == "eBay") {
        foto += "ebay_icon.svg";
    } else {
        foto += "walmart_icon.png";
    }
    return React.createElement(
        "div",
        { className: "producto" },
        React.createElement(
            "div",
            { className: "cabezaproducto" },
            React.createElement("img", { id: "ProductoImagen", src: props.resultado["imagen"] }),
            React.createElement("img", { className: "Tipoproducto", src: foto })
        ),
        React.createElement(
            "div",
            { className: "ProductInfo" },
            React.createElement(
                "div",
                { id: "Productonombre" },
                props.resultado["nombre"]
            ),
            React.createElement(
                "div",
                { id: "Productodescripcion" },
                props.resultado["descripcionCorta"]
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "label",
                    null,
                    "Puntuaci\xF3nV:"
                ),
                React.createElement(
                    "label",
                    { id: "Productopuntuacion" },
                    props.resultado["puntuacion"]
                )
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "label",
                    null,
                    "Precio:"
                ),
                React.createElement(
                    "div",
                    { className: "precioCarrito" },
                    React.createElement(
                        "label",
                        { id: "Productoprecio", "class": "sombraTexto" },
                        props.resultado["precio"],
                        "\u20AC"
                    ),
                    React.createElement("img", { id: "addItem", src: "addons/icons/add_item.svg" })
                )
            )
        ),
        React.createElement(
            "p",
            null,
            props.resultado["nombre"]
        )
    );
};

function nombreUsuarioLogeado() {
    var user = localStorage.getItem('UsuarioLogueado');
    if (user && user !== "undefined") {
        $('#loginLink').find('span').text('Bienvenido ' + user);
    }
}

function construyeFiltros() {
    var x = [];

    for (var i in _data) {
        x.push(_data[i]);
    }
    return x;
}

function busquedaSinFiltrado() {
    construirFiltros("HideDuplicateItems", "true");
    buscarPorClave("Deporte", 12, 1);
}

function busquedaFiltrada(event) {
    $(this).addClass("marcado");
    var ListaObjetosBuscados = [];
    //Comprobar que siempre haya texto de búsqueda 
    var buscadoEnLaBarra = $("#TbxBuscar").val();

    var idSubFiltroWalmart = this.getAttribute("data");
    var idCategoriaEbay = $(this).parent().attr("data");

    //Método busqueda api Walmart, recoge :
    listaResultadosWalmart = search(buscadoEnLaBarra, idSubFiltroWalmart, 0, "customerRating", "asc", 12);

    //Método consulta ebay
    listaResultadosEBay = busquedaPorClaveYCategoria(buscadoEnLaBarra, idCategoriaEbay, 12, 1);

    ListaObjetosBuscados.push(listaResultadosWalmart, listaResultadosEBay);
    return ListaObjetosBuscados;
}

function construccion(arrayObjetosVenta) {
    objetosAleatorios = arrayObjetosVenta;
    ReactDOM.render(React.createElement(ListaResultados, { list: objetosAleatorios }), document.getElementById("Cuerpo"));
}

function construyeElemento(objetoVenta) {
    /*let text = '<div>';
    text += "<p><strong>ID:</strong> "+objetoVenta.id+"</p>";
    text += "<p><strong>Nombre:</strong> "+objetoVenta.nombre+"</p>";
    text += "<p><strong>Imagen grande:</strong> "+objetoVenta.imagenGrande+"</p>";
    text += "<p><strong>Imagen:</strong> "+objetoVenta.imagen+"</p>";
    text += "<p><strong>ID de categoría:</strong> "+objetoVenta.id_categoria+"</p>";
    text += "<p><strong>Marca / Vendedor:</strong> "+objetoVenta.marca+"</p>";
    text += "<p><strong>Puntuación (sobre 5 o sobre 100):</strong> "+objetoVenta.puntuacion+"</p>";
    text += "<p><strong>Precio:</strong> "+objetoVenta.precio+"€</p>";
    text += "<p><strong>¿Está en stock?:</strong> "+objetoVenta.stock+"</p>";
    text += "<p><strong>Descripción corta:</strong> "+objetoVenta.descripcionCorta+"</p>";
    text += "<p><strong>Descripción:</strong> "+objetoVenta.descripcion+"</p>";
    text += "<p><strong>Tienda:</strong> "+objetoVenta.tienda+"</p>";
    text += '</div>';*/

    var text = "<div class=\"producto\">\n                <div class=\"cabezaproducto\">\n                    <img id=\"ProductoImagen\" src=\"" + objetoVenta.imagen + "\" alt=\"imagen\"/>            \n                    <img class=\"Tipoproducto\" src=\"addons/images/ebay_icon.svg\" alt=\"\"/>\n                </div>\n                <div class=\"ProductoInfo\">\n                    <div id=\"Productonombre\">" + objetoVenta.nombre + "</div>\n                    <div id=\"Productodescripcion\">" + objetoVenta.descripcionCorta + "</div>\n                    <p>\n                        <label>Puntuaci\xF3n: </label>\n                        <label id=\"Productopuntuacion\">" + objetoVenta.puntuacion + " puntos</label>                        \n                    </p>\n                    <p>\n                        <label>Precio:</label>\n                        <div class=\"precioCarrito\">\n                            <label id=\"Productoprecio\" class=\"sombraTexto\">" + objetoVenta.precio + " \u20AC</label>\n                            <img id=\"addItem\" src=\"addons/icons/add_item.svg\" alt=\"\"/>                     \n                        </div>                        \n                    </p>\n                </div>                \n            </div>";
    $('#resultado').append(text);
}
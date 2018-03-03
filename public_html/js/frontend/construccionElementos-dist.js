"use strict";

//Contiene las propiedades de los filtros
var _data = void 0;
var ObjetosConsultas = void 0;

$(document).ready(function () {
    getFiltros();
    nombreUsuarioLogeado();
    busquedaSinFiltrado();

    $("#bloqueFiltro").accordion({
        collapsible: true
    });
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
                "div",
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
    search("Sports", null, 1, "customerRating", "desc", 12);
}

function busquedaFiltrada(event) {
    $(".marcadoSinTransition").removeClass("marcadoSinTransition");

    $(this).addClass("marcadoSinTransition");

    var buscadoEnLaBarra = $("#TbxBuscar").val();
    //Comprobar que siempre haya texto de búsqueda 
    if (buscadoEnLaBarra.length == 0) {
        toastr.warning("Debe insertar texto de búsqueda");
    }

    var idSubFiltroWalmart = this.getAttribute("data");
    var idCategoriaEbay = $(this).parent().attr("data");

    //Método busqueda api Walmart, recoge :
    search(buscadoEnLaBarra, idSubFiltroWalmart, 0, "customerRating", "asc", 12);

    //Método consulta ebay
    busquedaPorClaveYCategoria(buscadoEnLaBarra, idCategoriaEbay, 12, 1);

    /*
        OJOOO----------------
        Puede ser por esto que solo muestros los elementos de las busquedass de ebay
    */
}

var aux = [];
var contador = 0;
function construccion(arrayObjetosVenta) {
    for (var i in arrayObjetosVenta) {
        aux.push(arrayObjetosVenta[i]);
    }
    contador++;

    if (contador == 2) {
        renderizar(aux);
        contador = 0;
        aux = [];
    }

    //ObjetosConsultas = arrayObjetosVenta;
    //renderizar(ObjetosConsultas);
}

function renderizar(resultadosBusqueda) {
    ReactDOM.render(React.createElement(ListaResultados, { list: resultadosBusqueda }), document.getElementById("Cuerpo"));
}
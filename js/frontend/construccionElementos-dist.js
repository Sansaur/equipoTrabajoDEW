"use strict";

//Contiene las propiedades de los filtros
var _data = void 0;

$(document).ready(function () {
    //Obtenemos los filtros de un JSON en local.
    getFiltros();
    //Obtenemos el usuario si está logeado.
    nombreUsuarioLogeado();
    //Realizamos una búsqueda predeterminada para mostrar resultados.
    busquedaPrincipalPorDefecto();
    if(localStorage.getItem('UsuarioLogueado')){
        $('#loginLink').find('span').text('Hola, '+localStorage.getItem('UsuarioLogueado'));
    }
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
            //Cuando ya estamos seguros de que la petición se ha realizado imprimimos el
            //componente APP en el cuerpo del HTML
            ReactDOM.render(React.createElement(App, null), document.body);
            $(".subFiltro").on("click", busquedaFiltrada);
        },
        error: function error() {
            alert("Error en Elementos");
        }
    });
}

/*
    Elemento padre de la estructura HTML
*/
var App = function App() {
    return React.createElement(
        "div",
        { className: "App" },
        React.createElement(Cabecera, null),
        React.createElement(Cuerpo, null),
        React.createElement("div", { id: "paginado" })
    );
};

/*
    Cabecera contiene todos los componentes que necesitamos para visualizar los filtros
*/
var Cabecera = function Cabecera() {
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
/*
    Contenedor padre de los filtros
*/
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

/*
    Contiene un filtro de EBay y la lista de subfiltros de ese filtro de EBay en Walmart
*/
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

/*
    Contiene cada uno de los subfiltros de Walmart
*/
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
    Termina la creación de los elementos de la cabecera.
-----------------------------------*/

/*--------------------------------
    Cuerpo contiene todos los componentes necesarios para mostrar los productos de la tienda
..................................*/
var Cuerpo = function Cuerpo() {
    return React.createElement("div", { className: "Cuerpo", id: "Cuerpo" });
};

/*
    Contiene la lista con todos los resultados de búsqueda
*/
var ListaResultados = function ListaResultados(props) {
    var listaResultados = props.list.map(function (resultado, c) {
        return React.createElement(Resultado, { resultado: resultado, key: c });
    });
    return React.createElement(
        "div",
        { className: "resultado" },
        listaResultados
    );
};
/*
    Contiene cada resultado de la búsqueda
*/
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

var Paginator = function Paginator() {
    return React.createElement("div", { id: "paginado" });
};

/*
    Comprobamos si el usuario está logeado para mostrar su nombre
*/
function nombreUsuarioLogeado() {
    var user = localStorage.getItem('UsuarioLogueado');
    if (user && user !== "undefined") {
        $('#loginLink').find('span').text('Bienvenido ' + user);
    }
}
/*
    Retorna una lista con todos los filtros
*/
function construyeFiltros() {
    var x = [];

    for (var i in _data) {
        x.push(_data[i]);
    }
    return x;
}
/*
    Realiza una consulta definida para mostrar resultados de busqueda al entrar en la web
*/
function busquedaPrincipalPorDefecto() {
    construirFiltros("HideDuplicateItems", "true");
    buscarPorClave("Deporte", 12, 1);
    search("Sports", null, 1, "customerRating", "desc", 12);
}

/*
    Busca sin subfiltros desde el botón lupa
*/
function busquedaSinFiltro() {
    var palabraBusqueda = $("#TbxBuscar").val();
    if (palabraBusqueda.length == 0) {
        toastr.warning("Debe insertar texto de búsqueda");
    }
    construirFiltros("HideDuplicateItems", "true");
    buscarPorClave(palabraBusqueda, 12, 1);
    search(palabraBusqueda, null, 1, "customerRating", "desc", 12);
}

//Almacena la id del subfiltro de walmart buscado la última vez
var idSubFiltroWalmart = void 0;
//Almacena la id del filtro de ebay buscado la última vez
var idCategoriaEbay = void 0;
function busquedaFiltrada(event) {
    $(".marcadoSinTransition").removeClass("marcadoSinTransition");

    $(this).addClass("marcadoSinTransition");

    var buscadoEnLaBarra = $("#TbxBuscar").val();
    //Comprobar que siempre haya texto de búsqueda 
    if (buscadoEnLaBarra.length == 0) {
        toastr.warning("Debe insertar texto de búsqueda");
        return;
    }

    idSubFiltroWalmart = this.getAttribute("data");
    idCategoriaEbay = $(this).parent().attr("data");

    //Método busqueda api Walmart
    search(buscadoEnLaBarra, idSubFiltroWalmart, 0, "customerRating", "asc", 12);

    //Método consulta ebay
    busquedaPorClaveYCategoria(buscadoEnLaBarra, idCategoriaEbay, 12, 1);
}

/*
    Realizamos una búsqueda para mostrar los resultados de la siguiente página
*/
function busquedaPaginator(page) {
    var buscadoEnLaBarra = $("#TbxBuscar").val();
    //Comprobar que siempre haya texto de búsqueda 
    if (buscadoEnLaBarra.length == 0) {
        toastr.warning("Debe insertar texto de búsqueda");
        return;
    }

    //Método busqueda api Walmart, recoge :
    search(buscadoEnLaBarra, idSubFiltroWalmart, page, "customerRating", "asc", 12);

    //Método consulta ebay
    if(idCategoriaEbay){
        busquedaPorClaveYCategoria(buscadoEnLaBarra, idCategoriaEbay, 12, page);
    } else {
        buscarPorClave(buscadoEnLaBarra,12,page);
    }
    
    window.scrollTo(0, 0);
}

/*
    Comprobamos que las dos apis nos devuelven resultados
*/
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
}
/*
    Renderizamos el componene ListaResultados con sus subcomponentes en un div id=cuerpo
    Recibe la lista de resultados
*/
function renderizar(resultadosBusqueda) {
    ReactDOM.render(React.createElement(ListaResultados, { list: resultadosBusqueda }), document.getElementById("Cuerpo"));
    controlEventosJquery();
}
/*
    Añadimos una serie de propiedades y eventos a unos elementos html
*/
function controlEventosJquery() {
    $('#paginado').pagination({
        items: 500,
        itemsOnPage: 10,
        displayedPages: 3,
        cssStyle: 'dark-theme',
        onPageClick: function onPageClick(pageNumber, event) {
            busquedaPaginator(pageNumber);
        }
    });
    $("#lupa").on("click", busquedaSinFiltro);
}

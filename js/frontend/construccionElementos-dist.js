"use strict";

var _data = void 0;

$(document).ready(function () {
    getFiltros();
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
            //let auxLista = construyeFiltros();
            //ReactDOM.render(<ListaFiltros list={auxLista}/>, document.getElementById('bloqueFiltro'));
            ReactDOM.render(React.createElement(Cabecera, null), document.body);
        },
        error: function error() {
            alert("Errorrrr");
        }
    });
}

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
        )
    );
    /*
       ------------------ Esto va despues del Div cesta----------
       <div id="login">
                    <a id="loginLink" style="color:inherit;text-decoration:inherit;" href="login.html"> <img src="addons/icons/usuario.svg" alt="usuario" className="formatoIcono"/> 
                        <span>Hola. Identifícate</span></a>
                    <script>
                        let user = localStorage.getItem('UsuarioLogueado')
                        if (user && user !== "undefined") {
                            $('#loginLink').find('span').text('Bienvenido ' + user);
                        }
                    </script>
                    <img src="addons/icons/salir.svg" alt="salir" className="formatoIcono" style="display:none"/> 
                </div>
    */
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
            null,
            listaSubFiltros
        )
    );
};

var SubFiltro = function SubFiltro(props) {
    return React.createElement(
        "li",
        null,
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

function construyeFiltros() {
    var x = [];

    for (var i in _data) {
        x.push(_data[i]);
    }
    return x;
}

function construccion(arrayObjetosVenta) {
    for (var i in arrayObjetosVenta) {
        construyeElemento(arrayObjetosVenta[i]);
    }
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

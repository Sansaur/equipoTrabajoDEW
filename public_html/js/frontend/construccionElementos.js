//Contiene las propiedades de los filtros
let _data;
let objetosAleatorios;

$(document).ready(function(){
    getFiltros();
    nombreUsuarioLogeado();
    busquedaSinFiltrado();
});

/*
    Lee el Json asocionCategorias para obtener las categorias de filtrado.
*/
function getFiltros(){
    $.ajax({
        url:"js/backend/asociacionCategoriasNuevo.json",
        dataType: "JSON",
        success:function(data){
            _data = data;
            ReactDOM.render(<App />,document.body);
            $(".subFiltro").on("click", busquedaFiltrada);
        },
        error:function(){
            alert("Error en Elementos");
        }
    })
}

const App = () => {
    return (
        <div className="App">
            <Cabecera />
            <Cuerpo />
        </div>
    )
}

/*---------------------------------
    Cabecera contiene todos los componentes que necesitamos para visualizar los filtros
-----------------------------------*/
const Cabecera = () => {
    /*
    ------------- Falta----------
    despues del div cabecera, que es un botón de prueba de armando
    */
    return(
        <div className="cabecera">
            <Nav />
            <ListaFiltros list={construyeFiltros()}/>
            <AbrirFiltro />
        </div>
    )
}

const Nav = () => {
    return( 
        <div id="nav" className="sombra">
            <a id="logotipo" href="index.html">
                <img src="addons/images/icono-Claro.png" alt="logotipo"/>
            </a>  

            <div id="bucador">
                <input type="text" id="TbxBuscar" />
                <span id="lupa">
                    <img src="addons/icons/lupa.svg" alt="lupa buscar" className="formatoIcono" />
                </span>
            </div>

            <div id="cesta">
                <span id="numObjCesta">0</span>
                <img src="addons/icons/carro.svg" alt="carrito" className="formatoIcono"/> 
                <p>Carrito</p>
            </div>
                
            <div id="login">
                <a id="loginLink" className="loginLink" href="login.html"> 
                    <img src="addons/icons/usuario.svg" alt="usuario" className="formatoIcono"/> 
                    <span>Hola. Identifícate</span>
                </a>
                <img src="addons/icons/salir.svg" alt="salir" className="formatoIcono"/> 
            </div>
        </div>
    )
}

const ListaFiltros = props => {
    const listaFiltros = props.list.map((filtro,i) => <Filtro filtro={filtro} key={i}/>)
    return (
        <div id="bloqueFiltro" className="sombra">
            <h3 className="fuenteTitulos">Filtros</h3>
            {listaFiltros}
        </div>
    )
};

const Filtro = props => {
    const listaSubFiltros = props.filtro["hijosWalmart"].map((subFiltro,j) => <SubFiltro subFiltro={subFiltro} key={j}/>)
    return(
        <div className="columna">
            <h3 className="fuenteTitulos">{props.filtro["nombreFiltro"]}</h3>
            <ul data={props.filtro["eBay"]}>
                {listaSubFiltros}
            </ul>          
        </div>
    )
};

const SubFiltro = props =>{
    return(
        <li className="subFiltro" data={props.subFiltro["id"]} >{props.subFiltro["nombreSubfiltro"]}</li>
    )
};

const AbrirFiltro = () =>{
    return(
        <div className="AbrirFiltro sombra">
            <div>Filtro</div> 
            <img src="addons/icons/row-down.svg" alt="abrirFiltro" className="formatoIcono"/> 
        </div>
    )
}

/*---------------------------------
    Cabecera termina 
-----------------------------------*/

/*--------------------------------
    Resultados contiene todos los componentes necesarios para mostrar los productos de la tienda
..................................*/

const Cuerpo = () =>{
    return(
        <div className="Cuerpo" id="Cuerpo">
            
        </div>
    )
}

const ListaResultados = props =>{
    const listaResultados = props.list.map((resultado, c) => <Resultado resultado={resultado} key={c}/>)
    return(
        <div className="Resultados">
            {listaResultados}
        </div>
    )
    
}

const Resultado = props => {
    return(
        <div className="producto">
            <p>{props.resultado["nombre"]}</p>
        </div>
    )
}

function nombreUsuarioLogeado(){
    let user = localStorage.getItem('UsuarioLogueado')
        if (user && user !== "undefined") {
            $('#loginLink').find('span').text('Bienvenido ' + user)
        }
}

function construyeFiltros(){
    let x = [];

    for(var i in _data){
        x.push(_data[i]);
    }
    return x;
}

function busquedaSinFiltrado(){
    buscarPorClave("Deporte",10,1);
}

function busquedaFiltrada(event){
    let ListaObjetosBuscados = [];
    //Comprobar que siempre haya texto de búsqueda 
    let buscadoEnLaBarra = $("#TbxBuscar").val();

    let idSubFiltroWalmart = this.getAttribute("data");
    let idCategoriaEbay = $(this).parent().attr("data");

    //Método busqueda api Walmart, recoge :
    listaResultadosWalmart = search(buscadoEnLaBarra, idSubFiltroWalmart, 0, "customerRating","asc",10);

    //Método consulta ebay
    listaResultadosEBay = busquedaPorClaveYCategoria(buscadoEnLaBarra, idCategoriaEbay,10,1);

    ListaObjetosBuscados.push(listaResultadosWalmart, listaResultadosEBay);
    return ListaObjetosBuscados;
}

function construccion(arrayObjetosVenta){
    objetosAleatorios = arrayObjetosVenta;
    ReactDOM.render(<ListaResultados list={objetosAleatorios}/>,document.getElementById("Cuerpo"));
    
}

function construyeElemento(objetoVenta){
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
    
    var text = `<div class="producto">
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
    $('#resultado').append(text);
}
//Contiene las propiedades de los filtros
let _data;


$(document).ready(function(){
    //Obtenemos los filtros de un JSON en local.
    getFiltros();
    //Obtenemos el usuario si está logeado.
    nombreUsuarioLogeado();
    //Realizamos una búsqueda predeterminada para mostrar resultados.
    busquedaPrincipalPorDefecto();
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
            //Cuando ya estamos seguros de que la petición se ha realizado imprimimos el
            //componente APP en el cuerpo del HTML
            ReactDOM.render(<App />,document.body);
            $(".subFiltro").on("click", busquedaFiltrada);
        },
        error:function(){
            alert("Error en Elementos");
        }
    })
}

/*
    Elemento padre de la estructura HTML
*/
const App = () => {
    return (
        <div className="App">
            <Cabecera />
            <Cuerpo />
            <div id="paginado"></div>
        </div>
    )
}

/*
    Cabecera contiene todos los componentes que necesitamos para visualizar los filtros
*/
const Cabecera = () => {
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
/*
    Contenedor padre de los filtros
*/
const ListaFiltros = props => {
    const listaFiltros = props.list.map((filtro,i) => <Filtro filtro={filtro} key={i}/>)

    return (
        <div id="bloqueFiltro" className="sombra">
            <h3 className="fuenteTitulos">Filtros</h3>

            {listaFiltros}
        
        </div>
    )
};

/*
    Contiene un filtro de EBay y la lista de subfiltros de ese filtro de EBay en Walmart
*/
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

/*
    Contiene cada uno de los subfiltros de Walmart
*/
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
    Termina la creación de los elementos de la cabecera.
-----------------------------------*/

/*--------------------------------
    Cuerpo contiene todos los componentes necesarios para mostrar los productos de la tienda
..................................*/
const Cuerpo = () =>{
    return(
        <div className="Cuerpo" id="Cuerpo">

        </div>
    )
}

/*
    Contiene la lista con todos los resultados de búsqueda
*/
const ListaResultados = props =>{
    const listaResultados = props.list.map((resultado, c) => <Resultado resultado={resultado} key={c}/>)
    return(
        <div className="resultado">
            {listaResultados}
        </div>
    )
    
}
/*
    Contiene cada resultado de la búsqueda
*/
const Resultado = props => {
    let foto = "addons/images/";
    if(props.resultado["tienda"] == "eBay"){
        foto += "ebay_icon.svg"
    }
    else{
        foto += "walmart_icon.png"
    }
    return(
        <div className="producto">
            <div className="cabezaproducto">
                <img id="ProductoImagen" src={props.resultado["imagen"]}/>
                <img className="Tipoproducto" src={foto} />
            </div>
            <div className="ProductInfo">
                <div id="Productonombre">{props.resultado["nombre"]}</div>
                <div id="Productodescripcion">{props.resultado["descripcionCorta"]}</div>
                <p>
                    <label>PuntuaciónV:</label>
                    <label id="Productopuntuacion">{props.resultado["puntuacion"]}</label>
                </p>
                <div>
                    <label>Precio:</label>
                    <div className="precioCarrito">
                        <label id="Productoprecio" class="sombraTexto">{props.resultado["precio"]}€</label>
                        <img id="addItem" src="addons/icons/add_item.svg"/>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

const Paginator = () =>{
    return(
        <div id="paginado">

        </div>
    )
}

/*
    Comprobamos si el usuario está logeado para mostrar su nombre
*/
function nombreUsuarioLogeado(){
    let user = localStorage.getItem('UsuarioLogueado')
        if (user && user !== "undefined") {
            $('#loginLink').find('span').text('Bienvenido ' + user)
        }
}
/*
    Retorna una lista con todos los filtros
*/
function construyeFiltros(){
    let x = [];

    for(var i in _data){
        x.push(_data[i]);
    }
    return x;
}
/*
    Realiza una consulta definida para mostrar resultados de busqueda al entrar en la web
*/
function busquedaPrincipalPorDefecto(){
    construirFiltros("HideDuplicateItems", "true");
    buscarPorClave("Deporte",12,1);
    search("Sports",null,1,"customerRating","desc",12);
}

/*
    Busca sin subfiltros desde el botón lupa
*/
function busquedaSinFiltro(){
    let palabraBusqueda = $("#TbxBuscar").val();
    if(palabraBusqueda.length == 0){
        toastr.warning("Debe insertar texto de búsqueda");
    }
    construirFiltros("HideDuplicateItems", "true");
    buscarPorClave(palabraBusqueda,12,1);
    search(palabraBusqueda,null,1,"customerRating","desc",12);
    
}

//Almacena la id del subfiltro de walmart buscado la última vez
let idSubFiltroWalmart;
//Almacena la id del filtro de ebay buscado la última vez
let idCategoriaEbay;
function busquedaFiltrada(event){
    $(".marcadoSinTransition").removeClass("marcadoSinTransition")
    
    $(this).addClass("marcadoSinTransition");

    let buscadoEnLaBarra = $("#TbxBuscar").val();
    //Comprobar que siempre haya texto de búsqueda 
    if(buscadoEnLaBarra.length == 0){
        toastr.warning("Debe insertar texto de búsqueda");
    }
   
    idSubFiltroWalmart = this.getAttribute("data");
    idCategoriaEbay = $(this).parent().attr("data");

    //Método busqueda api Walmart
    search(buscadoEnLaBarra, idSubFiltroWalmart, 0, "customerRating","asc",12);

    //Método consulta ebay
    busquedaPorClaveYCategoria(buscadoEnLaBarra, idCategoriaEbay,12,1);
}

/*
    Realizamos una búsqueda para mostrar los resultados de la siguiente página
*/
function busquedaPaginator(page){
    let buscadoEnLaBarra = $("#TbxBuscar").val();
    //Comprobar que siempre haya texto de búsqueda 
    if(buscadoEnLaBarra.length == 0){
        toastr.warning("Debe insertar texto de búsqueda");
    }

    //Método busqueda api Walmart, recoge :
    search(buscadoEnLaBarra, idSubFiltroWalmart, page, "customerRating","asc",12);

    //Método consulta ebay
    busquedaPorClaveYCategoria(buscadoEnLaBarra, idCategoriaEbay,12,page);
    window.scrollTo(0,0);
}

/*
    Comprobamos que las dos apis nos devuelven resultados
*/
var aux = []
var contador = 0;
function construccion(arrayObjetosVenta){
    for(var i in arrayObjetosVenta){
        aux.push(arrayObjetosVenta[i]);
    }
    contador++;

    if(contador == 2){
        renderizar(aux);
        contador = 0;
        aux = [];
    }
}
/*
    Renderizamos el componene ListaResultados con sus subcomponentes en un div id=cuerpo
    Recibe la lista de resultados
*/
function renderizar(resultadosBusqueda){
    ReactDOM.render(<ListaResultados list={resultadosBusqueda}/>,document.getElementById("Cuerpo"));
    controlEventosJquery();
}
/*
    Añadimos una serie de propiedades y eventos a unos elementos html
*/
function controlEventosJquery(){
    $('#paginado').pagination({
        items: 500,
        itemsOnPage: 10,
        displayedPages: 3,
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber,event){
            busquedaPaginator(pageNumber);
        }
    });
    $("#lupa").on("click", busquedaSinFiltro);
}
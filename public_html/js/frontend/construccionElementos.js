//Contiene las propiedades de los filtros
let _data;
let ObjetosConsultas;

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
        <div className="resultado">
            {listaResultados}
        </div>
    )
    
}/*
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
    construirFiltros("HideDuplicateItems", "true");
    buscarPorClave("Deporte",12,1);
    search("Sports",null,1,"customerRating","desc",12);
}

function busquedaFiltrada(event){
    $(".marcadoSinTransition").removeClass("marcadoSinTransition")
    
    $(this).addClass("marcadoSinTransition");

    let buscadoEnLaBarra = $("#TbxBuscar").val();
    //Comprobar que siempre haya texto de búsqueda 
    if(buscadoEnLaBarra.length == 0){
        toastr.warning("Debe insertar texto de búsqueda");
    }
   

    let idSubFiltroWalmart = this.getAttribute("data");
    let idCategoriaEbay = $(this).parent().attr("data");

    //Método busqueda api Walmart, recoge :
    search(buscadoEnLaBarra, idSubFiltroWalmart, 0, "customerRating","asc",12);

    //Método consulta ebay
    busquedaPorClaveYCategoria(buscadoEnLaBarra, idCategoriaEbay,12,1);

    /*
        OJOOO----------------
        Puede ser por esto que solo muestros los elementos de las busquedass de ebay
    */
}

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
        

    //ObjetosConsultas = arrayObjetosVenta;
    //renderizar(ObjetosConsultas);
}

function renderizar(resultadosBusqueda){
    ReactDOM.render(<ListaResultados list={resultadosBusqueda}/>,document.getElementById("Cuerpo"));
}

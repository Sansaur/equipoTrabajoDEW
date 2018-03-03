let _data;

$(document).ready(function(){
    getFiltros();
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
            //let auxLista = construyeFiltros();
            //ReactDOM.render(<ListaFiltros list={auxLista}/>, document.getElementById('bloqueFiltro'));
            ReactDOM.render(<Cabecera />,document.body);
        },
        error:function(){
            alert("Errorrrr");
        }
    })
}

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
                
            </div>
    )
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
            <ul>
                {listaSubFiltros}
            </ul>          
        </div>
    )
};

const SubFiltro = props =>{
    return(
        <li>{props.subFiltro["nombreSubfiltro"]}</li>
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

function construyeFiltros(){
    let x = [];

    for(var i in _data){
        x.push(_data[i]);
    }
    return x;
}


function construccion(arrayObjetosVenta){
    for(var i in arrayObjetosVenta){
        construyeElemento(arrayObjetosVenta[i]);
    }
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

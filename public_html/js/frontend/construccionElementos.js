function construccion(arrayObjetosVenta){
    for(var i in arrayObjetosVenta){
        construyeElemento(arrayObjetosVenta[i]);
    }
}
function construyeElemento(objetoVenta){
    let text = '<div>';
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
    text += '</div>';
    $('#contenidos').append(text);
}
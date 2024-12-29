async function conexionProductos() {
    const productos = await fetch('http://localhost:3001/productos');
    const productosConvertidos = productos.json();
    return productosConvertidos
}

async function agregarProducto(nombre, precio, imagen) {

    const producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen
    }

    const respuesta = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    const respuestaConvertida = respuesta.json();
    return respuestaConvertida;
}

async function eliminarProducto(id) {
    const respuesta = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE'
    })
    const respuestaConvertida = respuesta.json();
    return respuestaConvertida;
}

export const conexionAPI = {
    conexionProductos, agregarProducto, eliminarProducto
}
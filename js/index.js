async function conexionProductos() {
    const productos = await fetch('http://localhost:3001/productos');
    const productosConvertidos = productos.json();
    return productosConvertidos
}

export const conexionAPI = {
    conexionProductos
}
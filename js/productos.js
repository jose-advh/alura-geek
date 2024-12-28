import { conexionAPI } from "./index.js";

const listaProductos = document.querySelector('[data-lista-productos]'); 

function crearProducto(nombre, precio, imagen) {
    const producto = document.createElement('li');
    producto.className = 'productos__item';
    producto.innerHTML = `
                    <img width="100%" height="70%" src="${imagen}" alt="Producto disponible" />
                    <section class="descripcion-producto">
                        <h3 class="description__title">${nombre}</h3>
                        <article class="descripcion-detalles">
                            <p>$${precio}</p>
                            <img src="./imgs/icons/delete.svg" alt="Icono de basura" class="description__icon">
                        </article>
                    </section> 
    `;

    return producto;
} 

async function conexionProductos() {
    try {
        const listaAPI = await conexionAPI.conexionProductos();

        listaAPI.forEach(producto => listaProductos.appendChild(crearProducto(producto.nombre, producto.precio, producto.imagen)))
    } catch (error) {
        listaProductos.innerHTML = `<h3>Hubo un error al cargar los productos</h3>`;
    }
}

conexionProductos();
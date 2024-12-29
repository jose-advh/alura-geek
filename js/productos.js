import { conexionAPI } from "./index.js";

const listaProductos = document.querySelector('[data-lista-productos]'); 

function crearProducto(nombre, precio, imagen, id) {
    const producto = document.createElement('li');
    producto.className = 'productos__item';
    producto.innerHTML = `
                    <img width="100%" height="70%" src="${imagen}" alt="Producto disponible" />
                    <section class="descripcion-producto">
                        <h3 class="description__title">${nombre}</h3>
                        <article class="descripcion-detalles">
                            <p>$${precio}</p>
                            <img src="./imgs/icons/delete.svg" alt="Icono de basura" class="description__icon" data-id="${id}"/>
                        </article>
                    </section> 
    `;

    const iconoEliminar = producto.querySelector('[data-id]');
    iconoEliminar.addEventListener('click' , () => {
        Swal.fire({
            title: "¿Estás seguro de que deseas eliminar este producto?",
            text: "No podrás recuperar este archivo una vez eliminado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "¡Eliminado!",
                text: "El producto ha sido eliminado correctamente",
                icon: "success"
              });

                eliminarProducto(id);
            }
          });
    });

    if (!id) {
        console.log('no hay productos bro')
    }
    return producto;
} 

async function conexionProductos() {
    try {
        const listaAPI = await conexionAPI.conexionProductos();

        listaAPI.forEach(producto => {
            listaProductos.appendChild(crearProducto(producto.nombre, producto.precio, producto.imagen, producto.id));
        });

    } catch (error) {
        listaProductos.innerHTML = `<h3>Hubo un error al cargar los productos</h3>`;
    }
}

async function eliminarProducto(id) {
    try {
        fetch(`http://localhost:3001/productos/${id}`, {
            method: 'DELETE'
        });
    } catch {
        console.log('Hubo un error al eliminar el producto');
    }
}

conexionProductos();


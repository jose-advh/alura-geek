import { conexionAPI } from "./index.js";

const formularioAgregar = document.querySelector('[data-form-agregar]');

async function agregarProducto(e) {
    e.preventDefault();
    const nombre = document.querySelector('[data-nombre]').value;
    const precio = document.querySelector('[data-precio]').value;
    const imagen = document.querySelector('[data-imagen]').value;

    try {
        await conexionAPI.agregarProducto(nombre, precio, imagen);
        location.reload();
    } catch {
        console.log('Hubo un error al agregar el producto');
    }
}

formularioAgregar.addEventListener('submit', e => agregarProducto(e))
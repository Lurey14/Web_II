import { productoService } from "../service/producto-service.js";

const formulario = document.querySelector("[data-form]");
console.log("Formulario encontrado:", formulario);

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    console.log("Evento submit disparado");

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    console.log("Datos del formulario:", { nombre, precio, descripcion });

    productoService.crearProducto(nombre, precio, descripcion)
        .then((respuesta) => {
        console.log("Producto creado:", respuesta);
        window.location.href = "../screens/registro_completado_producto.html";
        })
        .catch((error) => {
        console.error("Error al crear el producto:", error);
        });
});
import { clienteService } from "../service/cliente-service.js";

const formulario = document.querySelector("[data-form]");
const inputNombre = document.querySelector("[data-nombre]");
const inputEmail = document.querySelector("[data-email]");

const url = new URL(window.location);
const id = url.searchParams.get("id");

clienteService.clientes(id).then(cliente => {
    if (!cliente || cliente.length === 0) {
        alert("Cliente no encontrado");
        window.location.href = "./lista_cliente.html";
        return;
    }
    inputNombre.value = cliente.nombre;
    inputEmail.value = cliente.email;
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    clienteService.actualizarCliente(
        inputNombre.value,
        inputEmail.value,
        id
    ).then(() => {
        window.location.href = "./lista_cliente.html";
    }).catch(() => {
        alert("Error al actualizar cliente");
    });
});
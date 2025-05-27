import { clienteService } from "../service/cliente-service.js";
const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
        return;
    }
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");
    try {
        const clienteArray = await clienteService.obtenerCliente(id);
        const cliente = Array.isArray(clienteArray) ? clienteArray[0] : clienteArray;
        if (cliente && cliente.nombre && cliente.email) {
            nombre.value = cliente.nombre;
            email.value = cliente.email;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log("Catch error", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector('[data-nombre]').value;
    const email = document.querySelector('[data-email]').value;
    clienteService.actualizarCliente(nombre, email, id).then(() => {
        window.location.href = "../screens/edicion_concluida.html";
    });
});
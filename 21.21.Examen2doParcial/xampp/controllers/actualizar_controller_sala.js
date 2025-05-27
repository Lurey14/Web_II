import { salaService } from "../service/sala-service.js";
const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
        return;
    }
    const nombre = document.querySelector("[data-nombre]");
    const cantidad = document.querySelector("[data-cantidad]");
    try {
        const salas = await salaService.salas(id);
        const sala = Array.isArray(salas) ? salas[0] : salas;
        if (sala && sala.nombre && sala.cantidad !== undefined) {
            nombre.value = sala.nombre;
            cantidad.value = sala.cantidad;
        } else {
            throw new Error("Datos incompletos de la sala");
        }
    } catch (error) {
        console.error("Error al obtener la sala:", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector('[data-nombre]').value;
    const cantidad = document.querySelector('[data-cantidad]').value; // Si tu base espera número: usa Number(cantidad)

    salaService.actualizarSala(nombre, cantidad, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch(() => {
            window.location.href = "../screens/error.html";
        });
});
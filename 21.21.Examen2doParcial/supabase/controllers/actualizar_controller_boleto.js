import { boletoService } from "../service/boleto-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
        window.location.href = "../screens/error.html";
        return;
    }

    const precio = document.querySelector("[data-precio]");
    const cliente = document.querySelector("[data-cliente]");

    try {
        const boletos = await boletoService.obtenerBoleto(id);
        const boleto = Array.isArray(boletos) ? boletos[0] : boletos;
        if (boleto && boleto.precio && boleto.cliente) {
            precio.value = boleto.nombre;
            cliente.value = boleto.cliente;
        } else {
            throw new Error("Datos incompletos del boleto");
        }
    } catch (error) {
        console.error("Error al obtener el boleto:", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const precio = document.querySelector("[data-precio]").value;
    const cliente = document.querySelector("[data-cliente]").value;

    boletoService.actualizarBoleto(precio, cliente, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch(error => {
            console.error("Error al actualizar boleto:", error);
            window.location.href = "../screens/error.html";
        });
});
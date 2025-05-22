import { boletoService } from "../service/boleto-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const precio = document.querySelector("[data-precio]").value;
    const cliente = document.querySelector("[data-cliente]").value;

    boletoService
        .crearBoleto(precio, cliente)
        .then(() => {
            window.location.href = "../screens/registro_completado_boleto.html";
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "../screens/error.html";
        });
});
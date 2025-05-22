import { peliculaService } from "../service/pelicula-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const horario = document.querySelector("[data-horario]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const sala = document.querySelector("[data-sala]").value;
    const boleto = document.querySelector("[data-boleto]").value;

    peliculaService
        .crearPelicula(horario, nombre, sala, boleto)
        .then(() => {
            window.location.href = "../screens/registro_completado_pelicula.html";
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "../screens/error.html";
        });
});
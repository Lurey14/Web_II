import { peliculaService } from "../service/pelicula-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const horario = document.querySelector("[data-horario]").value.trim();
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const sala = document.querySelector("[data-sala]").value.trim();
    const boleto = document.querySelector("[data-boleto]").value.trim();

    if (!horario || !nombre || !sala || !boleto) {
        alert("Todos los campos son obligatorios.");
        return;
    }

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
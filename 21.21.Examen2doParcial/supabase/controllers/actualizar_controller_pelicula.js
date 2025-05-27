import { peliculaService } from "../service/pelicula-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
        window.location.href = "../screens/error.html";
        return;
    }

    const horario = document.querySelector("[data-horario]");
    const nombre = document.querySelector("[data-nombre]");
    const sala = document.querySelector("[data-sala]");
    const boleto = document.querySelector("[data-boleto]");

    try {
        const peliculas = await peliculaService.obtenerPelicula(id);
        const pelicula = Array.isArray(peliculas) ? peliculas[0] : peliculas;
        if (pelicula && pelicula.horario && pelicula.nombre && pelicula.sala && pelicula.boleto) {
            horario.value = pelicula.horario;
            nombre.value = pelicula.nombre;
            sala.value = pelicula.sala;
            boleto.value = pelicula.boleto;
        } else {
            throw new Error("Datos incompletos de la pelicula");
        }
    } catch (error) {
        console.error("Error al obtener la pelicula:", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const horario = document.querySelector("[data-horario]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const sala = document.querySelector("[data-sala]").value;
    const boleto = document.querySelector("[data-boleto]").value;

    peliculaService.actualizarPelicula(horario, nombre, sala, boleto, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch(error => {
            console.error("Error al actualizar pelicula:", error);
            window.location.href = "../screens/error.html";
        });
});
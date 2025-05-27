import { peliculaService } from "../service/pelicula-service.js";

const crear_nueva_fila = (horario, nombre, sala, boleto, id) => {
    const fila = document.createElement('tr');

    const contenido = `
        <td class="td" data-td>${horario}</td>
        <td>${nombre}</td>
        <td>${sala}</td>
        <td>${boleto}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_pelicula.html?id=${id}"
                        class="simple-button simple-button--edit"
                    >Editar</a>
                </li>
                <li>
                    <button
                        class="simple-button simple-button--delete"
                        type="button" id="${id}">
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;

    fila.innerHTML = contenido;

    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        peliculaService.eliminarPelicula(btn.id)
            .then(() => {
                alert("Pelicula eliminada");
                fila.remove();
            })
            .catch(() => alert("Error al eliminar la pelicula"));
    });

    return fila;
};

const table = document.querySelector("[data-table]");

function renderPeliculas(peliculas) {
    table.innerHTML = "";
    if (!peliculas || peliculas.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>No se encontraron resultados</td></tr>";
        return;
    }
    peliculas.forEach(({ horario, nombre, sala, boleto, id }) => {
        const nuevaFila = crear_nueva_fila(horario, nombre, sala, boleto, id);
        table.appendChild(nuevaFila);
    });
}

peliculaService.listarPeliculas()
    .then(renderPeliculas)
    .catch(error => alert("Ocurrió un error al cargar las peliculas"));

const inputBuscador = document.getElementById("buscador");
inputBuscador.addEventListener("input", () => {
    const nombre = inputBuscador.value.trim();
    if (nombre) {
        peliculaService.buscarPeliculaPorNombre(nombre)
            .then(renderPeliculas)
            .catch(() => {
                table.innerHTML = "<tr><td colspan='5'>No se encontraron resultados</td></tr>";
            });
    } else {
        peliculaService.listarPeliculas().then(renderPeliculas);
    }
});
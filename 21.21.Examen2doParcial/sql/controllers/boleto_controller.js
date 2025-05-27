import { boletoService } from "../service/boleto-service.js";

const crear_nueva_fila = (precio, cliente, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>${precio}</td>
        <td>${cliente}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_boleto.html?id=${id}"
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
        boletoService.eliminarBoleto(btn.id)
            .then(() => {
                alert("Boleto eliminado");
                fila.remove();
            })
            .catch(() => alert("Error al eliminar el boleto"));
    });
    return fila;
};

const table = document.querySelector("[data-table]");

function renderBoletos(boletos) {
    table.innerHTML = "";
    if (!boletos || boletos.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>No se encontraron resultados</td></tr>";
        return;
    }
    boletos.forEach(({ precio, cliente, id }) => {
        const nuevaFila = crear_nueva_fila(precio, cliente, id);
        table.appendChild(nuevaFila);
    });
}

boletoService.listarBoletos()
    .then(renderBoletos)
    .catch(error => alert("Ocurrió un error al cargar los boletos"));

const inputBuscador = document.getElementById("buscador");
inputBuscador.addEventListener("input", () => {
    const precio = inputBuscador.value.trim();
    if (precio) {
        boletoService.buscarBoletosPorPrecio(precio)
            .then(renderBoletos)
            .catch(() => {
                table.innerHTML = "<tr><td colspan='5'>No se encontraron resultados</td></tr>";
            });
    } else {
        boletoService.listarBoletos().then(renderBoletos);
    }
});
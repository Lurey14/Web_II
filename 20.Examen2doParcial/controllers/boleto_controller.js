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
                alert("Boleto eliminada");
                fila.remove();
            })
            .catch(() => alert("Error al eliminar el boleto"));
    });

    return fila;
};

const table = document.querySelector("[data-table]");

boletoService.listarBoleto()
    .then(data => {
        data.forEach(({ precio, cliente, id }) => {
            const nuevaFila = crear_nueva_fila(precio, cliente, id);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => alert("Ocurrió un error al cargar los boletos"));

const inputBuscador = document.getElementById("buscador");
function renderBoletos(boleto) {
    table.innerHTML = "";
    if (boleto.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>No se encontraron resultados</td></tr>";
        return;
    }
    boleto.forEach(({ precio, cliente, id }) => {
        const nuevaFila = crear_nueva_fila(precio, cliente, id);
        table.appendChild(nuevaFila);
    });
}

boletoService.listarBoleto()
    .then(renderBoletos)
    .catch(error => alert("Ocurrió un error al cargar los boletos"));

inputBuscador.addEventListener("input", () => {
    const precio = inputBuscador.value.trim();
    if (precio) {
        boletoService.buscarBoletoPorPrecio(precio)
            .then(renderBoletos)
            .catch(() => {
                table.innerHTML = "<tr><td colspan='5'>No se encontraron resultados</td></tr>";
            });
    } else {
        boletoService.listarBoleto().then(renderBoletos);
    }
});
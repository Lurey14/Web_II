import { salaService } from "../service/sala-service.js";
const crear_nueva_fila=(nombre,cantidad,id)=>{
    const fila = document.createElement('tr');
    const contenido = `
            <td class="td" data-td>
            ${nombre}
            </td>
            <td>${cantidad}</td>
            <td>
            <ul class="table__button-control">
                <li>
                    <a
                    href="../screens/editar_sala.html?id=${id}"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
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
        fila.innerHTML=contenido;
        const btn =fila.querySelector("button")
        btn.addEventListener("click",()=>{
            const id=btn.id;
            salaService.eliminarSala(id).then(respuesta=>{
                alert("eliminado")
            }).catch(error=> alert("error"))

        })

        return fila; 
};
const table = document.querySelector("[data-table]");

salaService.listasalas()
    .then(data => {
        data.forEach(({ nombre,cantidad,id }) => {
            const nuevaFila = crear_nueva_fila(nombre,cantidad,id);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => alert("Ocurrio un error al cargar las salas"));

const inputBuscador = document.getElementById("buscador");

function renderSalas(sala) {
    table.innerHTML = "";
    if (sala.length === 0) {
        table.innerHTML = "<tr><td colspan='3'>No se encontraron resultados</td></tr>";
        return;
    }
    sala.forEach(({ nombre, cantidad, id }) => {
        const nuevaFila = crear_nueva_fila(nombre, cantidad, id);
        table.appendChild(nuevaFila);
    });
}

salaService.listasalas()
    .then(renderSalas)
    .catch(error => alert("Ocurrió un error al cargar las salas"));

inputBuscador.addEventListener("input", () => {
    const nombre = inputBuscador.value.trim();
    if (nombre) {
        salaService.buscarSalasPorNombre(nombre)
            .then(renderSalas)
            .catch(() => {
                table.innerHTML = "<tr><td colspan='3'>No se encontraron resultados</td></tr>";
            });
    } else {
        salaService.listasalas().then(renderSalas);
    }
});
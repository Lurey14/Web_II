import { clienteService } from "../service/cliente-service.js";
const crear_nueva_fila=(nombre,email,id)=>{
    const fila = document.createElement('tr');
    const contenido = `
            <td class="td" data-td>
            ${nombre}
            </td>
            <td>${email}</td>
            <td>
            <ul class="table__button-control">
                <li>
                    <a
                    href="../screens/editar_cliente.html?id=${id}"
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
            clienteService.eliminarCliente(id).then(respuesta=>{
                alert("eliminado")
            }).catch(error=> alert("error"))

        })

        return fila; 
};
const table = document.querySelector("[data-table]");

clienteService.listacliente()
    .then(data => {
        data.forEach(({ nombre,email,id }) => {
            const nuevaFila = crear_nueva_fila(nombre,email,id);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => alert("Ocurrio un error al cargar los clientes"));

const inputBuscador = document.getElementById("buscador");

function renderClientes(cliente) {
    table.innerHTML = "";
    if (cliente.length === 0) {
        table.innerHTML = "<tr><td colspan='3'>No se encontraron resultados</td></tr>";
        return;
    }
    cliente.forEach(({ nombre, email, id }) => {
        const nuevaFila = crear_nueva_fila(nombre, email, id);
        table.appendChild(nuevaFila);
    });
}

clienteService.listacliente()
    .then(renderClientes)
    .catch(error => alert("Ocurrió un error al cargar los clientes"));

inputBuscador.addEventListener("input", () => {
    const nombre = inputBuscador.value.trim();
    if (nombre) {
        clienteService.buscarClientesPorNombre(nombre)
            .then(renderClientes)
            .catch(() => {
                table.innerHTML = "<tr><td colspan='3'>No se encontraron resultados</td></tr>";
            });
    } else {
        clienteService.listacliente().then(renderClientes);
    }
});
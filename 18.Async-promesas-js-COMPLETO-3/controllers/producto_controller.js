import { productoService } from "../service/producto-service.js";

const crearNuevaFila = (nombre, precio, descripcion, id) => {
    const fila = document.createElement('tr');

    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${precio}</td>
        <td>${descripcion}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_producto.html?id=${id}"
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
        const id = btn.id;
        productoService.eliminarProducto(id)
            .then(() => {
                alert("Producto eliminado");
                fila.remove(); // opcional: elimina la fila visualmente tras eliminar
            })
            .catch(() => alert("Error al eliminar el producto"));
    });

    return fila;
};

const table = document.querySelector("[data-table]");

productoService.listarProductos()
    .then(data => {
        data.forEach(({ nombre, precio, descripcion, id }) => {
            const nuevaFila = crearNuevaFila(nombre, precio, descripcion, id);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => alert("Ocurrió un error al cargar los productos"));

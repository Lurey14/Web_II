/*import { mascotaService } from "../service/mascota-service.js";

const crear_nueva_fila = (nombre, especie, edad, id, idMascota) => {
    const fila = document.createElement('tr');
    
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${especie}</td>
        <td>${edad}</td>
        <td>${id}</td>  <!-- Se usa 'id' que es el identificador -->
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_cliente.html?id=${id}"
                        class="simple-button simple-button--edit"
                    >Editar</a>
                </li>
                <li>
                    <button
                        class="simple-button simple-button--delete"
                        type="button" id="${idMascota}">  <!-- Corregir el ID del botón -->
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;

    const btn = fila.querySelector("button");

    btn.addEventListener("click", () => {
        const idMascota = btn.id;
        mascotaService.eliminarMascota(idMascota)
            .then(() => {
                alert("Mascota eliminada");
                fila.remove();
            })
            .catch((error) => {
                console.error("Error al eliminar la mascota:", error);
                alert("Error al eliminar la mascota");
            });
    });

    return fila;
};

const table = document.querySelector("[data-table]");

mascotaService.listarMascotas()
    .then(data => {
        data.forEach(({ nombre, especie, edad, id, idMascota }) => {
            const nuevaFila = crear_nueva_fila(nombre, especie, edad, id, idMascota);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => {
        console.error("Error al cargar las mascotas:", error);
        alert("Ocurrió un error al cargar las mascotas");
    });*/

import { mascotaService } from "../service/mascota-service.js";

const crear_nueva_fila = (nombre, especie, edad, cliente, id) => {
    const fila = document.createElement('tr');

    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${especie}</td>
        <td>${edad}</td>
        <td>${cliente}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_mascota.html?id=${id}"
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
        mascotaService.eliminarMascota(btn.id)
            .then(() => {
                alert("Mascota eliminada");
                fila.remove(); // Elimina la fila visualmente
            })
            .catch(() => alert("Error al eliminar la mascota"));
    });

    return fila;
};

const table = document.querySelector("[data-table]");

mascotaService.listarMascotas()
    .then(data => {
        data.forEach(({ nombre, especie, edad, cliente, id }) => {
            const nuevaFila = crear_nueva_fila(nombre, especie, edad, cliente, id);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => alert("Ocurrió un error al cargar las mascotas"));

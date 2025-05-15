/*import { mascotaService } from "../service/mascota-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const idMascota = url.searchParams.get("idMascota");

    if (!idMascota) {
        window.location.href = "../screens/error.html";
        return;
    }

    const nombre = document.querySelector("[data-nombre]");
    const especie = document.querySelector("[data-especie]");
    const edad = document.querySelector("[data-edad]");
    const id = document.querySelector("[data-id-cliente]");

    try {
        const mascota = await mascotaService.obtenerMascota(idMascota);

        if (mascota && mascota.nombre && mascota.especie && mascota.edad && mascota.id) {
            nombre.value = mascota.nombre;
            especie.value = mascota.especie;
            edad.value = mascota.edad;
            id.value = mascota.id;
        } else {
            throw new Error("Datos incompletos de la mascota");
        }
    } catch (error) {
        console.error("Error al obtener la mascota:", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const url = new URL(window.location);
    const idMascota = url.searchParams.get("idMascota");

    const nombre = document.querySelector("[data-nombre]").value;
    const especie = document.querySelector("[data-especie]").value;
    const edad = parseInt(document.querySelector("[data-edad]").value, 10);
    const id = document.querySelector("[data-id-cliente]").value;

    if (isNaN(edad)) {
        console.error("La edad debe ser un número válido.");
        window.location.href = "../screens/error.html";
        return;
    }

    mascotaService.actualizarMascota(nombre, especie, edad, id, idMascota)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch(error => {
            console.error("Error al actualizar mascota:", error);
            window.location.href = "../screens/error.html";
        });
});*/

import { mascotaService } from "../service/mascota-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
        window.location.href = "../screens/error.html";
        return;
    }

    const nombre = document.querySelector("[data-nombre]");
    const especie = document.querySelector("[data-especie]");
    const edad = document.querySelector("[data-edad]");
    const cliente = document.querySelector("[data-id-cliente]");

    try {
        const mascotas = await mascotaService.obtenerMascota(id);
        const mascota = Array.isArray(mascotas) ? mascotas[0] : mascotas;
        if (mascota && mascota.nombre && mascota.especie && mascota.edad && mascota.cliente) {
            nombre.value = mascota.nombre;
            especie.value = mascota.especie;
            edad.value = mascota.edad;
            cliente.value = mascota.cliente;
        } else {
            throw new Error("Datos incompletos de la mascota");
        }
    } catch (error) {
        console.error("Error al obtener la mascota:", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value;
    const especie = document.querySelector("[data-especie]").value;
    const edad = document.querySelector("[data-edad]").value;
    const cliente = document.querySelector("[data-id-cliente]").value;

    mascotaService.actualizarMascota(nombre, especie, edad, cliente, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch(error => {
            console.error("Error al actualizar mascota:", error);
            window.location.href = "../screens/error.html";
        });
});
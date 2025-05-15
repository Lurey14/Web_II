/*import { mascotaService } from "../service/mascota-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const especie = document.querySelector("[data-especie]").value;
    const edad = document.querySelector("[data-edad]").value;
    const id = document.querySelector("[data-id-cliente]").value;

    mascotaService.crearMascota(nombre, especie, edad, id)
        .then(() => {
            window.location.href = "../screens/registro_completado_mascota.html";
        })
        .catch(error => {
            console.error("Error al registrar mascota:", error);
            alert("Ocurrió un error al registrar la mascota");
        });
});*/

import { mascotaService } from "../service/mascota-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const especie = document.querySelector("[data-especie]").value;
    const edad = document.querySelector("[data-edad]").value;
    const cliente = document.querySelector("[data-id-cliente]").value;

    mascotaService
        .crearMascota(nombre, especie, edad, cliente)
        .then(() => {
            window.location.href = "../screens/registro_completado_mascota.html";
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "../screens/error.html";
        });
});

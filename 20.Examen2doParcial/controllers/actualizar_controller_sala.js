import { salaService } from "../service/sala-service.js";
const formulario = document.querySelector("[data-form]")
const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
        return;
    }
    const nombre = document.querySelector("[data-nombre]");
    const cantidad = document.querySelector("[data-cantidad]");
    try {
        const salasArray = await salaService.salas(id);
        const salas = salasArray[0];
        if (salas && salas.nombre && salas.cantidad) {
            nombre.value = salas.nombre;
            cantidad.value = salas.cantidad;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log("Catch error", error);
        window.location.href = "../screens/error.html";
    }
};
obtenerInfo();
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const url = new URL(window.location)
    const id =(url.searchParams.get("id"));

    const nombre= document.querySelector('[data-nombre]').value;
    const cantidad= document.querySelector('[data-cantidad]').value;
    salaService.actualizarSala(nombre,cantidad,id).then(()=>{
        window.location.href="../screens/edicion_concluida.html";
    });
})
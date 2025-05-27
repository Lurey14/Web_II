import { clienteService } from "../service/cliente-service.js";
const formulario = document.querySelector("[data-form]")
const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
        return;
    }
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");
    try {
        const clientesArray = await clienteService.clientes(id);
        const clientes = clientesArray[0];
        if (clientes && clientes.nombre && clientes.email) {
            nombre.value = clientes.nombre;
            email.value = clientes.email;
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
    const email= document.querySelector('[data-email]').value;
    clienteService.actualizarCliente(nombre,email,id).then(()=>{
        window.location.href="../screens/edicion_concluida.html";
    });
})
import { clienteService } from "../service/cliente-service.js";
const formulario=document.querySelector("[data-form]")
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const email= document.querySelector("[data-email]").value;

    clienteService.crearCliente(nombre,email).then((respuesta)=>{
        window.location.href="../screens/registro_completado_cliente.html"
    }).catch(error => console.log('error'))
});
import { clientService } from "../service/client-service.js";
import { productoService } from "../service/client-service.js";
const formulario=document.querySelector("[data-form]")
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;

    clientService.crearCliente(nombre,email).then((respuesta)=>{
        window.location.href="/15.Async-promesas-js/screens/registro_completado.html"
    }).catch(error => console.log(error))
});

//producto
const formularioProducto=document.querySelector("[data-form-p]")
formularioProducto.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre-p]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]")

    productoService.crearProducto(nombre,precio,descripcion).then((respuesta)=>{
        window.location.href="/15.Async-promesas-js/screens/registro_completado.html"
    }).catch(error => console.log(error))
});
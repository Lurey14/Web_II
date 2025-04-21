import { clientService } from "../service/client-service.js";
import { productoService } from "../service/client-service.js";
const formulario = document.querySelector("[data-form]")

const obtenerInfo=()=>{
    const url = new URL(window.location);
    const id = (url.searchParams.get('id'));
    if(id==null){
        window.location.href="../screens/error.html"
    }
    const nombre =document.querySelector("[data-nombre]")
    const email = document.querySelector("[data-email]")

    clientService.clientes(id).then((perfil)=>{
        nombre.value=perfil.nombre;
        email.value=perfil.email;
    });
};

obtenerInfo();

formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const url = new URL(window.location)
    const id =(url.searchParams.get('id'));

    const nombre= document.querySelector('[data-nombre]').value;
    const email= document.querySelector('[data-email]').value;
    clientService.actualizarCliente(nombre,email,id).then(()=>{
        window.location.href="../screens/edicion_concluida.html";
    });
})

//producto
const formularioProducto = document.querySelector("[data-form-p]")

const obtenerInfoProducto=()=>{
    const url = new URL(window.location);
    const id = (url.searchParams.get('id'));
    if(id==null){
        window.location.href="../screens/error.html"
    }
    const nombre =document.querySelector("[data-nombre-p]")
    const precio = document.querySelector("[data-precio]")
    const descripcion = document.querySelector("[data-descripcion]")

    productoService.producto(id).then((producto)=>{
        nombre.value=producto.nombre;
        precio.value=producto.precio;
        descripcion.value=producto.descripcion;
    });
};

obtenerInfoProducto();

formularioProducto.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const url = new URL(window.location)
    const id =(url.searchParams.get('id'));

    const nombre= document.querySelector('[data-nombre-p]').value;
    const precio= document.querySelector('[data-precio]').value;
    const descripcion= document.querySelector('[data-descripcion]').value;
    productoService.actualizarProducto(nombre,precio,descripcion,id).then(()=>{
        window.location.href="../screens/edicion_concluida.html";
    });
})
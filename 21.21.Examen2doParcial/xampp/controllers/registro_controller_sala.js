import { salaService } from "../service/sala-service.js";
const formulario=document.querySelector("[data-form]")
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const cantidad= document.querySelector("[data-cantidad]").value;

    salaService.crearSala(nombre,cantidad).then((respuesta)=>{
        window.location.href="../screens/registro_completado_sala.html"
    }).catch(error => console.log('error'))
});
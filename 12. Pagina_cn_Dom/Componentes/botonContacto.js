const botonContacto = (()=>{
    const contacto = document.querySelector('[contacto__form]');
    const nombreCon = document.querySelector('[contacto__input]');  
    const correoCon = document.querySelector('[contacto__input2]');
    const mensajeCon = document.querySelector('[contacto__textarea]');

    const datosContacto=()=>{ 
        return{
            nombre: nombreCon.value.trim(),
            correo: correoCon.value.trim(),
            mensaje: mensajeCon.value.trim(), 
        };
    };

    const reset =()=>{ 
        nombreCon.value='';
        correoCon.value=''; 
        mensajeCon.value=''; 
    };

    const datos =(callback)=>{
        botonContacto.addEventListener('submit',(evento)=>{
            evento.preventDefault();
            callback(datosContacto());
            reset();
        });
    };
    return {datos};
})();
export default botonContacto;
const checkComplete=()=>{
    const i =document.createElement('i')                             //creacion de un icono, es un componente creado
    i.classList.add("far","fa-check-square","icon")                  //añadir clase para que tenga estilo, dando estilos al icono
    if(checkComplete==true){
        i.addEventListener("click",color)
        return i;
    }
    else{
        i.addEventListener("click",sinColor)                                //llamar a la funcion color
        return i;
    }
}

const color =(evento)=>{
    const element= evento.target                                     //target devuelve la informacion
    element.classList.add('fas');
    element.classList.add('completeIcon');
    element.classList.remove('far');
};


const sinColor =(evento)=>{
    const element=evento.target
    element.classList.add('fas');
    element.classList.remove('completeIcon');
}
export default checkComplete;                                        //para que pueda ser exportado
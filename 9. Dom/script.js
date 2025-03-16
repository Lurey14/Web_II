(()=>{
const btn = document.querySelector('[data-form-btn]');
console.log(btn);

// crear funcion flecha
const createTask=(evento)=>{
    evento.preventDefault();
    const input =document.querySelector('[data-form-input]');
    console.log(input.value);                                           //esta data me sirve para recuperar el texto de mi input

    //ingresamos al data list, creamos elementos y seran del tipo 'card'
    const value = input.value;
    const list= document.querySelector('[data-list]');
    const task=document.createElement('li');
    task.classList.add('card');
    input.value='';
    /*const contenido=`<div>
              <i class="far fa-check-square icon"></i>
              <span class="task">${value}</span>
            </div>
            <i class="fas fa-trash-alt trashIcon icon"></i>
    `
    */
   const contTask=document.createElement('div');                      //crear elemento
   contTask.appendChild(checkComplete());
   const titleTask=document.createElement('span');                    //crear elemento

   titleTask.classList.add('task');
   titleTask.innerText=value;
   contTask.appendChild(titleTask);                                   //dentro de 'contTask agregamos un hijo el cual seria 'titleTask'
   const content =`<i class="fas fa-trash-alt trashIcon icon"></i>`

   task.appendChild(contTask)
   //task.innerHTML = contenido;
   list.appendChild(task);
   console.log(content);
}

btn.addEventListener('click',createTask);

const checkComplete=()=>{
    const i =document.createElement('i')                           //creacion de un icono
    i.classList.add("far","fa-check-square","icon")                 //añadir clase para que tenga estilo, dando estilos al icono
    i.addEventListener("click",color)                               //llamar a la funcion color
    return i;
}

const color =(evento)=>{
    const element= evento.target                                  //target devuelve la informacion
    element.classList.add('fas');
    element.classList.add('completeIcon');
    element.classList.remove('far');
};
})();
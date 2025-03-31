const postData =()=>{
    const newPost={
        titulo:"Nuevo post",                //creacion de una variable para la base de datos 
        descripcion: "nueva descripcion",
        fecha: new Date().toISOString()
    };
    fetch(API_URL,{                         //metodo en mayuscula
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(newPost)
    })
    .then(response =>{
        if(!response.ok){
            throw new error(`Error en la peticion get el estado es:${response.status}`)
        }
        return response.json();
    })
    .then(data => showResult(data))
    .catch(error =>showResult(error.message,true));
}
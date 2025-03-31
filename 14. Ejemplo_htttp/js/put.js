const putData =()=>{
    const update ={
        titulo:"Actualizado",
        descripcion:"actualizado",
        fecha:new Date().toISOString()
    };
    fetch(`${API_URL}/1`,{   //otro tipo de fetch ,el 1 hace referncia al identificador
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/jason"
        },
        body: JSON.stringify(update)
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
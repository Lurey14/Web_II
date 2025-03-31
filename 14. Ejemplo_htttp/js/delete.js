const deleteData = ()=>{
    fetch(`${API_URL}/1`,{
        method:"DELETE",
    })
    .then(response =>{
        if(!response.ok){
            throw new error(`Error en la peticion get el estado es:${response.status}`)
        }
        showResult({message:"El post con id 1 ha sido eliminado",
            status:response.status
        });
    })
    .catch(error =>showResult(error.message,true));
}
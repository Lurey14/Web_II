const API_URL='http://localhost:3000/posts' //este enlace se recupera de la conexion del archivo json  que hicimos en la terminal

const getData = ()=>{
    fetch(API_URL) //funcion sirve como conexion sirve para realizar conexion al servidor
        .then(response =>{
            if(!response.ok){
                throw new Error( `Error en la peticion get el estado es:${response.status}`)
            }
            return response.json()
        })
        .then(data => showResult(data))
        .catch(error =>showResult(error.message,true));
}
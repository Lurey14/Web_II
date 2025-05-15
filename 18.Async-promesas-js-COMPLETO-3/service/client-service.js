/*const crear_nueva_fila=(nombre,email)=>{// recepciono datos 
    const fila = document.createElement('tr');// creo una nueva filla en la tabla
    //guardo html en una variable y tambien llamo a mis datos de entrada
    const contenido = `
            <td class="td" data-td>
            ${nombre}
            </td>
            <td>${email}</td>
            <td>
            <ul class="table__button-control">
                <li>
                    <a
                    href="../screens/editar_cliente.html"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
                </li>
                <li>
                    <button
                    class="simple-button simple-button--delete"
                    type="button"
                    >
                    Eliminar
                    </button>
                </li>
                </ul>
            </td>
            `;
        fila.innerHTML=contenido;
        return fila; 
};


const table = document.querySelector("[data-table]");
*/

/*const lista_clientes=()=>{ metodo antiguo
    const promesa= new Promise((resolve,reject)=>{
        const http = new XMLHttpRequest();//variable con request http y xml
        http.open("GET","http://localhost:3000/perfil");
        http.send();
        http.onload=()=>{
            const response = JSON.parse(http.response);//convierto que mi respuesta hhtp sea json
            if(http.response>=400){
                reject(response)
            } else{
                resolve(response)
            }
        };
    });
    return promesa;
}*/



/*
lista_clientes()
    .then((data)=>{
        data.forEach((perfil)=>{
            const nuevafila= crear_nueva_fila(perfil.nombre,perfil.email);
            table.appendChild(nuevafila)
        });
    })
    .catch((error)=> alert("No existe conexión"));

*/

//---------optimizado---------
/*const listaclientes=()=> fetch("http://localhost:3000/perfil").then((respuesta)=>respuesta.json());
const crearCliente=(nombre,email)=>{
    return fetch ("http://localhost:3000/perfil",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({nombre,email, id: uuid.v4()})
    });

};
const eliminarCliente=(id)=>{
    console.log("elii",id)
    return fetch(`http://localhost:3000/perfil/${id}`,{
        method:"DELETE"
    });

;}
// referencia a un cliente del json a travez de id
const clientes=(id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta)=>respuesta.json())}

const actualizarCliente=(nombre,email,id)=>{ // ojoooo solo actualizo nombre y email NO ID
    return fetch(`http://localhost:3000/perfil/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({nombre,email})

        }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
};



export const clientService={
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};*/

//PARTE PHP

/*const API_BASE_URL='http://localhost/api/conexion.php';
const listaclientes = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            console.log(response); // Verifica la respuesta
            if (!response.ok) throw new Error("Error clientes");
            return response.json();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            throw error;
        });
};
const crearCliente=(nombre,email)=>{
    return fetch(API_BASE_URL,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nombre,email,id:uuid.v4()})
    }).then(response=>{
        if(!response.ok)throw new Error("error crear clientes");
        return response.json();
    })
};
const eliminarCliente=(id)=>{
    return fetch(`${API_BASE_URL}?id=${id}`,{
        method:"DELETE"
    });
}
const clientes=(id)=>{
    return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta)=>respuesta.json())};

const actualizarCliente=(nombre,email,id)=>{ // ojoooo solo actualizo nombre y email NO ID
        return fetch(API_BASE_URL,
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({nombre,email,id})
    
            }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
    };
    
    export const clientService={
        listaclientes,
        crearCliente,
        eliminarCliente,
        clientes,
        actualizarCliente
    };*/

//variables de conexion
const SUPABASE_URL = 'https://essevdapyxaxabtsvhio.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzc2V2ZGFweXhheGFidHN2aGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5ODAsImV4cCI6MjA2MjQ1Mjk4MH0.ddQPMZRxAcU9L_8ApGBit7_CMm5tethWyBF0ELog_eM';
const TABLE = 'clientes';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`; //me indica a que tabla conectarme
const HEADERS = {
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
};

//funciones de llamado a rest
const listaclientes = () => {
    return fetch(`${API_URL}?select=*`,{headers:HEADERS})
    .then(res=>{
        if(!res.ok)throw new Error('error en listar clientes');
        return res.json();
    });
};
const crearCliente=(nombre,email)=>{
    const cliente={
        nombre,
        email,
        id:uuid.v4()
    };
    return fetch(API_URL,{
        method:'POST',
        headers:HEADERS,
        body:JSON.stringify(cliente)
    })
    .then(async (res)=>{
        if(!res.ok){
            const text=await res.text(); //responde el error en texto para ubicarme
            throw new Error(text || 'error al insertar cliente');
        }
        const text= await res.text();
        return text ? JSON.parse(text):cliente; //si todo bien nos devuelve el cliente
    }).catch((error)=>{
        console.error("error al crear cliente:",error);
        throw error;
    });
};
const eliminarCliente=(id)=>{ //valor de entrada da referencia a elemento eliminar
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'DELETE',
        headers:HEADERS
    })
    //hacer then y catch
};
const clientes=(id)=>{
    return fetch(`${API_URL}?id=eq.${id}`,{
        headers:HEADERS
    })
    //hacer then y catch
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener cliente');
        return res.json();
    })
    .catch(error => {
        console.error("Error en clientes:", error);
        throw error;
    });
};
const actualizarCliente=(nombre,email,id)=>{
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        headers:{
            ...HEADERS,
            'Prefer':'return=representation'
        },
        body:JSON.stringify({nombre,email})
    })
    //hacer then y catch
};
export const clientService={
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};

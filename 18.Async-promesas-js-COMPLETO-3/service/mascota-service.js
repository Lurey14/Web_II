/*const API_MASCOTAS_URL = 'http://localhost/api/mascotas.php';

const listarMascotas = () => {
    return fetch(API_MASCOTAS_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener mascotas");
            return response.json();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            throw error;
        });
};

const crearMascota = (nombre, especie, edad, cliente) => {
    return fetch(API_MASCOTAS_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: uuid.v4(), nombre, especie, edad, cliente })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear mascota");
        return response.json();
    });
};

const eliminarMascota = (id) => {
    return fetch(`${API_MASCOTAS_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar mascota");
        return response.json();
    });
};

const obtenerMascota = (id) => {
    return fetch(`${API_MASCOTAS_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener mascota");
            return response.json();
        });
};

const actualizarMascota = (nombre, especie, edad, cliente, id) => {
    return fetch(API_MASCOTAS_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, especie, edad, cliente, id })
    }).then(response => {
        if (!response.ok) throw new Error("Error al actualizar mascota");
        return response.json();
    }).catch(err => console.log(err));
};

export const mascotaService = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    obtenerMascota,
    actualizarMascota
};*/

const SUPABASE_URL = 'https://essevdapyxaxabtsvhio.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzc2V2ZGFweXhheGFidHN2aGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5ODAsImV4cCI6MjA2MjQ1Mjk4MH0.ddQPMZRxAcU9L_8ApGBit7_CMm5tethWyBF0ELog_eM';
const TABLE = 'mascotas';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
};

const listarMascotas = () => {
    return fetch(`${API_URL}?select=*`,{headers:HEADERS})
        .then(res=>{
        if(!res.ok)throw new Error('error en listar mascotas');
        return res.json();
    });
};

const crearMascota = (nombre, especie, edad, cliente) => {
    const mascota={
        nombre,
        especie,
        edad,
        cliente,
        id:uuid.v4()
    };
    return fetch(API_URL,{
        method:'POST',
        headers:HEADERS,
        body:JSON.stringify(mascota)
    })
    .then(async (res)=>{
        if(!res.ok){
            const text=await res.text();
            throw new Error(text || 'error al insertar mascota');
        }
        const text= await res.text();
        return text ? JSON.parse(text):mascota;
    }).catch((error)=>{
        console.error("error al crear mascota:",error);
        throw error;
    });
};

const eliminarMascota = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'DELETE',
        headers:HEADERS
    })
};

const obtenerMascota = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        headers:HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener mascota');
        return res.json();
    })
    .catch(error => {
        console.error("Error en mascota:", error);
        throw error;
    });
};

const actualizarMascota = (nombre, especie, edad, cliente, id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        headers:{
            ...HEADERS,
            'Prefer':'return=representation'
        },
        body:JSON.stringify({nombre,especie,edad,cliente})
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar mascota');
        return res.json();
    });
};

export const mascotaService = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    obtenerMascota,
    actualizarMascota
};
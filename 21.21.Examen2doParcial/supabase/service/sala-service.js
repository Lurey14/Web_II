const SUPABASE_URL = 'https://djnnvufkodaytggyzmgj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqbm52dWZrb2RheXRnZ3l6bWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4NDEsImV4cCI6MjA2MzQ5NTg0MX0.ACl4ZIOeNOReT09ZFIOn8p_jUla_EXHgdRfX-G5_fqI';
const TABLE = 'sala';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
};

const listasalas = () => {
    return fetch(`${API_URL}?select=*`,{headers:HEADERS})
    .then(res=>{
        if(!res.ok)throw new Error('error en listar salas');
        return res.json();
    });
};
const crearSala=(nombre,cantidad)=>{
    const sala={
        nombre,
        cantidad,
        id:uuid.v4()
    };
    return fetch(API_URL,{
        method:'POST',
        headers:HEADERS,
        body:JSON.stringify(sala)
    })
    .then(async (res)=>{
        if(!res.ok){
            const text=await res.text();
            throw new Error(text || 'error al insertar cliente');
        }
        const text= await res.text();
        return text ? JSON.parse(text):sala;
    }).catch((error)=>{
        console.error("error al crear cliente:",error);
        throw error;
    });
};
const eliminarSala=(id)=>{
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'DELETE',
        headers:HEADERS
    })
};
const salas=(id)=>{
    return fetch(`${API_URL}?id=eq.${id}`,{
        headers:HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener sala');
        return res.json();
    })
    .catch(error => {
        console.error("Error en salas:", error);
        throw error;
    });
};
const actualizarSala=(nombre,cantidad,id)=>{
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        headers:{
            ...HEADERS,
            'Prefer':'return=representation'
        },
        body:JSON.stringify({nombre,cantidad})
    })
};
const buscarSalasPorNombre = (nombre) => {
    return fetch(`${API_URL}?nombre=ilike.*${encodeURIComponent(nombre)}*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar salas');
        return res.json();
    });
};
export const salaService={
    listasalas,
    crearSala,
    eliminarSala,
    salas,
    actualizarSala,
    buscarSalasPorNombre
};
const SUPABASE_URL = 'https://djnnvufkodaytggyzmgj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqbm52dWZrb2RheXRnZ3l6bWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4NDEsImV4cCI6MjA2MzQ5NTg0MX0.ACl4ZIOeNOReT09ZFIOn8p_jUla_EXHgdRfX-G5_fqI';
const TABLE = 'pelicula';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
};

const listarPeliculas = () => {
    return fetch(`${API_URL}?select=*`,{headers:HEADERS})
        .then(res=>{
        if(!res.ok)throw new Error('error en listar peliculas');
        return res.json();
    });
};

const crearPelicula = (horario, nombre, sala, boleto) => {
    const pelicula={
        horario,
        nombre,
        sala,
        boleto,
        id:uuid.v4()
    };
    return fetch(API_URL,{
        method:'POST',
        headers:HEADERS,
        body:JSON.stringify(pelicula)
    })
    .then(async (res)=>{
        if(!res.ok){
            const text=await res.text();
            throw new Error(text || 'error al insertar pelicula');
        }
        const text= await res.text();
        return text ? JSON.parse(text):pelicula;
    }).catch((error)=>{
        console.error("error al crear pelicula:",error);
        throw error;
    });
};

const eliminarPelicula = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'DELETE',
        headers:HEADERS
    })
};

const obtenerPelicula = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        headers:HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener pelicula');
        return res.json();
    })
    .catch(error => {
        console.error("Error en pelicula:", error);
        throw error;
    });
};

const actualizarPelicula = (horario, nombre, sala, boleto, id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        headers:{
            ...HEADERS,
            'Prefer':'return=representation'
        },
        body:JSON.stringify({horario,nombre,sala,boleto})
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar pelicula');
        return res.json();
    });
};
const buscarPeliculaPorNombre = (nombre) => {
    return fetch(`${API_URL}?nombre=ilike.*${encodeURIComponent(nombre)}*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar pelicula');
        return res.json();
    });
};

export const peliculaService = {
    listarPeliculas,
    crearPelicula,
    eliminarPelicula,
    obtenerPelicula,
    actualizarPelicula,
    buscarPeliculaPorNombre
};
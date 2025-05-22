const SUPABASE_URL = 'https://djnnvufkodaytggyzmgj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqbm52dWZrb2RheXRnZ3l6bWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4NDEsImV4cCI6MjA2MzQ5NTg0MX0.ACl4ZIOeNOReT09ZFIOn8p_jUla_EXHgdRfX-G5_fqI';
const TABLE = 'cliente';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
};

const listacliente = () => {
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
            const text=await res.text();
            throw new Error(text || 'error al insertar cliente');
        }
        const text= await res.text();
        return text ? JSON.parse(text):cliente;
    }).catch((error)=>{
        console.error("error al crear cliente:",error);
        throw error;
    });
};
const eliminarCliente=(id)=>{
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'DELETE',
        headers:HEADERS
    })
};
const clientes=(id)=>{
    return fetch(`${API_URL}?id=eq.${id}`,{
        headers:HEADERS
    })
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
};
const buscarClientesPorNombre = (nombre) => {
    return fetch(`${API_URL}?nombre=ilike.*${encodeURIComponent(nombre)}*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar clientes');
        return res.json();
    });
};
export const clienteService={
    listacliente,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente,
    buscarClientesPorNombre
};
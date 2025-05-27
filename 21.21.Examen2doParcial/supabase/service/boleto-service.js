const SUPABASE_URL = 'https://djnnvufkodaytggyzmgj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqbm52dWZrb2RheXRnZ3l6bWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTk4NDEsImV4cCI6MjA2MzQ5NTg0MX0.ACl4ZIOeNOReT09ZFIOn8p_jUla_EXHgdRfX-G5_fqI';
const TABLE = 'boleto';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
};

const listarBoleto = () => {
    return fetch(`${API_URL}?select=*`,{headers:HEADERS})
        .then(res=>{
        if(!res.ok)throw new Error('error en listar boletos');
        return res.json();
    });
};

const crearBoleto = (precio, cliente) => {
    const boleto={
        precio,
        cliente,
        id:uuid.v4()
    };
    return fetch(API_URL,{
        method:'POST',
        headers:HEADERS,
        body:JSON.stringify(boleto)
    })
    .then(async (res)=>{
        if(!res.ok){
            const text=await res.text();
            throw new Error(text || 'error al insertar boleto');
        }
        const text= await res.text();
        return text ? JSON.parse(text):boleto;
    }).catch((error)=>{
        console.error("error al crear boleto:",error);
        throw error;
    });
};

const eliminarBoleto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'DELETE',
        headers:HEADERS
    })
};

const obtenerBoleto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        headers:HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener boleto');
        return res.json();
    })
    .catch(error => {
        console.error("Error en boleto:", error);
        throw error;
    });
};

const actualizarBoleto = (precio, cliente, id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        headers:{
            ...HEADERS,
            'Prefer':'return=representation'
        },
        body:JSON.stringify({precio,cliente})
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar boleto');
        return res.json();
    });
};
const buscarBoletoPorPrecio = (precio) => {
    return fetch(`${API_URL}?nombre=ilike.*${encodeURIComponent(precio)}*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar precios');
        return res.json();
    });
};

export const boletoService = {
    listarBoleto,
    crearBoleto,
    eliminarBoleto,
    obtenerBoleto,
    actualizarBoleto,
    buscarBoletoPorPrecio
};
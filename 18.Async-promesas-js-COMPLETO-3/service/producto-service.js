/*const API_BASE_URL = 'http://localhost/api/productos.php';

const listarProductos = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al listar productos");
            return response.json();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            throw error;
        });
};

const crearProducto = (nombre, precio, descripcion) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre,
            precio: parseFloat(precio),
            descripcion
        })
        }).then(response => {
        if (!response.ok) throw new Error("Error al crear producto");
        return response.json();
        });
};

const eliminarProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    });
};

const obtenerProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener producto");
            return response.json();
        });
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            nombre,
            precio: parseFloat(precio),
            descripcion
        })
    }).then(response => {
        if (!response.ok) throw new Error("Error al actualizar producto");
        return response.json();
    });
};

export const productoService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    actualizarProducto
};*/
const SUPABASE_URL = 'https://essevdapyxaxabtsvhio.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzc2V2ZGFweXhheGFidHN2aGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5ODAsImV4cCI6MjA2MjQ1Mjk4MH0.ddQPMZRxAcU9L_8ApGBit7_CMm5tethWyBF0ELog_eM';
const TABLE = 'productos';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`; //me indica a que tabla conectarme
const HEADERS = {
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
};
const listarProductos = () => {
    return fetch(`${API_URL}?select=*`,{headers:HEADERS})
        .then(response => {
            if (!response.ok) throw new Error("Error al listar productos");
            return response.json();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            throw error;
        });
};
const crearProducto = (nombre, precio, descripcion) => {
    const producto={
        nombre,
        precio,
        descripcion,
        id:uuid.v4()
    };
    return fetch(API_URL,{
        method:'POST',
        headers:HEADERS,
        body:JSON.stringify(producto)
    })
    .then(async (res)=>{
        if(!res.ok){
            const text=await res.text();
            throw new Error(text || 'error al insertar producto');
        }
        const text= await res.text();
        return text ? JSON.parse(text):producto;
    }).catch((error)=>{
        console.error("error al crear producto:",error);
        throw error;
    });
};
const eliminarProducto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'DELETE',
        headers:HEADERS
    })
};

const obtenerProducto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        headers:HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener producto');
        return res.json();
    })
    .catch(error => {
        console.error("Error en producto:", error);
        throw error;
    });
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        headers:{
            ...HEADERS,
            'Prefer':'return=representation'
        },
        body:JSON.stringify({nombre,precio,descripcion})
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al actualizar producto");
        return response.json();
    });
};
export const productoService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    actualizarProducto
};

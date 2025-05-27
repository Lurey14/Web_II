const API_URL = "http://localhost:3000/boleto";

// Listar todos los boletos
const listarBoleto = () => {
    return fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('error en listar boletos');
            return res.json();
        });
};

// Crear un boleto
const crearBoleto = (precio, cliente) => {
    const boleto = {
        precio,
        cliente,
        id: uuid.v4()
    };
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(boleto)
    })
    .then(res => {
        if (!res.ok) throw new Error('error al insertar boleto');
        return res.json();
    });
};

// Eliminar un boleto por id
const eliminarBoleto = (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
};

// Obtener un boleto por id
const obtenerBoleto = (id) => {
    return fetch(`${API_URL}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener boleto');
            return res.json();
        });
};

// Actualizar un boleto
const actualizarBoleto = (precio, cliente, id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ precio, cliente })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar boleto');
        return res.json();
    });
};

// Buscar boletos por precio (búsqueda parcial)
const buscarBoletoPorPrecio = (precio) => {
    return fetch(`${API_URL}?precio_like=${encodeURIComponent(precio)}`)
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
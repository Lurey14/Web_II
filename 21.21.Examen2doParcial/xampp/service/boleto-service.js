const API_BASE_URL = 'http://localhost/api/boleto.php';

const listarBoleto = () => {
    return fetch(API_BASE_URL)
        .then(res => {
            if (!res.ok) throw new Error('Error en listar boletos');
            return res.json();
        });
};

const crearBoleto = (precio, cliente) => {
    const boleto = {
        precio,
        cliente,
        id: uuid.v4()
    };
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(boleto)
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al insertar boleto');
        return res.json();
    });
};

const eliminarBoleto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    });
};

const obtenerBoleto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener boleto');
            return res.json();
        });
};

const actualizarBoleto = (precio, cliente, id) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ precio, cliente, id })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar boleto');
        return res.json();
    });
};

const buscarBoletoPorPrecio = (precio) => {
    return fetch(`${API_BASE_URL}?precio=${encodeURIComponent(precio)}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar boletos por precio');
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
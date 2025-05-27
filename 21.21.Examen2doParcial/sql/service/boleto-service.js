const API_URL = "http://localhost/api/boleto_sql.php";

const listarBoletos = () => {
    return fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('No se puede mostrar la lista de boletos');
            return res.json();
        });
};

const crearBoleto = (precio, cliente) => {
    const boleto = { precio: String(precio), cliente: String(cliente), id: uuid.v4() };
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boleto)
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo crear un nuevo boleto');
        return res.json();
    });
};

const eliminarBoleto = (id) => {
    return fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo eliminar el boleto');
        return res.json();
    });
};

const obtenerBoleto = (id) => {
    return fetch(`${API_URL}?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error('No se pudo obtener el boleto');
            return res.json();
        });
};

const actualizarBoleto = (precio, cliente, id) => {
    return fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, precio: String(precio), cliente: String(cliente) })
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo actualizar el boleto');
        return res.json();
    });
};

const buscarBoletosPorPrecio = (precio) => {
    return fetch(`${API_URL}?precio=${encodeURIComponent(precio)}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar boletos');
            return res.json();
        });
};

export const boletoService = {
    listarBoletos,
    crearBoleto,
    eliminarBoleto,
    obtenerBoleto,
    actualizarBoleto,
    buscarBoletosPorPrecio
};
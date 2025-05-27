const API_BASE_URL = 'http://localhost/api/cliente.php';

const listacliente = () => {
    return fetch(API_BASE_URL)
        .then(res => {
            if (!res.ok) throw new Error('Error en listar clientes');
            return res.json();
        });
};

const crearCliente = (nombre, email) => {
    const cliente = {
        nombre,
        email,
        id: uuid.v4()
    };
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al insertar cliente');
        return res.json();
    });
};

const eliminarCliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    });
};

const clientes = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener cliente');
            return res.json();
        });
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, id })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar cliente');
        return res.json();
    });
};

const buscarClientesPorNombre = (nombre) => {
    return fetch(`${API_BASE_URL}?nombre=${encodeURIComponent(nombre)}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar clientes');
            return res.json();
        });
};

export const clienteService = {
    listacliente,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente,
    buscarClientesPorNombre
};
const API_URL = "http://localhost/api/cliente_sql.php";

const listaClientes = () => {
    return fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('No se puede mostrar la lista de clientes');
            return res.json();
        });
};

const crearCliente = (nombre, email) => {
    const cliente = { nombre, email, id: uuid.v4() };
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo crear un nuevo cliente');
        return res.json();
    });
};

const eliminarCliente = (id) => {
    return fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo eliminar el cliente');
        return res.json();
    });
};

const obtenerCliente = (id) => {
    return fetch(`${API_URL}?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error('No se pudo obtener el cliente');
            return res.json();
        });
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, nombre, email })
    }).then(res => {
        if (!res.ok) {
            return res.text().then(texto => {
                throw new Error(`Error del servidor: ${texto}`);
            });
        }
        return res.json();
    });
};

const buscarClientesPorNombre = (nombre) => {
    return fetch(`${API_URL}?nombre=${encodeURIComponent(nombre)}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar clientes');
            return res.json();
        });
};

export const clienteService = {
    listaClientes,
    crearCliente,
    eliminarCliente,
    obtenerCliente,
    actualizarCliente,
    buscarClientesPorNombre
};
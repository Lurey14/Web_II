const API_URL = "http://localhost:3000/cliente";

// Listar todos los clientes
const listacliente = () =>
    fetch(API_URL).then(res => {
        if (!res.ok) throw new Error('error en listar clientes');
        return res.json();
    });

// Crear un cliente
const crearCliente = (nombre, email) => {
    const cliente = {
        nombre,
        email,
        id: uuid.v4()
    };
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    })
    .then(res => {
        if (!res.ok) throw new Error('error al insertar cliente');
        return res.json();
    });
};

// Eliminar un cliente por id
const eliminarCliente = (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
};

// Obtener un cliente por id
const clientes = (id) => {
    return fetch(`${API_URL}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener cliente');
            return res.json();
        });
};

// Actualizar un cliente (solo nombre y email)
const actualizarCliente = (nombre, email, id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar cliente');
        return res.json();
    });
};

// Buscar clientes por nombre (filtro simple)
const buscarClientesPorNombre = (nombre) => {
    return fetch(`${API_URL}?nombre_like=${encodeURIComponent(nombre)}`)
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
const API_URL = "http://localhost:3000/sala";

const listasalas = () => {
    return fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('error en listar salas');
            return res.json();
        });
};

const crearSala = (nombre, cantidad) => {
    const sala = {
        nombre,
        cantidad,
        id: uuid.v4()
    };
    return fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sala)
    })
    .then(res => {
        if (!res.ok) throw new Error('error al insertar sala');
        return res.json();
    });
};

const eliminarSala = (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
};

const salas = (id) => {
    return fetch(`${API_URL}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener sala');
            return res.json();
        });
};

const actualizarSala = (nombre, cantidad, id) => {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, cantidad })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar sala');
        return res.json();
    });
};

const buscarSalasPorNombre = (nombre) => {
    return fetch(`${API_URL}?nombre_like=${encodeURIComponent(nombre)}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar salas');
            return res.json();
        });
};

export const salaService = {
    listasalas,
    crearSala,
    eliminarSala,
    salas,
    actualizarSala,
    buscarSalasPorNombre
};
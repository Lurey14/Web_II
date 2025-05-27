const API_BASE_URL = 'http://localhost/api/sala.php';

const listasalas = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al listar salas");
            return response.json();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            throw error;
        });
};

const crearSala = (nombre, cantidad) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, cantidad, id: uuid.v4() })
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al crear sala");
        return response.json();
    });
};

const eliminarSala = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    });
};

const salas = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener sala");
            return response.json();
        });
};

const actualizarSala = (nombre, cantidad, id) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, cantidad, id })
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al actualizar sala");
        return response.json();
    });
};

const buscarSalasPorNombre = (nombre) => {
    return fetch(`${API_BASE_URL}?nombre=${encodeURIComponent(nombre)}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al buscar salas");
            return response.json();
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
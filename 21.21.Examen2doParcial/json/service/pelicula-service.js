const API_URL = "http://localhost:3000/pelicula";

const listarPeliculas = () => {
    return fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('error en listar peliculas');
            return res.json();
        });
};

const crearPelicula = (horario, nombre, sala, boleto) => {
    const pelicula = {
        horario,
        nombre,
        sala,
        boleto,
        id: uuid.v4()
    };
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula)
    })
    .then(res => {
        if (!res.ok) throw new Error('error al insertar pelicula');
        return res.json();
    });
};

const eliminarPelicula = (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
};

const obtenerPelicula = (id) => {
    return fetch(`${API_URL}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener pelicula');
            return res.json();
        });
};

const actualizarPelicula = (horario, nombre, sala, boleto, id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horario, nombre, sala, boleto })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar pelicula');
        return res.json();
    });
};

const buscarPeliculaPorNombre = (nombre) => {
    return fetch(`${API_URL}?nombre_like=${encodeURIComponent(nombre)}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar pelicula');
            return res.json();
        });
};

export const peliculaService = {
    listarPeliculas,
    crearPelicula,
    eliminarPelicula,
    obtenerPelicula,
    actualizarPelicula,
    buscarPeliculaPorNombre
};
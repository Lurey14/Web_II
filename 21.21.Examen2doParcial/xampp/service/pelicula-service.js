const API_BASE_URL = 'http://localhost/api/pelicula.php';

const listarPeliculas = () => {
    return fetch(API_BASE_URL)
        .then(res => {
            if (!res.ok) throw new Error('Error en listar peliculas');
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
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula)
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al insertar pelicula');
        return res.json();
    });
};

const eliminarPelicula = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    });
};

const obtenerPelicula = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener pelicula');
            return res.json();
        });
};

const actualizarPelicula = (horario, nombre, sala, boleto, id) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horario, nombre, sala, boleto, id })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar pelicula');
        return res.json();
    });
};

const buscarPeliculaPorNombre = (nombre) => {
    return fetch(`${API_BASE_URL}?nombre=${encodeURIComponent(nombre)}`)
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
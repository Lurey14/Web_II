const API_URL = "http://localhost/api/pelicula_sql.php";

const listarPeliculas = () => {
    return fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('No se puede mostrar la lista de peliculas');
            return res.json();
        });
};

const crearPelicula = (horario, nombre, sala, boleto) => {
    const pelicula = { horario, nombre, sala, boleto, id: uuid.v4() };
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pelicula)
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo crear una nueva pelicula');
        return res.json();
    });
};

const eliminarPelicula = (id) => {
    return fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo eliminar la pelicula');
        return res.json();
    });
};

const obtenerPelicula = (id) => {
    return fetch(`${API_URL}?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error('No se pudo obtener la pelicula');
            return res.json();
        });
};

const actualizarPelicula = (horario, nombre, sala, boleto, id) => {
    return fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, horario, nombre, sala, boleto })
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo actualizar la pelicula');
        return res.json();
    });
};

const buscarPeliculaPorNombre = (nombre) => {
    return fetch(`${API_URL}?nombre=${encodeURIComponent(nombre)}`)
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
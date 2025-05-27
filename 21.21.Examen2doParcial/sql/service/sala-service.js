const API_URL = "http://localhost/api/sala_sql.php";

const listaSalas = () => {
    return fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('No se puede mostrar la lista de salas');
            return res.json();
        });
};

const crearSala = (nombre, cantidad) => {
    const sala = { nombre: String(nombre), cantidad: String(cantidad), id: uuid.v4() };
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sala)
    }).then(res => {
        if (!res.ok) {
            return res.text().then(texto => {
                throw new Error(`No se pudo crear una nueva sala. Detalle: ${texto}`);
            });
        }
        return res.json();
    });
};

const eliminarSala = (id) => {
    return fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(res => {
        if (!res.ok) throw new Error('No se pudo eliminar la sala');
        return res.json();
    });
};

const obtenerSala = (id) => {
    return fetch(`${API_URL}?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error('No se pudo obtener la sala');
            return res.json();
        });
};

const actualizarSala = (nombre, cantidad, id) => {
    return fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, nombre: String(nombre), cantidad: String(cantidad) })
    }).then(res => {
        if (!res.ok) {
            return res.text().then(texto => {
                throw new Error(`Error del servidor: ${texto}`);
            });
        }
        return res.json();
    });
};

export const salaService = {
    listaSalas,
    crearSala,
    eliminarSala,
    obtenerSala,
    actualizarSala
};
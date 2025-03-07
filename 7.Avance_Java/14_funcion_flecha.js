const datos = [
    {
        'materia':'Programacion Web',
        'calificacion':70
    },
    {
        'materia':'Base de Datos II',
        'calificacion':10
    },
    {
        'materia':'Robotica',
        'calificacion':10
    },
    {
        'materia':'Ingles III',
        'calificacion':80
    },
    {
        'materia':'Programacion III',
        'calificacion':90
    },
    {
        'materia':'Programacion Movil I',
        'calificacion':80
    },
    {
        'materia':'IoT',
        'calificacion':70
    },
    {
        'materia':'Electronica Digital',
        'calificacion':90
    },
    {
        'materia':'Fundamentos de Software',
        'calificacion':80
    },
    {
        'materia':'Sistemas Operativos',
        'calificacion':70
    },
    {
        'materia':'Matematica Computacional',
        'calificacion':90
    }
];
const procesarDatos = datos => {
    return datos
        .filter(datos => datos.calificacion > 51)
        .map(datos => {
            const {materia} = datos;
            return materia.length > 5 ? materia.toUpperCase() : materia.toLowerCase(); // ? = operador terniario, como tener un if mas sencillo (si)
        });
}
const resultado = procesarDatos(datos);
console.log(resultado);
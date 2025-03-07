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
let materiaSeleccionada = '';
const notaAprobacion = 51;
for(let i = 0; i < datos.length && notaAprobacion == ''; i++){
    if(datos[i].calificacion <= notaAprobacion){
        materiaSeleccionada = datos[i].materia;
    }
}
if(materiaSeleccionada == ""){
    console.log("--..");
}
else{
    console-log("----------");
}
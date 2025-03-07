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
const NotaAprobacion = 51;
let i = 0;
let materiaSeleccionada = '';
do{
    if(datos[i].calificacion >= NotaAprobacion){
        materiaSeleccionada = datos[i].materia;
        break;
    }
    i++;
}
while(i < datos.length && materiaSeleccionada == ''){
    if(materiaSeleccionada == ''){
        console.log('no aprobaste las materias')
    }
    else{
        console.log('la materia aprobada es: ' + materiaSeleccionada)
    }
}
    
    
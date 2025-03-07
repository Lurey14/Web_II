let edadPersonal = 17;
let conAcompanante = true;
const precioPasaje = 1000;
const ciudadDestino = "Sucre";
const ciudadesDisponibles = new Array("Santiago","Bogota","Lima","MonteVideo");

if(precioPasaje === 1000){
    console.log('el pasaje cuesta 1000');
}

console.log(`Verficando pasaje para ${ciudadDestino}`);
if((ciudadesDisponibles.indexOf(ciudadDestino) > -1) && (edadPasajero >= 18)|| conAcompanante){
    console.log('pasaje disponible');
}
else{
    console.log('pasaje no disponible');
}
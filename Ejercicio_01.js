const numeros = new Array(1,2,3,4,5,6,7,8,9,10,11);
console.log(numeros);

let suma1 = 0;
let suma2 = 0;
for (let i = 1; i <= numeros.length; i++){
    if (i % 2 == 0){
        suma1++;

    }
    else{
        suma2++;
    }
}
console.log('Numeros pares: ' + suma1);
console.log('Numeros impares: ' + suma2);
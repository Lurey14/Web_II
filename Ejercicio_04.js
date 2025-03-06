let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];  
let primos = [];

for (let i = 0; i < numeros.length; i++){  
    let num = numeros[i];  
    let contador = 0;
    for (let j = 1; j <= num; j++){  
        if (num % j === 0) {  
            contador++;  
        }  
    }  
    if (contador === 2){  
        primos.push(num);  
    }  
}  
console.log(primos);
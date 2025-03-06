let frase = "El universo es un lugar abismal y magnifico."
let palabra = frase.split(' ');  
let largo = "";  
for (let i = 0; i < palabra.length; i++){  
    if (palabra[i].length > largo.length){  
        largo = palabra[i];  
    }  
}  
console.log(largo);
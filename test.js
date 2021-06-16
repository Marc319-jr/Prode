const { json } = require("express");
const Jugado = {
    "local": 1,
    "visitante": 0,
};
const Pedro = {
    "local": 1,
    "visitante": 0,
    "puntos" : 0
};
const resultadoPartido = function(resultadoA,resultadoB) {
    let resultado = resultadoA - resultadoB;
    let stringResultado;
    if(resultado == 0){
        stringResultado = "Empate"
    } else if(resultado > 0){
        stringResultado = "Local"
    }else if(resultado < 0){
        stringResultado = "Visita"
    }
    return stringResultado
}

const sumaPuntos = function(Partido, Prode) {
    if(Partido == Prode) {
        if(Pedro.local == Jugado.local && Pedro.visitante == Jugado.visitante){
            Pedro.puntos = Pedro.puntos + 3
        } else {
            Pedro.puntos = Pedro.puntos + 1
        }
    }else {
        Pedro.puntos = Pedro.puntos
    }
    return Pedro.puntos
}
console.log(sumaPuntos(resultadoPartido(Pedro.local,Pedro.visitante), resultadoPartido(Jugado.local,Jugado.visitante)))
console.log(resultadoPartido(Pedro.local,Pedro.visitante))
console.log(resultadoPartido(Jugado.local,Jugado.visitante))
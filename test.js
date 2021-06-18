const { json } = require("express");
const Prode = require("./src/model/Prode");
const User = require("./src/model/User");
const allProdes = Prode.findAll()
const allUser = User.findAll()
const Jugado = {
    resultado : allProdes[0].grupos[0].partidos[0].resultado
};
const Pedro = {
    puntos : allUser[0].puntos,
    resultado: allUser[0].grupos[0].partidos[0].resultado
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

const sumaPuntos = function(comoSalio, Prode, persona, Partido) {
    if(comoSalio == Prode) {
        if(persona.resultado[0] == Partido.resultado[0] && persona.resultado[1] == Partido.resultado[1]){
            persona.puntos = (parseFloat(persona.puntos) + 3)
        } else {
            persona.puntos = (parseFloat(persona.puntos) + 1)
        }
    }else {
        persona.puntos = persona.puntos
    }
    return persona.puntos
}
const puntosPorPersona = function() {
    for (let p = 0; p < allUser.length; p++) {
        for (let i = 0; i < allUser.grupos.length; i++) {
            for (let j = 0; j < allUser.partidos.length; j++) {
                if(allProdes[0].resultados[0] != x && allProdes[0].resultados[1] != x){
                    sumaPuntos(resultadoPartido(allUser[p].grupos[i].partidos[j].resultado), resultadoPartido(allProdes[0].grupos[i].partidos[j].resultado),allUser[p].grupos[i].partidos[j].resultado,allProdes[0].grupos[0].partidos[0].resultado)
            
                }
            }
        }
        console.log(allUser[p].username)  
        console.log(allUser[p].puntos)
    }    
}
//console.log(sumaPuntos(resultadoPartido(Jugado.resultado[0],Jugado.resultado[1]), resultadoPartido(Pedro.resultado[0],Pedro.resultado[1]),Pedro,Jugado))
//console.log(resultadoPartido(Pedro.resultado[0],Pedro.resultado[1]))
//console.log(resultadoPartido(Jugado.resultado[0],Jugado.resultado[1]))

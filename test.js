const { json } = require("express");
const Prode = require("./src/model/Prode");
const User = require("./src/model/User");
const allProdes = Prode.findAll()
const allUser = User.findAll()
const Jugado = {
    resultado : allProdes[0].grupos[0].partidos[0].resultado
};
const partidos =  allProdes[0].grupos[0].partidos
const grupos = allProdes[0].grupos

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
    puntos = 0
    if(comoSalio == Prode) {
        if(persona.resultado[0] == Partido.resultado[0] && persona.resultado[1] == Partido.resultado[1]){
            puntos = (parseFloat(puntos) + 3)
        } else {
            puntos = (parseFloat(puntos) + 1)
        }
    }else {
        puntos = puntos
    }
    return parseFloat(puntos)
}
const puntosPorPersona = function() {
    for (let p = 0; p < allUser.length; p++) {
        puntos = 0
        for (let i = 0; i < grupos.length; i++) {
            for (let j = 0; j < partidos.length; j++) {
                if(allProdes[0].grupos[i].partidos[j].resultado[0] != "x" && allProdes[0].grupos[i].partidos[j].resultado[1] != "x"){
                    puntos = puntos + sumaPuntos(resultadoPartido(allUser[p].grupos[i].partidos[j].resultado[0],allUser[p].grupos[i].partidos[j].resultado[1]), resultadoPartido(allProdes[0].grupos[i].partidos[j].resultado[0],allProdes[0].grupos[i].partidos[j].resultado[1]),allUser[p].grupos[i].partidos[j],allProdes[0].grupos[i].partidos[j])
            
                }
            }
        }
        console.log(allUser[p].username) 
        console.log(puntos)
    }    
}

//console.log(resultadoPartido(Pedro.resultado[0],Pedro.resultado[1]))
//console.log(resultadoPartido(Jugado.resultado[0],Jugado.resultado[1]))
puntosPorPersona()


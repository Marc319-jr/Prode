const fs = require('fs');
const Prode = require('./Prode');

const User ={
    filename: './src/data/users.JSON',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename , {encoding: 'utf-8'}));
    },

    findAll: function(){
        return this.getData();
    },
    
    save: function(array){
        fs.writeFileSync(this.filename ,JSON.stringify(array, null,' '))
        return true
    },

    generateId: function(){
        console.log("Estoy generando un ID");
        let allUsers = this.findAll();
        let lastid = (allUsers.length +1);
        console.log("el ultimo ID es: " + lastid);

        if(lastid)
        {
            return lastid;
        }
        else
        return 1;

    },

    findById: function(id){
        console.log("buscando por id: " + id);
        let allUsers = this.findAll();
        let userFound;
        allUsers.forEach(user => {
            console.log(user.id);
            if(user.id == id){
                console.log("encontre al usuario");
                userFound = user;
            }
        })
        return userFound

    },

    findByField: function(field , text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound
    },
    create: function(user){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...user,
            puntos: 0,
            posicion: 0,
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.filename ,JSON.stringify(allUsers, null,' '))
        return newUser
    },
    createPartido: function(info){
        let allUsers = this.findAll();
        console.log("Estoy creando el partido");
        console.log(info);
        allUsers[info.userId-1].grupos[info.grupo].partidos[info.partido].resultado = info.resultado;
        console.log(allUsers[info.userId-1].grupos[info.grupo].partidos[info.partido]);
        this.save(allUsers)
    },


    createPartidoElim : function(info){
        let user = this.findById(info.userId)
        user.eliminatorias.cuartos.partidos[info.partido].resultado = info.resultado
        let allUsers = this.findAll();
        for(let i = 0; i< allUsers.length; i++)
        {
            if(allUsers[i].id == info.userId)
            allUsers[i] = user;
        }

        this.save(allUsers);
    },







    /**********backend para actualizar las tablas *///////////////



    esPleno: function(resultadoA ,resultadoB){
        if(resultadoA[0] == resultadoB[0] && resultadoA[1] == resultadoB[1])
        {
            return true
        }
        else
        return false   
    },

    calculaPuntos: function(resultadoUser , resultadoProde){

        console.log(" ----------");
        console.log(resultadoUser);
        console.log("vs");
        console.log(resultadoProde);
        console.log(" ----------");
        let sumaUser = resultadoUser[0] - resultadoUser[1];
        let sumaProde = (resultadoProde[0]) - (resultadoProde[1]);
        console.log("Suma user:" + sumaUser);
        console.log("Suma prode:" + sumaProde);
        let info = {
            puntos : 0,
            pleno: false
        }
        if(sumaUser == 0 && sumaProde ==0) 
        {
            console.log("empate acertado");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=4;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else if(sumaUser >0 && sumaProde >0)
        {
            console.log("victoria local asertda");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=4;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else if(sumaUser <0 && sumaProde <0)
        {
            console.log("victoria visitante acertada");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=4;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else
        {
            console.log("no acerto");
            info.puntos = 0
            console.log(info);
            return info
        }
    },


    sumaPuntos: function(user, prode)
    {
        console.log("************************");
        console.log("Estoy en suma puntos");
        console.log("***********************");
        user.puntos =0;
        user.posicion =0;
        user.plenos =0
        console.log("Nombre: " + user.username);
        console.log("Puntos:" +user.puntos);

        for(let i = 0;i<prode.grupos.length; i++)
        {
            for(let j = 0;j<prode.grupos[i].partidos.length; j++)
            {
               let info =  this.calculaPuntos(user.grupos[i].partidos[j].resultado , prode.grupos[i].partidos[j].resultado)
               user.puntos += info.puntos
               if(info.pleno){
                   user.plenos ++;
               }
            }
        }
        console.log("Nombre: " + user.username);
        console.log("Puntos:" +user.puntos);
        console.log("plenos:" + user.plenos);
        console.log("Me fui de suma puntos");
        console.log("*********************");

    },


    puntosYposiciones: function(prode){
        console.log("************************");
        console.log("Estoy en calcula puntosYposiciones");
        console.log("***********************");
        console.log("vine desde Prode a User");
        console.log(prode);
        console.log("prode: " + (prode.id-1));
        let allUsers = this.findAll();
        let usersProde = []
        allUsers.forEach(element => {
            if(element.prode == (prode.id-1))
            {
             usersProde.push(element)
            }
            
        });
        console.log(usersProde);
        usersProde.forEach(element =>
            {
                this.sumaPuntos(element, prode)
            });
            usersProde.sort((a,b) => {
                if(a.puntos < b.puntos)
                {
                    return 1;
                }
                else if( a.puntos > b.puntos)
                {
                    return -1
                }
                else if(a.plenos < b.plenos)
                {
                    return 1;
                }
                else if( a.plenos > b.plenos)
                {
                    return -1
                }
                else{
                    return 0
                }
            });
            console.log(usersProde);
            for(let i = 0;i<usersProde.length;i++)
            {
                usersProde[i].posicion = (i+1);
            }
         
            fs.writeFileSync(this.filename ,JSON.stringify(usersProde, null,' '))
    },

    calculaPuntosEliminatorias: function(resultadoUser , resultadoProde){

        console.log(" ----------");
        console.log(resultadoUser);
        console.log("vs");
        console.log(resultadoProde);
        console.log(" ----------");
        let sumaUser = resultadoUser[0] - resultadoUser[1];
        let sumaProde = (resultadoProde[0]) - (resultadoProde[1]);
        console.log("Suma user:" + sumaUser);
        console.log("Suma prode:" + sumaProde);
        let info = {
            puntos : 0,
            pleno: false
        }
        if(sumaUser == 0 && sumaProde ==0) 
        {
            console.log("empate acertado");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=4;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else if(sumaUser >0 && sumaProde >0)
        {
            console.log("victoria local asertda");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=4;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else if(sumaUser <0 && sumaProde <0)
        {
            console.log("victoria visitante acertada");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=4;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else
        {
            console.log("no acerto");
            info.puntos = 0
            console.log(info);
            return info
        }
    },

    sumaPuntosEliminatorias: function(user, prode)
    {
        console.log("************************");
        console.log("Estoy en suma puntos Eliminatorias");
        console.log("***********************");
        console.log("Nombre: " + user.username);
        console.log("Puntos:" +user.puntos);
        user.puntosEliminatorias =0;
        user.plenosEliminatorias = 0;
        

   
            for(let j = 0;j<prode.eliminatorias.cuartos.partidos.length; j++)
            {
               let info =  this.calculaPuntosEliminatorias(user.eliminatorias.cuartos.partidos[j].resultado , prode.eliminatorias.cuartos.partidos[j].resultado)
               user.puntosEliminatorias += info.puntos
               if(info.pleno){
                   user.plenosEliminatorias ++;
               }
            }
        console.log("Nombre: " + user.username);
        console.log("Puntos eliminatorias:" +user.puntosEliminatorias);
        console.log("plenos eliminatorias:" + user.plenosEliminatorias);
        console.log("Me fui de suma puntos");
        console.log("*********************");

    },

    puntosYposicionesEliminatorias : function(prode){
        console.log("************************");
        console.log("Estoy en calcula puntosYposiciones de eliminatorias");
        console.log("***********************");
        console.log("vine desde Prode a User");
        console.log(prode);
        console.log("prode: " + (prode.id-1));
        let allUsers = this.findAll();
        let usersProde = []
        allUsers.forEach(element => {
            if(element.prode == (prode.id-1))
            {
             usersProde.push(element)
            }
            
        });
        console.log(usersProde);
        usersProde.forEach(element =>
            {
                this.sumaPuntosEliminatorias(element, prode)
            });
            usersProde.sort((a,b) => {
                if((a.puntosEliminatorias + a.puntos) < (b.puntosEliminatorias + b.puntos))
                {
                    return 1;
                }
                else if( (a.puntosEliminatorias + a.puntos) >(b.puntosEliminatorias + b.puntos))
                {
                    return -1
                }
                else if((a.plenosEliminatorias + a.plenos) < (b.plenosEliminatorias + b.plenos))
                {
                    return 1;
                }
                else if( (a.plenosEliminatorias + a.plenos) > (b.plenosEliminatorias + b.plenos))
                {
                    return -1
                }
                else{
                    return 0
                }
            });
            console.log(usersProde);
            for(let i = 0;i<usersProde.length;i++)
            {
                usersProde[i].posicion = (i+1);
            }
         
            fs.writeFileSync(this.filename ,JSON.stringify(usersProde, null,' '))

    },


    calculaPuntosFinal: function(resultadoUser , resultadoProde){

        console.log(" ----------");
        console.log(resultadoUser);
        console.log("vs");
        console.log(resultadoProde);
        console.log(" ----------");
        let sumaUser = resultadoUser[0] - resultadoUser[1];
        let sumaProde = (resultadoProde[0]) - (resultadoProde[1]);
        console.log("Suma user:" + sumaUser);
        console.log("Suma prode:" + sumaProde);
        let info = {
            puntos : 0,
            pleno: false
        }
        if(sumaUser == 0 && sumaProde ==0) 
        {
            console.log("empate acertado");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=5;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else if(sumaUser >0 && sumaProde >0)
        {
            console.log("victoria local asertda");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=5;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else if(sumaUser <0 && sumaProde <0)
        {
            console.log("victoria visitante acertada");
            info.puntos = 1
            if(this.esPleno(resultadoUser,resultadoProde)){
                console.log("es pleno");
                info.puntos=5;
                info.pleno = true
            }
            console.log(info);
            return info
        }
        else
        {
            console.log("no acerto");
            info.puntos = 0
            console.log(info);
            return info
        }
    },


    sumaPuntosFinal: function(user, prode)
    {
        console.log("************************");
        console.log("Estoy en suma puntos gran final");
        console.log("***********************");
        console.log("Nombre: " + user.username);
        console.log("Puntos:" +user.puntos);
        user.puntosFinal =0;
        user.plenosFinal = 0;
    
               let info =  this.calculaPuntosFinal(user.eliminatorias.final.partido[0].resultado , prode.eliminatorias.final.partido[0].resultado)
               user.puntosFinal += info.puntos
               if(info.pleno){
                   user.plenosEliminatorias ++;
               }
           
        console.log("Nombre: " + user.username);
        console.log("Puntos Final:" +user.puntosFinal);
        console.log("plenos Final:" + user.plenosFinal);
        console.log("Me fui de suma puntos");
        console.log("*********************");

    },



    puntosYposicionesFinal: function(prode){
        console.log("************************");
        console.log("Estoy en calcula puntosYposiciones de la gran final");
        console.log("***********************");
        console.log("vine desde Prode a User");
        console.log(prode);
        console.log("prode: " + (prode.id-1));
        let allUsers = this.findAll();
        let usersProde = []
        allUsers.forEach(element => {
            if(element.prode == (prode.id-1))
            {
             usersProde.push(element)
            }
            
        });
        console.log(usersProde);
        usersProde.forEach(element =>
            {
                this.sumaPuntosFinal(element, prode)
            });
            usersProde.sort((a,b) => {
                if((a.puntosFinal + a.puntos) < (b.puntosFinal + b.puntos))
                {
                    return 1;
                }
                else if( (a.puntosFinal + a.puntos) >(b.puntosFinal + b.puntos))
                {
                    return -1
                }
                else if((a.plenosFinal + a.plenos) < (b.plenosFinal + b.plenos))
                {
                    return 1;
                }
                else if( (a.plenosFinal + a.plenos) > (b.plenosFinal + b.plenos))
                {
                    return -1
                }
                else{
                    return 0
                }
            });
            console.log(usersProde);
            for(let i = 0;i<usersProde.length;i++)
            {
                usersProde[i].posicion = (i+1);
            }
         
            fs.writeFileSync(this.filename ,JSON.stringify(usersProde, null,' '))

    }



}


let prode = Prode.findAll()[0];
//User.puntosYposicionesEliminatorias(prode);

module.exports = User
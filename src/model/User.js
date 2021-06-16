const fs = require('fs');

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
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser)
        {
            return lastUser.id + 1;
        }
        else
        return 1;

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
    }
 
}


module.exports = User
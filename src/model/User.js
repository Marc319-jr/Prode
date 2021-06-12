const fs = require('fs');

const User ={
    filename: './src/data/users.JSON',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename , {encoding: 'utf-8'}));
    },

    findAll: function(){
        return this.getData();
    },
    
    save: function(user){
        fs.writeFileSync(this.filename ,JSON.stringify(user, null,' '))
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

    create: function(user){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),

        }
        allUsers.push(newUser);
        fs.writeFileSync(this.filename ,JSON.stringify(allUsers, null,' '))
        return newProde
    },
 
}


module.exports = User
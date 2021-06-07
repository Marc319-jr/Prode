const fs = require('fs');

const Prode = {
    filename: './src/data/prodes.JSON',
    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename , {encoding: 'utf-8'}));
    },

    findAll: function(){
        return this.getData();
    },

    generateId: function(){
        let allProdes = this.findAll();
        let lastProde = allProdes.pop();
        if(lastProde)
        {
            return lastProde.id + 1;
        }
        else
        return 1;

    },

    create: function(prode){
        let allProdes = this.findAll();
        let newProde = {
            id: this.generateId(),
            ...prode
        }
        allProdes.push(newProde);
        fs.writeFileSync(this.filename ,JSON.stringify(allProdes, null,' '))
        return newProde
    },

    equipos: function(equipos){
        let allProdes = this.findAll()
        allProdes.forEach(element => {
            element.equipos = equipos;    
        });
        

    }
}


module.exports = Prode;
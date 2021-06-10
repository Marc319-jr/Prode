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

    teamsCreate: function(number){
        let array = [];
        for(let i =0;i<number;i++)
        {
            array.push({
                id: i+1,
                nombre: '',
                bandera:''
            })
        }
        return array
    },


    gruposCreate: function(numeroGr, numeroTe){
        let array = [];
        for(let i = 0;i<numeroGr;i++)
        {
            array.push({
                id: i+1,
                cantequipos: numeroTe/numeroGr,
                equipos: this.teamsCreate(numeroTe/numeroGr)
            })
        }
        return array
    },

    create: function(prode){
        let allProdes = this.findAll();
        let newProde = {
            id: this.generateId(),
            nombre:prode.nombre,
            cantequipos: prode.teamnum,
            cantgrupos: prode.groupnum, 
            grupos: this.gruposCreate(prode.groupnum, prode.teamnum)
        }
        allProdes.push(newProde);
        fs.writeFileSync(this.filename ,JSON.stringify(allProdes, null,' '))
        return newProde
    },

    equipos: function(equipo){
        let allProdes = this.findAll()
        allProdes[equipo.prodeId-1].equipos.push(equipo);
        console.log(allProdes);
        fs.writeFileSync(this.filename ,JSON.stringify(allProdes, null,' '))
        return true


    }
}



module.exports = Prode;
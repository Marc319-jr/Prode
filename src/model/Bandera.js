const fs = require('fs');

const Bandera = {
    filename: './src/data/banderas.JSON',
    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename , {encoding: 'utf-8'}));
    },

    findAll: function(){
        return this.getData();
    },
}

module.exports = Bandera;
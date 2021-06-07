const Prode = require('../model/Prode');
const controller = {
    prode: (req,res) => {
        res.render('../src/views/admin/creacion');
    },
    crear: (req,res) => {
        let prodeToCreate = {
            ...req.body
        }
        Prode.create(prodeToCreate);
        res.render('../src/views/admin/addteams' , { 'prode' :prodeToCreate});
    },

    crearEquipos: (req,res) => { 
        console.log("estoy creando Equios");
        let equipos = {
            ...req.body,
            bandera: req.file ? req.file.filename : 'default'
        }
        console.log(equipos);
    }

}



module.exports = controller;
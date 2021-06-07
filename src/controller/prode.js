const Prode = require('../model/Prode');
const controller = {
    prode: (req,res) => {
        res.render('../src/views/admin/creacion');
    },
    crear: (req,res) => {
        let prodeToCreate = Prode.create(req.body)
        console.log("El prode que cree: ");
        console.log(prodeToCreate);
        res.render('../src/views/admin/addteams' , { 'prode' :prodeToCreate});
    },

    crearEquipos: (req,res) => { 
        let id = req.query.id;
        console.log("estoy creando un equipo en el porde numero: " + id);
        let equipo = {
            ...req.body,
            bandera: req.file ? req.file.filename : 'default',
            numeroDeGrupo: req.query.numeroDeGrupo,
            equipoId: req.query.numeroDeEquipo,
            prodeId: id
        }
        console.log("cree A:");
        console.log(equipo);
        Prode.equipos(equipo);
    }

}



module.exports = controller;
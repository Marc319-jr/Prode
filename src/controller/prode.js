const Prode = require('../model/Prode');
const controller = {
    prode: (req,res) => {
        let prodes = Prode.findAll();
        res.render('../src/views/admin/creacion', {'prodes':prodes});
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
        let grupNum = req.query.numeroDeGrupo;
        let teamNum = req.query.numeroDeEquipo;
        console.log("El equipo pertenece al prode: " + id + " y al grupo: " + grupNum + " y su numero es: " + teamNum)
        let equipo = {
            ...req.body,
            bandera: req.file ? req.file.filename : 'default',
        }
        console.log("cree A:");
        console.log(equipo);
        let prode = Prode.createTeams(equipo, id, grupNum,teamNum)
        res.render('../src/views/admin/addteams' , { 'prode' :prode});
    },

    administrar: (req,res) => {
        res.send("Que pasa way")
    }

}



module.exports = controller;
const Prode = require('../model/Prode');
const User = require('../model/User');
const controller = {
    login: (req,res) => {
        res.render('../src/views/user/login');

    },

    register: (req,res) => {
        res.render('../src/views/user/register');
    },
    reglas: (req,res) => {
        res.render('../src/views/user/reglas');
    }, 
    create: (req,res) => {
        let prodes = Prode.findAll();
        res.render("../src/views/user/create" , {'prodes' : prodes});
    },
    save: (req,res) => {
        let prodes = Prode.findAll();
        let prode = prodes[req.body.prode]
        let grupos = prode.grupos;
        let user = {
            ...req.body,
            grupos
        }
        userToCreate = User.create(user);
        res.render('../src/views/user/resultados', {'participante' : userToCreate});
    },
    createResultados: (req,res) => {
        res.send("hola")
    }
}



module.exports = controller;
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
        let user = User.create(req.body);
        let prodes = Prode.findAll();
        res.render('../src/views/user/resultados', {'participante' : user , 'prodes': prodes});
    },
    createResultados: (req,res) => {
        res.send("hola")
    }
}



module.exports = controller;
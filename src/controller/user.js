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
        for( let i = 0;i < grupos.length; i++)
        {
            for(let j = 0 ; j< grupos[i].partidos.length ; j++)
            {
                grupos[i].partidos[j].resultado = [];
            }
        }
       
        let user = {
            ...req.body,
            grupos
        }
        userToCreate = User.create(user);
        res.render('../src/views/user/resultados', {'participante' : userToCreate});
    },
    saveUserResult: (req,res) => {
        let resultado = [req.body.local , req.body.visitante];
        let userId = req.query.userId;
        let info = {
            userId,
            grupo: req.query.grupoId,
            partido: req.query.partidoId,
            resultado
        }
        User.createPartido(info);
        let allUsers = User.findAll();
        let user = allUsers[(userId-1)];
        res.render('../src/views/user/resultados', {'participante' : user});

    }
}



module.exports = controller;
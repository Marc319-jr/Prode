const Prode = require('../model/Prode');
const User = require('../model/User');
const controller = {
    pago: (req,res) => {
        res.render('../src/views/user/pago');

    },
    login: (req,res) => {
        res.render('../src/views/user/login');

    },
    cuadros: (req,res) => {
        res.render('../src/views/user/cuadros');

    },
    processLogin: (req,res) => {
        let users = User.findAll();
        let userToLogin = User.findByField('username' , req.body.username)
        if(userToLogin)
        {
            console.log("Encontre un usuario");
            req.session.userLogged = userToLogin;
            res.locals.userLogged = req.session.userLogged;
            console.log(res.locals.userLogged.username);
            res.redirect('/')
        }
        else
        {
            res.redirect('/user/login')
        }

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
        let user = allUsers.filter(function(user) {
            if(user.id == userId)
            {
                return true
            }
        })
        console.log(user)
        res.render('../src/views/user/resultados', {'participante' : user[0]});

    },

    logout : (req,res) => { 
        console.log("Cerrando session");
        req.session.destroy()
        res.redirect('/')
    }, 

    showprode: (req,res) =>
    {
        let userId = req.query.userId
        console.log("el user id es");
        console.log(userId);
        user = User.findById(userId)
        res.render('../src/views/user/resultados', {'participante' : user});

    },

    saveUserResultElim : (req,res) => { 
        let resultado = [req.body.local , req.body.visitante]
        let userId = req.query.userId
        let info = {
            userId,
            grupo: req.query.grupoId,
            partido: req.query.partidoId,
            resultado
        }
        User.createPartidoElim(info);
        let user = User.findById(userId)
        res.render('../src/views/user/resultados', {'participante' : user});
    }
}



module.exports = controller;
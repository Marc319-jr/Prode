const Prode = require('../model/Prode');
const User = require('../model/User');
const controller = {
    login: (req,res) => {
        res.render('../src/views/user/login');

    },

    register: (req,res) => {
        res.render('../src/views/user/register');
    }, 
    create: (req,res) => {
        res.render("../src/views/user/create");
    }
}



module.exports = controller;
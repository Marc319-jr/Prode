const fs = require('fs');
const User = require('./User');
const Prode = require('./Prode');

const Resultado = {
    allProdes = Prode.findAll(),
    allUsers = User.findAll(),
    
}
const Prode = require('../model/Prode')
const controller = { 

    index: (req,res) => {
        let prodes = Prode.findAll();
        let prode  = prodes[0];
        res.render('../src/views/index' , {'prode' : prode});
    }
}


module.exports = controller;
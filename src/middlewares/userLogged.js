const User = require('../model/User')


function userLoggedMiddleWare(req,res,next){
    console.log("Estoy en el middleware de Userlogged");
    if(req.session.userLogged)
    {
        console.log("Hay un usuario logeado");
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }
    else
    {
        console.log("nadie esta logeado");
    }

    next();

}



module.exports = userLoggedMiddleWare
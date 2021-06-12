const express = require('express');
const router = express.Router();
const controller = require('../controller/user');


router.get('/login' , controller.login);
router.get('/register', controller.register);
router.get('/reglas', controller.reglas);
router.get('/create', controller.create);
router.get('/create/resultados' , controller.createResultados)



router.post('/guardar' ,controller.save);




module.exports = router;
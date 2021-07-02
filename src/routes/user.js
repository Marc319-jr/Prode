const express = require('express');
const router = express.Router();
const controller = require('../controller/user');

router.get('/pago', controller.pago)
router.get('/login' , controller.login);
router.get('/cuadros', controller.cuadros);
router.get('/register', controller.register);
router.get('/reglas', controller.reglas);
router.get('/create', controller.create);
router.get('/logout' , controller.logout);
router.get('/showprode', controller.showprode)



router.post('/guardar' ,controller.save);
router.post('/guardar/resultadosUser' , controller.saveUserResult);
router.post('/guardar/resultadosUserElim' , controller.saveUserResultElim)
router.post('/login' , controller.processLogin);



module.exports = router;
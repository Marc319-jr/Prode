const express = require('express');
const router = express.Router();
const controller = require('../controller/user');


router.get('/login' , controller.login);
router.get('/register', controller.register);
<<<<<<< HEAD
router.get('/reglas', controller.reglas);
=======
router.get('/create', controller.create);

>>>>>>> 7481c8141f47822c59aad3e01dc3941051626453





module.exports = router;
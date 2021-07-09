const express = require('express');
const router = express.Router();
const controller = require('../controller/prode');

//configuracion de multer
const path = require('path');
let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '/../../public/image/equipos/'))
    },
    filename: (req,file,callback) => {
        const newFileName = 'Bandera-' + Date.now() + path.extname(file.originalname);
        callback(null,newFileName);
    }
});
let fileUpload = multer({storage});
//Fin de la configuracion!


router.get('/' , controller.prode)
router.get('/administrar' , controller.administrar);
router.get('/resultados' , controller.resultadoUser);


router.post('/crear' , controller.crear);
router.post('/crearEquipos' ,fileUpload.single('bandera') , controller.crearEquipos);
router.post('/crearPartido' , controller.crearPartido);
router.post('/eliminatorias' , controller.eliminatorias)
router.post('/:grupoId/:partidoId/:prodeId' , controller.resultado);
router.post('/insertarCuartos' , controller.resutltadoEliminatorias);
router.post('/insertarFinal' , controller.resultadoFinal);




module.exports = router;
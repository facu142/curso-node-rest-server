const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { cargarArchivo } = require('../controllers/uploads');
 

const router = Router();

// Para crear un nuevo recurso de usa POST , Para actualizar: PUT

router.post('/', cargarArchivo);





module.exports = router;







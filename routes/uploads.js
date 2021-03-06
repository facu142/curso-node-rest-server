const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary  } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

// Para crear un nuevo recurso de usa POST , Para actualizar: PUT

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    check('id', 'El id debe ser de mongo').isMongoId(),
    validarCampos
], actualizarImagenCloudinary)


router.get('/:coleccion/:id', [
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    check('id', 'El id debe ser de mongo').isMongoId(),
    validarCampos
], mostrarImagen   )


module.exports = router;







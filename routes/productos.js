const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');


const { crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto, 
    borrarProducto} = require('../controllers/productos');

const router = Router();


// Obtener productos - paginado - total - populate

router.get('/', obtenerProductos)

// Obtener un producto por id - publico 

router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)

// Crear un nuevo producto - Privado - cualquier pesona con un token valido

router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto );

// Actualizar - privado - cualquiera con token valido

router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

// Borrar un producto - Admin


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)


module.exports = router;
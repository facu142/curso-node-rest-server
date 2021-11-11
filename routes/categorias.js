const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares/');

const { crearCategoria,
    obtenerCategorias,
    obtenerCategoria, 
    actualizarCategoria, 
    borrarCategoria} = require('../controllers/categorias');
const { existeUsuarioPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();
/**
 * 
 *   {{url}}/api/categorias
 * 
 */

// Obtener todas las categorias  - publico
router.get('/', obtenerCategorias)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

// Crear nueva categoria - Privado - cualquier pesona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)


// Actualizar categoria - Privado - cualquier pesona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
] ,actualizarCategoria)

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos
] , borrarCategoria  )

module.exports = router;







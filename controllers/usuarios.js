const { response, request } = require('express');

const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'no name', apikey, page, limit } = req.query

    res.json({
        msg: 'Get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe


    // Hash la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password , salt )

    // Guardar en Base de datos

    await usuario.save();

    res.json({
        msg: ' Post API- controller',
        usuario
    })
}
    
const usuariosPut = (req, res = response) => {

    const id = req.params.id

    res.json({
        msg: ' Put API- controller',
        id
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: ' Patch API- controller'
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: ' Delete API- controller'
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}



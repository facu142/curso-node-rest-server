const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre='no name', apikey, page, limit } = req.query

    res.json({
        msg: 'Get API - Controlador',
        q, 
        nombre, 
        apikey,
        page, 
        limit
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: ' Post API- controller',
        nombre,
        edad
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



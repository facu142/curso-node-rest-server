const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const {Usuario , Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarUsuarios = async (termino = '', res = response) => {


    // Chequeo si mandaron un mongo id o el nombre del usuario
    const esMongoID = ObjectId.isValid(termino)


    if (esMongoID) {
        const usuario = await Usuario.findById(termino);

        // Si existe el usuario con ese id lo retorna y si no devuelve un arreglo vacio 

        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }


    // Hace que la busqueda no sea case sensitive
    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex}],
        $and: [{estado: true}]
    });

    return res.json({
        results: usuarios
    });

}


const buscarCategorias = async (req, res=response) => {
    
    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find()

}




const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas} `
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
        case 'categorias':
            break
        case 'productos':
            break
        case 'roles':
            break
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }

}


module.exports = {
    buscar
}
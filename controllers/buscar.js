const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const { Usuario, Categoria, Producto } = require('../models')

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


    // Se usa el $or porque se puede buscar segun el nombre o segun el correo
    // y el $and porque el estado debe estar en true 
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    return res.json({
        results: usuarios
    });

}


const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {
        const categoria = Categoria.findById(termino)

        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }


    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({ nombre: regex, estado: true })


    return res.json({
        results: categorias
    })

}


const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino)


    if (esMongoID) {
        const producto = await Producto.findById(termino);

        // Si existe el producot con ese id lo retorna y si no devuelve un arreglo vacio 

        return res.json({
            results: (producto) ? [producto] : []
        });
    }


    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria', 'nombre')
    return res.json({
        results: productos
    })

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
            break
        case 'categorias':
            buscarCategorias(termino, res)
            break
        case 'productos':
            buscarProductos(termino, res)
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
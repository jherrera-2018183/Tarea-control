const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {

    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    });

}


const getUsuarioPorID = async (req = request, res = response) => {

    const { id } = req.params;
    const usuarioById = await Usuario.findById(id)

    res.status(201).json(usuarioById);
}

const postUsuario = async (req = request, res = response) => {

    const { nombre, correo, password, rol, curso, curso2, curso3, curso4 } = req.body;
    const usuarioGuardadoDB = new Usuario({
        nombre, correo, password, rol, curso,
        curso2, curso3, curso4
    });



    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Usuario',
        usuarioGuardadoDB
    });

}



const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, img,  /* rol,*/  estado, google, ...resto } = req.body;

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        usuarioEditado
    });

}

const deleteUsuario = async (req = request, res = response) => {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        usuarioEliminado
    });
}

module.exports = {
    getUsuarios,
    getUsuarioPorID,
    postUsuario,
    putUsuario,
    deleteUsuario,
}



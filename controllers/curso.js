const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Curso = require('../models/curso');

const getCurso = async (req = request, res = response) => {

    const query = { estado: true };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query).populate('usuario', 'nombre')
    ]);

    res.json({
        msg: 'get Api - Controlador Curso',
        listaCursos
    });

}

const postCurso = async (req = request, res = response) => {

    const curso = req.body.curso.toUpperCase();

    const cursoDB = await Curso.findOne({ curso })

    if (cursoDB) {
        return res.status(400).json({
            msg: `El curso ${cursoDB.curso}, ya existe.`
        });
    }

    const data = {
        curso,
        usuario: req.usuario._id
    }

    const curse = new Curso(data);

    await curse.save()

    res.status(201).json(curse);

}

const cursoYaExiste = async (req = request, res = response) => {
    const cursoDB = await Curso.findOne({ curso })

    if (cursoDB) {
        return res.status(400).json({
            msg: `El curso ${cursoDB.curso}, ya existe.`
        });
    }

}


const putCurso = async (req = request, res = response) => {


    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.curso = resto.curso.toUpperCase();
    resto.usuario = req.usuario._id;

    const cursoEditado = await Curso.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(cursoEditado);



}

const deleteCurso = async (req = request, res = response) => {
    const { id } = req.params;

    const cursoEliminado = await Curso.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        cursoEliminado
    });
}

module.exports = {
    getCurso,
    postCurso,
    putCurso,
    deleteCurso,
    cursoYaExiste
}


// CONTROLADOR
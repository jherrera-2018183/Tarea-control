const Role = require('../models/role');
const Curso = require('../models/curso');
const Usuario = require('../models/usuario');


const cursoValido = async (rol = '') => {

    const existeRol = await Role.findOne("ROL_ALUMNO");

    if (!existeRol) {
        throw new Error(`El rol ${rol} no puede agregar más de 3 roles`);
    }
    return true;

    
}

function esElCursoValido (){
    throw new Error(`Este rol no puede agregar más de 3 cursos`); 
}


const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }

}

const esCursoValido = async (curso = '') => {

    const existeCurso = await Curso.findOne({ curso });

    if (!existeCurso) {
        throw new Error(`El curso ${curso} no está registrado en la DB`);
    }

}


const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya existe y esta registrado en la DB`);
    }

}


const existeUsuarioPorId = async (id) => {

    const existeUser = await Usuario.findById(id);

    if (!existeUser) {
        throw new Error(`El id ${id} no existe en la DB`);
    }

}

const existeCursoPorId = async (id) => {

    const existeUser = await Curso.findById(id);

    if (!existeUser) {
        throw new Error(`El id ${id} no existe en la DB`);
    }

}



module.exports = {
    esRoleValido,
    esCursoValido,
    emailExiste,
    existeUsuarioPorId,
    existeCursoPorId,
    cursoValido,
    esElCursoValido
}
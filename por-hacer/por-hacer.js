const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');   
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: !1,
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = !0) => {
    cargarDB();
    
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return !0;
    }
    else
        return !1;
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    
    if (listadoPorHacer.length === nuevoListado.length)
        return !1;
    else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return !0;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
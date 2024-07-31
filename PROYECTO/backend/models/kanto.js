const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: [String], // Permite múltiples tipos, por ejemplo, ['Fuego', 'Volador']
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String, // La URL o ruta de la imagen
        required: true
    }
});

const Kanto = mongoose.model('Kanto', Schema);

module.exports = Kanto;

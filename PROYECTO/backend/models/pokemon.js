// backend/models/Pokemon.js
const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
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
        type: [String],
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);

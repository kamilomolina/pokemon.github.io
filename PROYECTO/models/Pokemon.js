const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  numero: { type: Number, required: true },
  tipo: { type: [String], required: true },
  descripcion: { type: String, required: true },
  habilidades: { type: String, required: true },
  imagen: { type: String, required: true }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;

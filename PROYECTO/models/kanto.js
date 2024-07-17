
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nombre: String,
  numero: Number,
  tipo:  String,
  descripcion: String,
  habilidades: String
});

const kanto = mongoose.model('kanto', Schema);

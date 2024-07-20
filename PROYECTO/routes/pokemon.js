const kanto = require('../models/Pokemon');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'secreto';

router.post('/signup', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({ nombre, correo, contraseña: hash });
    await nuevoUsuario.save();
    res.status(201).send(nuevoUsuario);
  });
  
  router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) return res.status(400).send('Contraseña incorrecta');
    
    const token = jwt.sign({ id: usuario._id }, secret, { expiresIn: '1h' });
    res.send({ token });
  });
  
  const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Acceso denegado');
    
    try {
      const verified = jwt.verify(token, secret);
      req.usuario = verified;
      next();
    } catch (err) {
      res.status(400).send('Token inválido');
    }
  };
  
  router.get('/pokemones', auth, async (req, res) => {
    const pokemones = await Pokemon.find();
    res.send(pokemones);
  });
  
  router.post('/pokemones', auth, async (req, res) => {
    const { nombre, numero, tipo, descripcion, habilidades, imagen } = req.body;
    const nuevoPokemon = new Pokemon({ nombre, numero, tipo, descripcion, habilidades, imagen });
    await nuevoPokemon.save();
    res.status(201).send(nuevoPokemon);
  });
  
  router.put('/pokemones/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { nombre, numero, tipo, descripcion, habilidades, imagen } = req.body;
    const pokemon = await Pokemon.findByIdAndUpdate(id, { nombre, numero, tipo, descripcion, habilidades, imagen }, { new: true });
    res.send(pokemon);
  });
  
  router.delete('/pokemones/:id', auth, async (req, res) => {
    const { id } = req.params;
    await Pokemon.findByIdAndDelete(id);
    res.send('Pokémon eliminado');
  });
  
  router.get('/pokemones/:id', auth, async (req, res) => {
    const { id } = req.params;
    const pokemon = await Pokemon.findById(id);
    res.send(pokemon);
  });
  
  module.exports = router;

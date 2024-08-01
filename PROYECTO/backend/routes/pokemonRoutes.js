// backend/routes/PokemonRoutes.js
const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/', pokemonController.getAllPokemon);
router.post('/', pokemonController.createPokemon);

module.exports = router;

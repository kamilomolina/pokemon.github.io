const express = require('express');
const router = express.Router();
const PokemonController = require('../controllers/pokemonController');

module.exports = (upload, authMiddleware) => {
    
    // Rutas públicas
    router.get('/search/:query', PokemonController.searchPokemon);
    router.get('/', PokemonController.getAllPokemons);
    router.get('/:id', PokemonController.getPokemonById);
    router.get('/region/:region', PokemonController.getPokemonsByRegion);

    // Rutas protegidas
    if (upload) {
        router.post('/', upload.single('imagen'), PokemonController.createPokemon);
        router.post('/multiple', authMiddleware, PokemonController.createMultiplePokemons);
        router.put('/:id', upload.single('imagen'), PokemonController.updatePokemon);
        router.delete('/:id', PokemonController.deletePokemon);
    }

    return router;
};

// backend/controllers/PokemonController.js
const Pokemon = require('../models/Pokemon');

// Obtener todos los Pokémon
exports.getAllPokemon = async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo Pokémon
exports.createPokemon = async (req, res) => {
    const { numero, nombre, tipo, descripcion, imagen } = req.body;

    const nuevoPokemon = new Pokemon({ numero, nombre, tipo, descripcion, imagen });

    try {
        const pokemonGuardado = await nuevoPokemon.save();
        res.status(201).json(pokemonGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Otros métodos CRUD (Actualizar, Eliminar, etc.) pueden ser agregados aquí

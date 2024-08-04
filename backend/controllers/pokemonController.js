const Pokemon = require('../models/pokemon');

// Obtener todos los Pokémon
const getAllPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener Pokémon por región
const getPokemonsByRegion = async (req, res) => {
    try {
        const region = req.params.region;
        const pokemons = await Pokemon.find({ region });
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un Pokémon por su ID
const getPokemonById = async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon) return res.status(404).json({ message: 'Pokémon no encontrado' });
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo Pokémon
const createPokemon = async (req, res) => {
    const { numero, nombre, tipo, descripcion, imagen, region, habilidades } = req.body;
    const nuevoPokemon = new Pokemon({ numero, nombre, tipo, descripcion, imagen, region, habilidades });

    try {
        const pokemonGuardado = await nuevoPokemon.save();
        res.status(201).json(pokemonGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Crear múltiples Pokémon
const createMultiplePokemons = async (req, res) => {
    try {
        const pokemons = req.body;
        const savedPokemons = await Pokemon.insertMany(pokemons);
        res.status(201).json(savedPokemons);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un Pokémon
const updatePokemon = async (req, res) => {
    try {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPokemon) return res.status(404).json({ message: 'Pokémon no encontrado' });
        res.json(updatedPokemon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un Pokémon
const deletePokemon = async (req, res) => {
    try {
        const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
        if (!deletedPokemon) return res.status(404).json({ message: 'Pokémon no encontrado' });
        res.json({ message: 'Pokémon eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const searchPokemon = async (req, res) => {
    try {
        const query = req.params.query;

        // Crear un objeto de criterios de búsqueda
        const searchCriteria = {
            $or: [
                { nombre: new RegExp(query, 'i') }, // Buscar por nombre (insensible a mayúsculas/minúsculas)
                { numero: isNaN(query) ? 0 : parseInt(query) } // Buscar por número si es un número
            ]
        };

        const pokemon = await Pokemon.find(searchCriteria);
        res.json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllPokemons,
    getPokemonById,
    createPokemon,
    createMultiplePokemons,
    updatePokemon,
    deletePokemon,
    getPokemonsByRegion,
    searchPokemon
};

// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/userRoutes');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/poke')
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((err) => {
        console.error('Error conectando a MongoDB:', err);
    });

const app = express();
app.use(express.json());

// Rutas
const pokemonRoutes = require('./routes/PokemonRoutes');
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/auth', UserRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido a la Pokédex API');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

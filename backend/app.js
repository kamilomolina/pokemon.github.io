const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const pokemonRoutes = require('./routes/pokemonRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Configuración de multer para manejo de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Conexión a la Base de Datos
mongoose.connect('mongodb://localhost:27017/pokedex')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error conectando a MongoDB:', err));

const app = express();
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas de usuario
app.use('/api/users', userRoutes);

// Rutas de Pokémon
app.use('/api/pokemons', pokemonRoutes(upload, authMiddleware));

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido a la Pokédex!');
});

app.get('/saludo', (req, res) => {
    res.send('¡Hola desde la Pokédex!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor web iniciado en el puerto ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');


// Conexión a la Base de Datos
mongoose.connect('mongodb://localhost:27017/pokemon', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((err) => {
        console.log('Error conectando a MongoDB: ' + err);
    });

const app = express();

// Middleware para parsear JSON
app.use(express.json());

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

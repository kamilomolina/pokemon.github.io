const express = require('express');
const mongoose = require('mongoose');
const pokemonRoutes = require('./routes/pokemon');



//Conexion a mongoDB
mongoose.connect('mongodb://localhost:27017/pokemon')
.then(() =>{
    console.log('conectado a mongodb')
})
.catch((err)=>{
    console.log('Error conectando al mongodb: '+ err);
});

const app = express();
app.use(express.json());
app.use('/api', pokemonRoutes);

app.listen(3000, () => {
    console.log('El servidor web inició en el puerto 3000')
});

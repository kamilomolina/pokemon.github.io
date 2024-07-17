const express = require('express');
const mongoose = require('mongoose');

//Conexion a mongoDB
mongoose.connect('mongodb://localhost:27017/pokemon/')
.then(() =>{
    console.log('conectado a mongodb')
})
.catch((err)=>{
    console.log('Error conectando al mongodb: '+ err);
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('El servidor web inició en el puerto 3000')
});

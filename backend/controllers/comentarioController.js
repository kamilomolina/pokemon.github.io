const Comentario = require('../models/comentario');

exports.crearComentario = async (req, res) => {
    try {
        const { texto } = req.body;

        if (!texto) {
            return res.status(400).json({ error: 'El campo texto es obligatorio.' });
        }

        const nuevoComentario = new Comentario({
            texto
        });

        await nuevoComentario.save();
        res.status(201).json({ message: 'Comentario creado con éxito', comentario: nuevoComentario });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
};

exports.obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find();
        res.status(200).json(comentarios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
};

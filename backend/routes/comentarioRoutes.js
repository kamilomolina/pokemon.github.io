const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

router.post('/', comentarioController.crearComentario);
router.get('/', comentarioController.obtenerComentarios);

module.exports = router;

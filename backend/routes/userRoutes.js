const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de autenticación
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Rutas protegidas para gestión de usuarios
router.delete('/:id', authMiddleware, UserController.deleteUser);
router.put('/:id', authMiddleware, UserController.updateUser);

module.exports = router;

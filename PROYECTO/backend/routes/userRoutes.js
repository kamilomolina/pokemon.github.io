// backend/routes/UserRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/isAuthenticated', UserController.isAuthenticated);

module.exports = router;

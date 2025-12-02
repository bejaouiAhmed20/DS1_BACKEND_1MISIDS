const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 3malna inscription leel utilsateur jdyd
router.post('/register', authController.register);

// 3malna connexion leel utilisateur existant
router.post('/login', authController.login);

module.exports = router;

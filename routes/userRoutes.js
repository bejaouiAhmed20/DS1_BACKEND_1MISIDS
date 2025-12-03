const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, isManager } = require('../middleware/auth');

// Ken les managers authentifiés ynajmouu ils accédent aux routes suivantes
router.use(authenticate);
router.use(isManager);

// Récupère tous les utilisateurs
router.get('/', userController.getAll);

// Récupère un utilisateur spécifique par son ID
router.get('/:id', userController.getById);

// Met à jour un utilisateur existant
router.put('/:id', userController.update);

// Supprime un utilisateur
router.delete('/:id', userController.delete);

module.exports = router;

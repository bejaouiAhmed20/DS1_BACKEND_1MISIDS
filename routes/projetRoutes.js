const express = require('express');
const router = express.Router();
const projetController = require('../controllers/projetController');
const { authenticate } = require('../middleware/auth');

// Ken les utilisateurs authentifiés ynajmouu ils accédent aux routes suivantes
router.use(authenticate);

// Crée un nouveau projet
router.post('/', projetController.create);

// Récupère tous les projets de l'utilisateur
router.get('/', projetController.getAll);

// Récupère un projet spécifique par son ID
router.get('/:id', projetController.getById);

// Met à jour un projet existant
router.put('/:id', projetController.update);

// Supprime un projet
router.delete('/:id', projetController.delete);

module.exports = router;

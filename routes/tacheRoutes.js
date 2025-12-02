const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tacheController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// Création d'une nouvelle tâche
router.post('/', tacheController.create);

// Récupération de toutes les tâches
router.get('/', tacheController.getAll);

// Récupération d'une tâche spécifique par son ID
router.get('/:id', tacheController.getById);

// Modification complète d'une tâche existante
router.put('/:id', tacheController.update);

// Suppression d'une tâche
router.delete('/:id', tacheController.delete);

module.exports = router;

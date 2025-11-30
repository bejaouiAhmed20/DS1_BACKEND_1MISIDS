const express = require('express');
const router = express.Router();
const projetController = require('../controllers/projetController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.post('/', projetController.create);
router.get('/', projetController.getAll);
router.get('/:id', projetController.getById);
router.put('/:id', projetController.update);
router.delete('/:id', projetController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tacheController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.post('/', tacheController.create);
router.get('/', tacheController.getAll);
router.get('/:id', tacheController.getById);
router.put('/:id', tacheController.update);
router.delete('/:id', tacheController.delete);

module.exports = router;

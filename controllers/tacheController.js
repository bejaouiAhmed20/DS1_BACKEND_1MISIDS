const tacheService = require('../services/tacheService');

// Création leel tâche
exports.create = async (req, res) => {
  try {
    const tache = await tacheService.createTache(req.body, req.user.role);
    res.status(201).json(tache);
  } catch (error) {
    if (error.message === 'Only managers can assign tasks') {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

// Récupérer leel tâches koll
exports.getAll = async (req, res) => {
  try {
    const taches = await tacheService.getAllTaches(req.query);
    res.json(taches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va récupérer une seule tâche par ID
exports.getById = async (req, res) => {
  try {
    const tache = await tacheService.getTacheById(req.params.id);
    if (!tache) return res.status(404).json({ error: 'Tache not found' });
    res.json(tache);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va mettre à jour une tâche
exports.update = async (req, res) => {
  try {
    const tache = await tacheService.updateTache(req.params.id, req.body, req.user.role);
    res.json(tache);
  } catch (error) {
    if (error.message === 'Only managers can assign tasks') {
      return res.status(403).json({ error: error.message });
    }
    if (error.message === 'Tache not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

// On va supprimer une tâche
exports.delete = async (req, res) => {
  try {
    const result = await tacheService.deleteTache(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Tache not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

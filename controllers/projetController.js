const projetService = require('../services/projetService');

// Création leel projet
exports.create = async (req, res) => {
  try {
    const projet = await projetService.createProjet(req.body, req.user.id);
    res.status(201).json(projet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer leel projets koll
exports.getAll = async (req, res) => {
  try {
    const projets = await projetService.getAllProjets(req.user.role, req.user.id, req.query);
    res.json(projets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va récupérer un seul projet par ID
exports.getById = async (req, res) => {
  try {
    const projet = await projetService.getProjetById(req.params.id);
    if (!projet) return res.status(404).json({ error: 'Projet not found' });

    // 3malna controle d'accés akeeka ynajem ken manager ou propriétaire peut accéder
    projetService.checkAccess(projet, req.user.role, req.user.id);
    res.json(projet);
  } catch (error) {
    if (error.message === 'Access denied') {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

// On va mettre à jour un projet
exports.update = async (req, res) => {
  try {
    const projet = await projetService.getProjetById(req.params.id);
    if (!projet) return res.status(404).json({ error: 'Projet not found' });

    // Ken l'utilisateur moch manager wala moch propritaire du projet donc il n'a pas l'accés
    projetService.checkAccess(projet, req.user.role, req.user.id);

    const updatedProjet = await projetService.updateProjet(req.params.id, req.body);
    res.json(updatedProjet);
  } catch (error) {
    if (error.message === 'Access denied') {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

// On va supprimer un projet
exports.delete = async (req, res) => {
  try {
    const projet = await projetService.getProjetById(req.params.id);
    if (!projet) return res.status(404).json({ error: 'Projet not found' });

    // On a vérifier les permissions
    projetService.checkAccess(projet, req.user.role, req.user.id);

    // On a supprimer le projet
    const result = await projetService.deleteProjet(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Access denied') {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

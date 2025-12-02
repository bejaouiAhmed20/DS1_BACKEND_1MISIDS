const Tache = require('../models/Tache');

// Créer une tâche
exports.create = async (req, res) => {
  try {
    const { utilisateurAssigne, ...data } = req.body;

    // On va verifier ken manager ynajjem yaamll tache 
    if (utilisateurAssigne && req.user.role !== 'manager') {
      return res.status(403).json({ error: 'Only managers can assign tasks' });
    }

    // 3malna création l tache (avec ou sans utilisateur assigné)
    const tache = new Tache({ ...data, utilisateurAssigne: utilisateurAssigne || null });
    await tache.save();
    res.status(201).json(tache);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va récupérer toutes les tâches
exports.getAll = async (req, res) => {
  try {
    const { search, sortBy, order, statut, projet } = req.query;
    const filter = {};

    // 3malna recherche titre ou description contenant le texte
    if (search) {
      filter.$or = [
        { titre: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    // Filtre par statut
    if (statut) filter.statut = statut;

    // Filtre par projet
    if (projet) filter.projet = projet;

    // Tri dynamique
    const sort = {};
    if (sortBy) sort[sortBy] = order === 'desc' ? -1 : 1;
    const taches = await Tache.find(filter)
    .sort(sort)
    .populate('projet', 'nom') // On va récupérer ken nom du projet
    .populate('utilisateurAssigne', 'nom login'); // On va récupérer info de l’utilisateur
    res.json(taches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va récupérer une tâche par ID
exports.getById = async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id).populate('projet', 'nom').populate('utilisateurAssigne', 'nom login');
    if (!tache) return res.status(404).json({ error: 'Tache not found' });
    res.json(tache);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va mettre à jour une tâche
exports.update = async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id);
    if (!tache) return res.status(404).json({ error: 'Tache not found' });

    // Ken l'utilisateur moch manager ne peut PAS assigner une tâche
    if (req.body.utilisateurAssigne && req.user.role !== 'manager') {
      return res.status(403).json({ error: 'Only managers can assign tasks' });
    }
    Object.assign(tache, req.body);
    await tache.save();
    res.json(tache);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va supprimer une tâche
exports.delete = async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id);
    if (!tache) return res.status(404).json({ error: 'Tache not found' });
    await tache.deleteOne();
    res.json({ message: 'Tache deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


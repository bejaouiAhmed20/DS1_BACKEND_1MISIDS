const Tache = require('../models/Tache');

exports.create = async (req, res) => {
  try {
    const { utilisateurAssigne, ...data } = req.body;
    if (utilisateurAssigne && req.user.role !== 'manager') {
      return res.status(403).json({ error: 'Only managers can assign tasks' });
    }
    const tache = new Tache({ ...data, utilisateurAssigne: utilisateurAssigne || null });
    await tache.save();
    res.status(201).json(tache);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { search, sortBy, order, statut, projet } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { titre: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (statut) filter.statut = statut;
    if (projet) filter.projet = projet;
    const sort = {};
    if (sortBy) sort[sortBy] = order === 'desc' ? -1 : 1;
    const taches = await Tache.find(filter).sort(sort).populate('projet', 'nom').populate('utilisateurAssigne', 'nom login');
    res.json(taches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id).populate('projet', 'nom').populate('utilisateurAssigne', 'nom login');
    if (!tache) return res.status(404).json({ error: 'Tache not found' });
    res.json(tache);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id);
    if (!tache) return res.status(404).json({ error: 'Tache not found' });
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

const Projet = require('../models/Projet');

exports.create = async (req, res) => {
  try {
    const projet = new Projet({ ...req.body, proprietaire: req.user.id });
    await projet.save();
    res.status(201).json(projet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const filter = req.user.role === 'manager' ? {} : { proprietaire: req.user.id };
    const projets = await Projet.find(filter).populate('proprietaire', 'nom login');
    res.json(projets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id).populate('proprietaire', 'nom login');
    if (!projet) return res.status(404).json({ error: 'Projet not found' });
    if (req.user.role !== 'manager' && projet.proprietaire._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(projet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);
    if (!projet) return res.status(404).json({ error: 'Projet not found' });
    if (req.user.role !== 'manager' && projet.proprietaire.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    Object.assign(projet, req.body);
    await projet.save();
    res.json(projet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);
    if (!projet) return res.status(404).json({ error: 'Projet not found' });
    if (req.user.role !== 'manager' && projet.proprietaire.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    await projet.deleteOne();
    res.json({ message: 'Projet deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

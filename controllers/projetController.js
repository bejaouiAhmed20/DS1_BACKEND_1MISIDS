const Projet = require('../models/Projet');

// Création leel projet
exports.create = async (req, res) => {
  try {
    const projet = new Projet({ ...req.body, proprietaire: req.user.id });
    await projet.save();
    res.status(201).json(projet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer leel projets koll
exports.getAll = async (req, res) => {
  try {

    // ken manager moch beech ya3mel filtre sinon beech ye5edh les projets du proprietaire
    const filter = req.user.role === 'manager' ? {} : { proprietaire: req.user.id };
    const { search, sortBy, order } = req.query;

    // On va rechercher par nom ou description
    if (search) {
      filter.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 3malna Construction de l’objet de tri
    const sort = {};
    if (sortBy) sort[sortBy] = order === 'desc' ? -1 : 1;

    // 3malna récupération + tri + jointure pour afficher le nom/login du propriétaire
    const projets = await Projet.find(filter).sort(sort).populate('proprietaire', 'nom login');
    res.json(projets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va récupérer un seul projet par ID
exports.getById = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id).populate('proprietaire', 'nom login');
    if (!projet) return res.status(404).json({ error: 'Projet not found' });

    // 3malna controle d'accés akeeka ynajem ken manager ou propriétaire peut accéder
    if (req.user.role !== 'manager' && projet.proprietaire._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(projet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va mettre à jour un projet
exports.update = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);

    // On a verifié ken projet existe wala lee
    if (!projet) return res.status(404).json({ error: 'Projet not found' });

    // Ken l'utilisateur moch manager wala moch propritaire du projet donc il n'a pas l'accés 
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

// On va supprimer un projet
exports.delete = async (req, res) => {
  try {

    // Farkassna 3al projet
    const projet = await Projet.findById(req.params.id);
    if (!projet) return res.status(404).json({ error: 'Projet not found' });
    
     // On a vérifier les permissions
    if (req.user.role !== 'manager' && projet.proprietaire.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // On a supprimer le projet
    await projet.deleteOne();
    res.json({ message: 'Projet deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


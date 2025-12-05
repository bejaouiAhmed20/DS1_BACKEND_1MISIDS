const Projet = require('../models/Projet');

// Création leel projet jdyd
const createProjet = async (data, userId) => {
  const projet = new Projet({ ...data, proprietaire: userId });
  await projet.save();
  return projet;
};

// Récupération leel projets koll avec recherche et tri
const getAllProjets = async (userRole, userId, query) => {
  // Ken manager moch beech ya3mel filtre sinon beech ye5edh les projets du proprietaire
  const filter = userRole === 'manager' ? {} : { proprietaire: userId };
  const { search, sortBy, order } = query;

  // n3mlou rechercher par nom ou description
  if (search) {
    filter.$or = [
      { nom: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // 3malna Construction de l'objet de tri
  const sort = {};
  if (sortBy) sort[sortBy] = order === 'desc' ? -1 : 1;

  // 3malna récupération + tri + jointure pour afficher le nom/login du propriétaire
  return await Projet.find(filter).sort(sort).populate('proprietaire', 'nom login');
};

// Récupération d'un projet par ID
const getProjetById = async (id) => {
  return await Projet.findById(id).populate('proprietaire', 'nom login');
};

// Mise à jour d'un projet
const updateProjet = async (id, data) => {
  const projet = await Projet.findById(id);
  if (!projet) throw new Error('Projet not found');
  Object.assign(projet, data);
  await projet.save();
  return projet;
};

// Suppression d'un projet
const deleteProjet = async (id) => {
  const projet = await Projet.findById(id);
  if (!projet) throw new Error('Projet not found');
  await projet.deleteOne();
  return { message: 'Projet deleted' };
};

// Vérification des permissions d'accès
const checkAccess = (projet, userRole, userId) => {
  if (userRole !== 'manager' && projet.proprietaire._id.toString() !== userId) {
    throw new Error('Access denied');
  }
};

module.exports = {
  createProjet,
  getAllProjets,
  getProjetById,
  updateProjet,
  deleteProjet,
  checkAccess
};

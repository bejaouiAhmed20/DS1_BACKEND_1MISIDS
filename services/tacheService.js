const Tache = require('../models/Tache');

// Création leel tâche jdyda
const createTache = async (data, userRole) => {
  const { utilisateurAssigne, ...rest } = data;
  
  // Ken l'utilisateur moch manager ma ynajemch ya3mel assignation
  if (utilisateurAssigne && userRole !== 'manager') {
    throw new Error('Only managers can assign tasks');
  }
  
  const tache = new Tache({ ...rest, utilisateurAssigne: utilisateurAssigne || null });
  await tache.save();
  return tache;
};

// Récupération leel tâches koll avec recherche et tri
const getAllTaches = async (query) => {
  const { search, sortBy, order, statut, projet } = query;
  const filter = {};

  // On va rechercher par titre ou description
  if (search) {
    filter.$or = [
      { titre: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // Filtrage par statut
  if (statut) filter.statut = statut;

  // Filtrage par projet
  if (projet) filter.projet = projet;

  // 3malna Construction de l'objet de tri
  const sort = {};
  if (sortBy) sort[sortBy] = order === 'desc' ? -1 : 1;

  // 3malna récupération + tri + jointure
  return await Tache.find(filter).sort(sort).populate('projet', 'nom').populate('utilisateurAssigne', 'nom login');
};

// Récupération d'une tâche par ID
const getTacheById = async (id) => {
  return await Tache.findById(id).populate('projet', 'nom').populate('utilisateurAssigne', 'nom login');
};

// Mise à jour d'une tâche
const updateTache = async (id, data, userRole) => {
  const tache = await Tache.findById(id);
  if (!tache) throw new Error('Tache not found');

  // Ken l'utilisateur moch manager ma ynajemch ya3mel assignation
  if (data.utilisateurAssigne && userRole !== 'manager') {
    throw new Error('Only managers can assign tasks');
  }

  Object.assign(tache, data);
  await tache.save();
  return tache;
};

// Suppression d'une tâche
const deleteTache = async (id) => {
  const tache = await Tache.findById(id);
  if (!tache) throw new Error('Tache not found');
  await tache.deleteOne();
  return { message: 'Tache deleted' };
};

module.exports = {
  createTache,
  getAllTaches,
  getTacheById,
  updateTache,
  deleteTache
};

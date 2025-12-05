const User = require('../models/User');

// Récupération leel utilisateurs koll avec recherche et tri
const getAllUsers = async (query) => {
  const { search, sortBy, order } = query;
  const filter = {};

  // On va rechercher par nom ou login
  if (search) {
    filter.$or = [
      { nom: { $regex: search, $options: 'i' } },
      { login: { $regex: search, $options: 'i' } }
    ];
  }

  // 3malna Construction de l'objet de tri
  const sort = {};
  if (sortBy) sort[sortBy] = order === 'desc' ? -1 : 1;

  // 3malna récupération + tri + exclusion du mot de passe
  return await User.find(filter).select('-motDePasse').sort(sort);
};

// Récupération d'un utilisateur par ID
const getUserById = async (id) => {
  const user = await User.findById(id).select('-motDePasse');
  if (!user) throw new Error('User not found');
  return user;
};

// Mise à jour d'un utilisateur
const updateUser = async (id, data) => {
  // On va exclure le mot de passe des données à mettre à jour
  const { motDePasse, ...updateData } = data;
  
  const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-motDePasse');
  if (!user) throw new Error('User not found');
  return user;
};

// Suppression d'un utilisateur
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return { message: 'User deleted' };
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

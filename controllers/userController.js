const User = require('../models/User');

// Récupérer leel utilisateurs koll
exports.getAll = async (req, res) => {
  try {
    const { search, sortBy, order } = req.query;
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
    const users = await User.find(filter).select('-motDePasse').sort(sort);
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va récupérer un seul utilisateur par ID
exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-motDePasse');

    // On a verifié ken utilisateur existe wala lee
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va mettre à jour un utilisateur
exports.update = async (req, res) => {
  try {
    // On va exclure le mot de passe des données à mettre à jour
    const { motDePasse, ...data } = req.body;

    // On va mettre à jour l'utilisateur
    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true }).select('-motDePasse');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va supprimer un utilisateur
exports.delete = async (req, res) => {
  try {
    // Farkassna 3al utilisateur
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // On a supprimer l'utilisateur
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

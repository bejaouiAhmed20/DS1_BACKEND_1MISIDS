const userService = require('../services/userService');

// Récupération leel utilisateurs koll
exports.getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// On va récupérer un seul utilisateur par ID
exports.getById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

// On va mettre à jour un utilisateur
exports.update = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

// On va supprimer un utilisateur
exports.delete = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

const mongoose = require('mongoose');

// Schéma MongoDB pour les utilisateurs
const UserSchema = new mongoose.Schema({

  // Nom complet de l'utilisateur
  nom: { type: String, required: true },

  // Identifiant de connexion
  login: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },

  // Rôle de l'utilisateur
  role: { type: String, enum: ['user', 'manager'], default: 'user' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

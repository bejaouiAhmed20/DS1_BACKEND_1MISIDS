const mongoose = require('mongoose');

// Schéma MongoDB pour les projets
const ProjetSchema = new mongoose.Schema({

  // Nom du projet (obligatoire)
  nom: { type: String, required: true },

  // Description du projet (optionnelle)
  description: { type: String },

  // 3malna Référence à l'utilisateur propriétaire du projet
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Statut du projet avec valeurs prédéfinies
  statut: { type: String, enum: ['en cours', 'terminé', 'en pause'], default: 'en cours' },
  
  // Date de création automatique
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Projet', ProjetSchema);

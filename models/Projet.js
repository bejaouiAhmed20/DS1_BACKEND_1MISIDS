const mongoose = require('mongoose');

const ProjetSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  statut: { type: String, enum: ['en cours', 'terminé', 'en pause'], default: 'en cours' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Projet', ProjetSchema);

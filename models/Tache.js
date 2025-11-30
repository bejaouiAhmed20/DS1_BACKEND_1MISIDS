const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  statut: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  deadline: { type: Date },
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true },
  utilisateurAssigne: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tache', TacheSchema);

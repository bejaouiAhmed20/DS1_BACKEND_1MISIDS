const mongoose = require('mongoose');

// Schéma MongoDB pour les tâches
const TacheSchema = new mongoose.Schema({

  // Titre de la tâche (obligatoire)
  titre: { type: String, required: true },

  // Description détaillée de la tâche 
  description: { type: String },

  // Statut d'avancement de la tâche
  statut: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  
  // Date limite pour réaliser la tâche 
  deadline: { type: Date },
  
  // Référence au projet auquel la tâche appartient 
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true },
  
  // Référence à l'utilisateur assigné à la tâche 
  utilisateurAssigne: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // Date de création automatique
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tache', TacheSchema);

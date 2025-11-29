const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: String, enum: ['user', 'manager'], default: 'user' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

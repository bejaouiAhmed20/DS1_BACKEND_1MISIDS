const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const signToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET, // 3malna Clé secrète pour signer le token
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } // Durée de validité
  );
};

const register = async ({ nom, login, motDePasse, role }) => {

  // On va vérifier ken login existe wala lee
  const exists = await User.findOne({ login });
  if (exists) throw new Error('Login already used');

  // 3malna Hachage leel mot de passe
  const hashedPassword = await bcrypt.hash(motDePasse, 10);
  
  // On a crée et sauvegardé l'utilisateur
  const user = new User({ nom, login, motDePasse: hashedPassword, role });
  await user.save();

  // Génération du token JWT
  const token = signToken(user);

  // Beech nraj3ouu les informations utilisateur men ghyr mot de passe et token
  return { user: { id: user._id, nom: user.nom, login: user.login, role: user.role }, token };
};

const login = async ({ login, motDePasse }) => {

  // Recherche l'utilisateur par login
  const user = await User.findOne({ login });
  if (!user) throw new Error('Invalid credentials');

  // On a Comparé le mot de passe fourni avec le hash stocké
  const ok = await bcrypt.compare(motDePasse, user.motDePasse);
  if (!ok) throw new Error('Invalid credentials');
  const token = signToken(user);

  // Beech nraj3ouu les informations utilisateur et le token
  return { user: { id: user._id, nom: user.nom, login: user.login, role: user.role }, token };
};

module.exports = { register, login };

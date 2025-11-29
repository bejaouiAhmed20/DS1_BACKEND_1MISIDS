const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const signToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const register = async ({ nom, login, motDePasse, role }) => {
  const exists = await User.findOne({ login });
  if (exists) throw new Error('Login already used');
  const hashedPassword = await bcrypt.hash(motDePasse, 10);
  const user = new User({ nom, login, motDePasse: hashedPassword, role });
  await user.save();
  const token = signToken(user);
  return { user: { id: user._id, nom: user.nom, login: user.login, role: user.role }, token };
};

const login = async ({ login, motDePasse }) => {
  const user = await User.findOne({ login });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(motDePasse, user.motDePasse);
  if (!ok) throw new Error('Invalid credentials');
  const token = signToken(user);
  return { user: { id: user._id, nom: user.nom, login: user.login, role: user.role }, token };
};

module.exports = { register, login };

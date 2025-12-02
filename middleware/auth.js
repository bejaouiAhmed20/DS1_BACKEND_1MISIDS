const jwt = require('jsonwebtoken');

// On va vérifier la validité d'un token JWT feel en-têtes de la requête

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // On va ajouter les données mtee l'utilisateur décodées à l'objet requête
    req.user = decoded;

    // Beech net3adew leel middleware lyy ba3dou
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.isManager = (req, res, next) => {

  // On va vérifier si le rôle de l'utilisateur est 'manager'
  if (req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Ken l'utilisateur est manager, net3adew leel middleware lyy ba3dou
  next();
};

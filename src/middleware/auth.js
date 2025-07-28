const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo-dev';

module.exports = function (req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ erro: 'Token ausente' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};

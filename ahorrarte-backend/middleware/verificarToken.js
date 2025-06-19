const jwt = require('jsonwebtoken');
const { secreto } = require('../config');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

  try {
    const decodificado = jwt.verify(token, secreto);
    req.usuarioId = decodificado.id;
    next();
  } catch {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

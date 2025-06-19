const Usuario = require('../modelos/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secreto } = require('../config');

exports.iniciarSesion = async (req, res) => {
  const { correo, contraseña } = req.body;
  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario) return res.status(400).json({ mensaje: 'Usuario no encontrado' });

  const valido = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!valido) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: usuario.id }, secreto);
  res.json({ token });
};
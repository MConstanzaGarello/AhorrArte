const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  nombre: DataTypes.STRING,
  correo: { type: DataTypes.STRING, unique: true },
  contraseña: DataTypes.STRING,
});

Usuario.beforeCreate(async (usuario) => {
  usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
});

module.exports = Usuario;

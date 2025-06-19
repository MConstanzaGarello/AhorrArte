const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Categoria = sequelize.define('Categoria', {
  nombre: DataTypes.STRING,
  usuarioId: DataTypes.INTEGER,
});

module.exports = Categoria;

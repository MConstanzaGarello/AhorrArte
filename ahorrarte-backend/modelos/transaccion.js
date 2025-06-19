const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Transaccion = sequelize.define('Transaccion', {
  tipo: DataTypes.STRING,
  fecha: DataTypes.STRING,
  monto: DataTypes.FLOAT,
  categoria: DataTypes.STRING,
  usuarioId: DataTypes.INTEGER,
});

module.exports = Transaccion;

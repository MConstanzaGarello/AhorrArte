const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Presupuesto = sequelize.define('Presupuesto', {
  categoria: DataTypes.STRING,
  monto: DataTypes.FLOAT,
  usuarioId: DataTypes.INTEGER,
});

module.exports = Presupuesto;

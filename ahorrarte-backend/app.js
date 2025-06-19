const express = require('express');
const cors = require('cors');
const { sequelize } = require('./modelos');

const usuarioRutas = require('./rutas/usuarioRutas');
const autenticacionRutas = require('./rutas/autenticacionRutas');
const transaccionRutas = require('./rutas/transaccionRutas');
const categoriaRutas = require('./rutas/categoriaRutas');
const presupuestoRutas = require('./rutas/presupuestoRutas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRutas);
app.use('/api/login', autenticacionRutas);
app.use('/api/transacciones', transaccionRutas);
app.use('/api/categorias', categoriaRutas);
app.use('/api/presupuestos', presupuestoRutas);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
  );
});

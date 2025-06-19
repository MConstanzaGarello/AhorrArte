const express = require('express');
const {
  listarTransacciones,
  crearTransaccion,
  editarTransaccion,
  eliminarTransaccion,
} = require('../controladores/transaccionControlador');
const verificarToken = require('../middleware/verificarToken');
const router = express.Router();

router.get('/', verificarToken, listarTransacciones);
router.post('/', verificarToken, crearTransaccion);
router.put('/:id', verificarToken, editarTransaccion);
router.delete('/:id', verificarToken, eliminarTransaccion);

module.exports = router;

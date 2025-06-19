const express = require('express');
const {
  listarPresupuestos,
  crearPresupuesto,
  editarPresupuesto,
  eliminarPresupuesto,
} = require('../controladores/presupuestoControlador');
const verificarToken = require('../middleware/verificarToken');
const router = express.Router();

router.get('/', verificarToken, listarPresupuestos);
router.post('/', verificarToken, crearPresupuesto);
router.put('/:id', verificarToken, editarPresupuesto);
router.delete('/:id', verificarToken, eliminarPresupuesto);

module.exports = router;

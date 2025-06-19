const express = require('express');
const {
  listarCategorias,
  crearCategoria,
  editarCategoria,
  eliminarCategoria,
} = require('../controladores/categoriaControlador');
const verificarToken = require('../middleware/verificarToken');
const router = express.Router();

router.get('/', verificarToken, listarCategorias);
router.post('/', verificarToken, crearCategoria);
router.put('/:id', verificarToken, editarCategoria);
router.delete('/:id', verificarToken, eliminarCategoria);

module.exports = router;

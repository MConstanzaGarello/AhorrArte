const express = require('express');
const { crearUsuario } = require('../controladores/usuarioControlador');
const router = express.Router();

router.post('/', crearUsuario);

module.exports = router;

const express = require('express');
const { iniciarSesion } = require('../controladores/autenticacionControlador');
const router = express.Router();

router.post('/', iniciarSesion);

module.exports = router;

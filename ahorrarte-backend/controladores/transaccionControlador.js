const Transaccion = require('../modelos/transaccion');

exports.listarTransacciones = async (req, res) => {
  const { tipo } = req.query;
  const filtro = { where: { usuarioId: req.usuarioId } };
  if (tipo) filtro.where.tipo = tipo;
  const transacciones = await Transaccion.findAll(filtro);
  res.json(transacciones);
};

exports.crearTransaccion = async (req, res) => {
  const nueva = await Transaccion.create({ ...req.body, usuarioId: req.usuarioId });
  res.json(nueva);
};

exports.editarTransaccion = async (req, res) => {
  await Transaccion.update(req.body, { where: { id: req.params.id, usuarioId: req.usuarioId } });
  res.json({ mensaje: 'Transacción actualizada' });
};

exports.eliminarTransaccion = async (req, res) => {
  await Transaccion.destroy({ where: { id: req.params.id, usuarioId: req.usuarioId } });
  res.json({ mensaje: 'Transacción eliminada' });
};

const Presupuesto = require('../modelos/presupuesto');

exports.listarPresupuestos = async (req, res) => {
  const presupuestos = await Presupuesto.findAll({ where: { usuarioId: req.usuarioId } });
  res.json(presupuestos);
};

exports.crearPresupuesto = async (req, res) => {
  const nuevo = await Presupuesto.create({ ...req.body, usuarioId: req.usuarioId });
  res.json(nuevo);
};

exports.editarPresupuesto = async (req, res) => {
  await Presupuesto.update(req.body, { where: { id: req.params.id, usuarioId: req.usuarioId } });
  res.json({ mensaje: 'Presupuesto actualizado' });
};

exports.eliminarPresupuesto = async (req, res) => {
  await Presupuesto.destroy({ where: { id: req.params.id, usuarioId: req.usuarioId } });
  res.json({ mensaje: 'Presupuesto eliminado' });
};

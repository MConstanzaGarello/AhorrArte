const Categoria = require('../modelos/categoria');

exports.listarCategorias = async (req, res) => {
  const categorias = await Categoria.findAll({ where: { usuarioId: req.usuarioId } });
  res.json(categorias);
};

exports.crearCategoria = async (req, res) => {
  const nueva = await Categoria.create({ ...req.body, usuarioId: req.usuarioId });
  res.json(nueva);
};

exports.editarCategoria = async (req, res) => {
  await Categoria.update(req.body, { where: { id: req.params.id, usuarioId: req.usuarioId } });
  res.json({ mensaje: 'Categoría actualizada' });
};

exports.eliminarCategoria = async (req, res) => {
  await Categoria.destroy({ where: { id: req.params.id, usuarioId: req.usuarioId } });
  res.json({ mensaje: 'Categoría eliminada' });
};

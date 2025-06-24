// controllers/categoryController.js

const categoryModel = require('../models/categoryModel');

exports.getAll = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories(req.app.locals.db);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
  }
};

exports.getById = async (req, res) => {
  try {
    const category = await categoryModel.getCategoryById(req.app.locals.db, req.params.id);
    if (!category) return res.status(404).json({ error: 'Catégorie non trouvée' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.create = async (req, res) => {
  try {
    const result = await categoryModel.createCategory(req.app.locals.db, req.body);
    res.status(201).json({ message: 'Catégorie créée', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await categoryModel.updateCategory(req.app.locals.db, req.params.id, req.body);
    if (result.modifiedCount === 0) return res.status(404).json({ error: 'Catégorie non modifiée ou introuvable' });
    res.json({ message: 'Catégorie mise à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await categoryModel.deleteCategory(req.app.locals.db, req.params.id);
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Catégorie non trouvée' });
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};

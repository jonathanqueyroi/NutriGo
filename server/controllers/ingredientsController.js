// controllers/ingredientsController.js
const ingredientModel = require('../models/ingredientModel');

exports.getAll = async (req, res) => {
  try {
    const ingredients = await ingredientModel.getAllIngredients(req.app.locals.db);
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des ingrédients' });
  }
};

exports.getById = async (req, res) => {
  try {
    const ingredient = await ingredientModel.getIngredientById(req.app.locals.db, req.params.id);
    if (!ingredient) return res.status(404).json({ error: 'Ingrédient non trouvé' });
    res.json(ingredient);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.create = async (req, res) => {
  try {
    const result = await ingredientModel.createIngredient(req.app.locals.db, req.body);
    res.status(201).json({ message: 'Ingrédient créé', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await ingredientModel.updateIngredient(req.app.locals.db, req.params.id, req.body);
    if (result.modifiedCount === 0) return res.status(404).json({ error: 'Ingrédient non modifié ou introuvable' });
    res.json({ message: 'Ingrédient mis à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

const { ObjectId } = require('mongodb'); // 👈 tout en haut du fichier, si pas déjà présent

exports.delete = async (req, res) => {
  console.log("🔍 Suppression de l'ingrédient avec ID :", req.params.id);

  // ✅ Vérification explicite de l'ID
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, error: 'ID invalide' });
  }

  try {
    const result = await ingredientModel.deleteIngredient(req.app.locals.db, req.params.id);
    if (result.deletedCount === 0)
      return res.status(404).json({ success: false, error: 'Ingrédient non trouvé' });

    res.json({ success: true, message: 'Ingrédient supprimé' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erreur lors de la suppression' });
  }
};


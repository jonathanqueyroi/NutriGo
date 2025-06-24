// models/recipeModel.js
const { ObjectId } = require('mongodb');

async function getAllRecipes(db) {
  return await db.collection('recipes').find().toArray();
}

async function getRecipeById(db, id) {
  return await db.collection('recipes').findOne({ _id: new ObjectId(id) });
}

async function createRecipe(db, data) {
  // Vérifie si categoryId est fourni et valide
  if (data.categoryId) {
    if (!ObjectId.isValid(data.categoryId)) {
      throw new Error('Format d’ID de catégorie invalide');
    }

    // Vérifie que la liste des ingrédients est bien un tableau d'objets { nom, quantite }
    if (data.ingredients && Array.isArray(data.ingredients)) {
      const formatCorrect = data.ingredients.every(ing => typeof ing.nom === 'string' && typeof ing.quantite === 'string');
      if (!formatCorrect) {
        throw new Error('Chaque ingrédient doit avoir un champ "nom" (string) et "quantite" (string).');
      }
    }

    const category = await db.collection('categories').findOne({ _id: new ObjectId(data.categoryId) });
    if (!category) {
      throw new Error('Catégorie non trouvée');
    }

    // Convertir en ObjectId avant insertion
    data.categoryId = new ObjectId(data.categoryId);
  }

  return await db.collection('recipes').insertOne(data);
}

async function updateRecipe(db, id, data) {
  // Vérification du categoryId
  if (data.categoryId) {
    if (!ObjectId.isValid(data.categoryId)) {
      throw new Error('Format d’ID de catégorie invalide');
    }
    data.categoryId = new ObjectId(data.categoryId);
  }

  // Vérification des ingrédients (nom + quantité)
  if (data.ingredients && Array.isArray(data.ingredients)) {
    const formatCorrect = data.ingredients.every(ing => 
      typeof ing.nom === 'string' && typeof ing.quantite === 'string'
    );
    if (!formatCorrect) {
      throw new Error('Chaque ingrédient doit avoir un champ "nom" (string) et "quantite" (string).');
    }
  }

  // Mise à jour de la recette
  return await db.collection('recipes').updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}

async function deleteRecipe(db, id) {
  return await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};

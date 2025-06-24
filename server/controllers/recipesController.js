// controllers/recipesController.js
const recipeModel = require('../models/recipeModel');

exports.getAll = async (req, res) => {
  try {
    const db = req.app.locals.db;

    // ⬇️ Récupération des filtres possibles
    const { maxCalories, minCalories, maxProteines, minGlucides, sortBy, order } = req.query;

    // ⬇️ Construction du filtre nutritionnel
    const filter = {};

    if (maxCalories) filter["nutrition.calories"] = { $lte: parseInt(maxCalories) };
    if (minCalories) filter["nutrition.calories"] = { ...filter["nutrition.calories"], $gte: parseInt(minCalories) };
    if (maxProteines) filter["nutrition.proteines"] = { $lte: parseInt(maxProteines) };
    if (minGlucides) filter["nutrition.glucides"] = { $gte: parseInt(minGlucides) };

    // ⬇️ Création dynamique du tri si demandé
    let sort = {};
    if (sortBy) {
      // Par exemple : sortBy = "calories", order = "asc" ou "desc"
      const sortDirection = order === 'desc' ? -1 : 1;

      // Important : on précise que le tri se fait sur le champ dans nutrition
      sort[`nutrition.${sortBy}`] = sortDirection;
    }

    // ⬇️ Exécution de l’agrégation MongoDB avec filtre, jointure et tri
    const pipeline = [
      { $match: filter },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      }
    ];

    // ⬇️ On insère l'étape de tri dans le pipeline si demandé
    if (sortBy) pipeline.push({ $sort: sort });

    const recipes = await db.collection('recipes').aggregate(pipeline).toArray();

    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
  }
};

exports.getById = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { ObjectId } = require('mongodb');

        const recipe = await db.collection('recipes').aggregate([
        { $match: { _id: new ObjectId(req.params.id) } },
        {
            $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category'
            }
        },
        {
            $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true
            }
        }
        ]).toArray();

        if (recipe.length === 0) return res.status(404).json({ error: 'Recette non trouvée' });

        res.json(recipe[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.create = async (req, res) => {
  try {
    const result = await recipeModel.createRecipe(req.app.locals.db, req.body);
    res.status(201).json({ message: 'Recette créée', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création de la recette' });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await recipeModel.updateRecipe(req.app.locals.db, req.params.id, req.body);
    if (result.modifiedCount === 0) return res.status(404).json({ error: 'Recette non modifiée ou introuvable' });
    res.json({ message: 'Recette mise à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la recette' });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await recipeModel.deleteRecipe(req.app.locals.db, req.params.id);
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Recette non trouvée' });
    res.json({ message: 'Recette supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la recette' });
  }
};

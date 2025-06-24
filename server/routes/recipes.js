// routes/recipes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipesController');

// Routes REST
router.get('/', recipeController.getAll);
router.post('/', recipeController.create);
router.get('/:id', recipeController.getById);
router.put('/:id', recipeController.update);
router.delete('/:id', recipeController.delete);

module.exports = router;

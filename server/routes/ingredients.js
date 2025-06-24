// routes/ingredients.js
const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientsController');

// Routes REST
router.get('/', ingredientController.getAll);
router.post('/', ingredientController.create); // 👈 Cette ligne est essentielle
router.get('/:id', ingredientController.getById);
router.put('/:id', ingredientController.update);
router.delete('/:id', ingredientController.delete);

module.exports = router;

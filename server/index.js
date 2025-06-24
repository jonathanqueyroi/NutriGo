const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Connexion MongoDB avec async/await
let db;

async function startServer() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI); // Pas besoin d'options dépréciées
    await client.connect();

    console.log('✅ Connecté à MongoDB Atlas');

    db = client.db('fit-recipes');
    app.locals.db = db;

    // Charger les routes
    const ingredientRoutes = require('./routes/ingredients');
    app.use('/api/ingredients', ingredientRoutes);

    const recipeRoutes = require('./routes/recipes');
    app.use('/api/recipes', recipeRoutes);

    const categoryRoutes = require('./routes/categories');
    app.use('/api/categories', categoryRoutes);

    app.get('/', (req, res) => {
      res.send('Bienvenue sur l’API Fit Recipes 👋');
    });

    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Serveur démarré sur http://192.168.1.27:${port}`);
    });

  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB :', error);
  }
}

startServer();

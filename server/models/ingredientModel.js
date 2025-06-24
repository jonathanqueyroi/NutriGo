// models/ingredientModel.js

async function getAllIngredients(db) {
    return await db.collection('ingredients').find().toArray();
  }
  
  async function getIngredientById(db, id) {
    const { ObjectId } = require('mongodb');
    return await db.collection('ingredients').findOne({ _id: new ObjectId(id) });
  }
  
  async function createIngredient(db, data) {
    const { ObjectId } = require('mongodb');
    const document = {
      ...data,
      _id: new ObjectId(), // ← force l'utilisation d'un ObjectId
    };
    return await db.collection('ingredients').insertOne(document);
  }  
  
  async function updateIngredient(db, id, data) {
    const { ObjectId } = require('mongodb');
    return await db.collection('ingredients').updateOne({ _id: new ObjectId(id) }, { $set: data });
  }
  
  const { ObjectId } = require('mongodb');

  function isValidObjectId(id) {
    return ObjectId.isValid(id);
  }
  
  async function deleteIngredient(db, id) {
    console.log("🗑️ ID passé à MongoDB :", id);
    if (!isValidObjectId(id)) throw new Error('ID invalide');
    return await db.collection('ingredients').deleteOne({ _id: new ObjectId(id) });
  }
  
  module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
  };
  
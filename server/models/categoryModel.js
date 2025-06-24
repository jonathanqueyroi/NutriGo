// models/categoryModel.js

async function getAllCategories(db) {
    return await db.collection('categories').find().toArray();
  }
  
  async function getCategoryById(db, id) {
    const { ObjectId } = require('mongodb');
    return await db.collection('categories').findOne({ _id: new ObjectId(id) });
  }
  
  async function createCategory(db, data) {
    return await db.collection('categories').insertOne(data);
  }
  
  async function updateCategory(db, id, data) {
    const { ObjectId } = require('mongodb');
    return await db.collection('categories').updateOne({ _id: new ObjectId(id) }, { $set: data });
  }
  
  async function deleteCategory(db, id) {
    const { ObjectId } = require('mongodb');
    return await db.collection('categories').deleteOne({ _id: new ObjectId(id) });
  }
  
  module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  };
  
const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const keys = require('./public/config/keys');

let database;

const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(keys.mongodb.dbURI);
    console.log('Connected to MongoDB');
    database = client.db(keys.mongodb.database);
  } catch (err) {
    console.log('Error connecting to MongoDB', err);
    throw err; // Ensure errors are handled
  }
};

// Call this function to initialize the database
connectToDatabase();

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

// API to get page links
router.get('/page-links/get-page-links', async (req, res) => {
  try {
    const db = getDatabase(); // Use the function to get the database instance

    const pageLinks = await db.collection('pageLinks').find({}).toArray();

    if (pageLinks.length === 0) {
      return res.status(404).send({ message: 'No data found!' });
    }
    res.send(pageLinks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

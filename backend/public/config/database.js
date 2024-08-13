const mongoose = require('mongoose');
const keys = require('./keys'); // Ensure this file correctly exports your MongoDB URI and database name

let database;

const connectToDatabase = async () => {
  try {
    const client = await mongoose.connect(keys.mongodb.dbURI);
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

module.exports = { getDatabase };

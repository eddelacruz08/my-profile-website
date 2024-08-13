const express = require('express');
const router = express.Router();

const { getDatabase } = require('../config/database');

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

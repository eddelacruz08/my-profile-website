const express = require('express');
const router = express.Router();

const PageLink = require('../models/PageLink'); // Import the PageLink model

// API to get page links
router.get('/page-links/get-page-links', async (req, res) => {
  try {
    const pageLinks = await PageLink.find({}); // Use the model to query the database

    if (pageLinks.length === 0) {
      return res.status(404).send({ message: 'No data found!' });
    }
    res.send(pageLinks);
  } catch (error) {
    console.error('Error while retrieving page links:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;

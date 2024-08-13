const mongoose = require('mongoose');

const pageLinksSchema = new mongoose.Schema({
  description: String,
  name: String,
  id: String,
  // Define other fields as needed
});

const pageLinks = mongoose.model('pageLinks', pageLinksSchema);

module.exports = pageLinks;

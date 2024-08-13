const mongoose = require('mongoose');

const pageLinkSchema = new mongoose.Schema({
  description: String,
  name: String,
  // Define other fields as needed
});

const PageLink = mongoose.model('pageLinks', pageLinkSchema);

module.exports = PageLink;

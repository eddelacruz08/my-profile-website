const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const pageLinkSchema = new mongoose.Schema({
  description: String,
  name: String,
  id: Int32,
  // Define other fields as needed
});

const PageLink = mongoose.model('PageLink', pageLinkSchema);

module.exports = PageLink;

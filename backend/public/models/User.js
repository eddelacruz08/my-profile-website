const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  username: String,
  thumbnail: String,
  hasData: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

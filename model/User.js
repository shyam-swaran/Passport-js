const mongoose = require("mongoose");
const { authDatabase } = require("../database");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    default: null,
  },
  facebookId: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  profilePicUrl: {
    type: String,
    default: null,
  },
});

module.exports = authDatabase.model("User", userSchema);

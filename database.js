const mongoose = require("mongoose");
const authDatabase = mongoose.createConnection("mongodb://127.0.0.1:27017/Auth");
module.exports = { authDatabase };

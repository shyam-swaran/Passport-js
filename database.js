require("dotenv").config();
const mongoose = require("mongoose");
const authDatabase = mongoose.createConnection(process.env.MONGODB_URL);
module.exports = { authDatabase };

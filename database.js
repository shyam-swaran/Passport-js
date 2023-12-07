require("dotenv").config();
const mongoose = require("mongoose");
const authDatabase = mongoose.createConnection(process.env.MONGODB_URL_AUTH);
const apiDatabase = mongoose.createConnection(process.env.MONGODB_URL_RES);
module.exports = { authDatabase, apiDatabase };

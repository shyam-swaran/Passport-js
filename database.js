const mongoose = require("mongoose");
const todosDatabse = mongoose.createConnection("mongodb://127.0.0.1:27017/Todos");
const authDatabase = mongoose.createConnection("mongodb://127.0.0.1:27017/Auth");
module.exports = { todosDatabse, authDatabase };

const mongoose = require("mongoose");
const { todosDatabse } = require("../database");
const todos = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
  },
  state: {
    type: Boolean,
  },
});
const todoSchema = new mongoose.Schema({
  _id: {
    type: Object,
    required: true,
  },
  todos: {
    type: [todos],
  },
});

module.exports = todosDatabse.model("Todos", todoSchema);

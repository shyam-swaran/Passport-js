const mongoose = require("mongoose");
const { apiDatabase } = require("../database");
const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    date: {
      type: String,
    },
    startTime: {
      type: String,
    },
    deadline: {
      type: String,
    },
    priority: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    option: {
      type: String,
    },
    tags: {
      type: String,
    },
  },
  { _id: false }
);
const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    requird: true,
  },
  tasks: {
    type: [taskSchema],
  },
});

module.exports = apiDatabase.model("resources", userSchema);

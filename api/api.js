const apiRoutes = require("express").Router();
const Res = require("../model/Res");

apiRoutes.get("/task/get", async (req, res) => {
  const { _id } = req.user;
  const newUser = new Res({
    _id: _id,
  });
  let user = await Res.findById(_id);
  if (!user) {
    user = await newUser.save();
  }
  res.json(user);
});

apiRoutes.post("/task/add", async (req, res) => {
  const { _id } = req.user;

  const tasks = await Res.findByIdAndUpdate(_id, { $push: { tasks: req.body } }, { new: true });
  res.json(tasks);
});

apiRoutes.put("/task/update", async (req, res) => {
  const { _id } = req.user;
  const updatedTask = req.body;
  const tasks = await Res.findOneAndUpdate({ _id: _id, "tasks.taskId": updatedTask.id }, { $set: { "tasks.$": updatedTask } }, { new: true });
  res.json(tasks);
});

apiRoutes.delete("/task/delete/:id", async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  await Res.findByIdAndUpdate(_id, { $pull: { tasks: { taskId: id } } });
  res.json({ success: "successfully deleted" });
});

module.exports = { apiRoutes };

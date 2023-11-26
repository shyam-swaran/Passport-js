const todoApi = require("express").Router();
const { authenticator } = require("./auth/auth");
const todoModel = require("./model/Todos");

todoApi.use(authenticator);
todoApi.put("/add", async (req, res) => {
  const { _id } = req.user;
  const data = req.body;
  try {
    let user = await todoModel.findOne({ _id: _id });
    if (!user) user = await todoModel({ _id: _id }).save();
    user.todos.push(data);
    await user.save();
    return res.send("successfully added");
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = todoApi;

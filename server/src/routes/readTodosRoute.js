const ToDoModel = require("../models/TodoModel");

module.exports = async (req, res) => {
  const todos = await ToDoModel.find();
  res.json(todos);
};

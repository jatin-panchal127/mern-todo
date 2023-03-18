const ToDoModel = require("../models/TodoModel");

module.exports = async (req, res) => {
  const { id } = req.params;
  const updatedText = req.body.text;
  const updatedCompleted = req.body.completed ? req.body.completed : "false";
  const todo = await ToDoModel.findById(id);
  todo.text = updatedText;
  todo.completed = updatedCompleted;
  await todo.save();
  res.json(todo);
};

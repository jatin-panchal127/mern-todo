const ToDoModel = require("../models/TodoModel");

module.exports = async (req, res) => {
  const { text } = req.body;
  const completed = req.body.completed ? req.body.completed : "false";
  const todo = new ToDoModel({ text, completed });
  const newTodo = await todo.save();
  res.json(newTodo);
};

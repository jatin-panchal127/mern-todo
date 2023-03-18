const express = require("express");
const loginRoute = require("./loginRoute");
const readTodosRoute = require("./readTodosRoute");
const isLoggedIn = require("../middleware/isLoggedIn");
const createTodoRoute = require("./createTodoRoute");
const updateTodoRoute = require("./updateTodoRoute");
const deleteTodoRoute = require("./deleteTodoRoute");

const router = express.Router();

router.post("/login", loginRoute);
router.get("/todos", isLoggedIn, readTodosRoute);
router.post("/todos", isLoggedIn, createTodoRoute);
router.put("/todos/:id", isLoggedIn, updateTodoRoute);
router.delete("/todos/:id", isLoggedIn, deleteTodoRoute);

module.exports = router;

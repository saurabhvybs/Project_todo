const express = require("express");
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const {
  addTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} = require("../controllers/todoController");

router.post("/addtodo",authenticate, addTodo);
router.put("/update/:id",authenticate, updateTodo);
router.delete("/delete/:id",authenticate, deleteTodo);
router.get("/todos/:email",authenticate, getTodos);

module.exports = router;
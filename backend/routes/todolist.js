const express = require("express");
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const {
  addTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} = require("../controllers/todoController");

router.post("/addtodo", addTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id",authenticate, deleteTodo);
router.get("/todos/:id",authenticate, getTodos);

module.exports = router;
const express = require("express");
const router = express.Router();
const {
  addTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} = require("../controllers/todoController");

router.post("/addtodo", addTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.get("/get/:id", getTodos);

module.exports = router;

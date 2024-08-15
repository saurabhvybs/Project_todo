const User = require("../models/user");
const List = require("../models/list");

// Add Todo
const addTodo = async (req, res) => {
  try {
    const { title, description, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ title, description, user: existingUser });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();
      return res.status(200).json({ list });
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  try {
    const { title, description, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true } // To return the updated document
      );
      if (updatedList) {
        return res.status(200).send("Todo Updated and Saved");
      } else {
        return res.status(404).send("ToDo not found");
      }
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user and pull the list item from their list
    const existingUser = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );

    // Find and delete the list item
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "ToDo Deleted" });
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
};

// Get Todos
const getTodos = async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      return res.status(200).json({ list });
    } else {
      return res.status(200).json({ message: "No Tasks to Show" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = {
  addTodo,
  updateTodo,
  deleteTodo,
  getTodos,
};

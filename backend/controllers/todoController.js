const User = require("../models/user");
const List = require("../models/list");

// // Add Todo
const addTodo = async (req, res) => {
  try {
    const { title, description, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ title, description, user: existingUser });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();

      const safeResponse = {
        _id: list._id,
        title: list.title,
        description: list.description,
        user: {
          _id: existingUser._id,
          email: existingUser.email,
          // Include only necessary properties
        },
      };
  
      return res.status(200).json(safeResponse);
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
    const { title, description } = req.body;
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (updatedList) {
      return res.status(200).json(updatedList);
    } else {
      return res.status(404).send("ToDo not found");
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
    const existingUser = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );
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
//getTodos 
const getTodos = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Now find the lists associated with this user
    const list = await List.find({ user: user._id }).sort({ createdAt: -1 });

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

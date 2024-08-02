const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/list");

//add ToDo
router.post("/addtodo", async (req, res) => {
  try {
    const { title, description, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ title, description, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
});

//Update ToDo
router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, email } = req.body;
    const existingUser = User.findOne({ email });
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
    return res.status(400).send("something went wrong");
  }
});

// Delete ToDo
router.delete("/delete/:id", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user and pull the list item from their list
    const existingUser = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );
    // Find and delete the list item
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "ToDo Deleted" })
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
});

//get ToDo
router.get("/get/:id", async (req,res) => {
    const list =await List.find({user: req.params.id}).sort({createdAt : -1});
    if(list.length!==0){
        res.status(200).json({list:list});
    }else{
        res.status(200).json({"message":"No Tasks to Show"});
    }
})

module.exports = router;

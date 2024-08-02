const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://shaanvybss:Qwerty%40123@todo.lu7aey8.mongodb.net/?retryWrites=true&w=majority&appName=Todo"
      )
      .then(() => {
        console.log("Db Connected");
      });
  } catch (error) {
    res.status(400).json({ message: "Db Not Connected" });
  }
};
conn();

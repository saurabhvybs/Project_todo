require('dotenv').config();
const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Db Connected");
      });
  } catch (error) {
    console.error("Db Not Connected", error);
  }
};

conn();

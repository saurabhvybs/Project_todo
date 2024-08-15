require('dotenv').config();
const mongoose = require("mongoose");

const ConnectionParams = {
  useNewUrlParser: true,    
  useUnifiedTopology: true, 
};

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, ConnectionParams)
      .then(() => {
        console.log("Db Connected");
      });
  } catch (error) {
    console.error("Db Not Connected", error);
  }
};

conn();

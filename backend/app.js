require('dotenv').config();

const express = require("express");
const cors = require('cors');

require("./conn/db");

const auth = require("./routes/authuser");
const list = require("./routes/todolist");
const contact= require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",auth);
app.use("/api/v2",list);
app.use("/api/v3",contact);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
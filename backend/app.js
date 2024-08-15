const express = require("express");
const cors = require('cors');

require("./conn/db");
require("./models/list");
const auth = require("./routes/authuser");
const list = require("./routes/todolist");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",auth);
app.use("/api/v2",list);

app.listen(1000, () => {
  console.log("Server Started");
});

const express = require("express");
const cors = require('cors');

require("./conn/db");
require("./models/list");
require("./models/contact");
require("./models/user");

const auth = require("./routes/authuser");
const list = require("./routes/todolist");
const contact= require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",auth);
app.use("/api/v2",list);
app.use("/api/v3",contact);

app.listen(1000, () => {
  console.log("Server Started");
});

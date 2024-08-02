const express = require("express");

require("./conn/db");
require("./models/list");
const auth = require("./routes/auth");
const list = require("./routes/list");

const app = express();
app.use(express.json());

app.use("/api/v1",auth);
app.use("/api/v2",list);

app.listen(1000, () => {
  console.log("Server Started");
});

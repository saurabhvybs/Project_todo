const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
  },],
},
{timestamps: true});

module.exports = mongoose.model("List", Schema);

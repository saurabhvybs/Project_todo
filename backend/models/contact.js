const mongoose = require("mongoose");
const { number } = require("zod");

const contactSchema = new mongoose.Schema(
    {
        username :{
            type: String,
            required:true,
        },
        email:{
            type : String,
            required:true,
            unique:true,

        },
        telephone :{
            type: Number,
            required: true,
            unique:true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
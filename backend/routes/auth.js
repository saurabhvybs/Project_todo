//This Page is Responsible for the Signup and Signin Part authentication.

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { z } = require("zod"); 
const { registerSchema, loginSchema } = require("../validators/userValidators");

// Sign Up
router.post("/register", async (req, res) => {
  try {
    // Validate request body
    registerSchema.parse(req.body);

    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User Already Exists" });
    }

    // Hash the password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ email, username, password: hashpassword });
    await user.save();

    return res.status(201).json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ msg: error.errors.map(err => err.message) });
    }
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Sign In
router.post("/login", async (req, res) => {
  try {
    // Validate request body
    loginSchema.parse(req.body);

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User Does Not Exist! Please Register" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Password Incorrect" });
    }

    // Exclude password from user data
    const { password: userPassword, ...others } = user._doc;
    return res.status(200).json({ user: others });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ msg: error.errors.map(err => err.message) });
    }
    return res.status(500).json({ msg: "Unexpected Error Occurred" });
  }
});

module.exports = router;

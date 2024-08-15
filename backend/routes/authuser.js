const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get('/todo', authenticate, (req, res) => {
    res.status(200).json({ user: req.user });
  });

module.exports = router;

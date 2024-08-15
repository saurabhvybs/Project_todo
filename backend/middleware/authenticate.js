const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header is missing" });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // Store the decoded user info in request object
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};

module.exports = authenticate;

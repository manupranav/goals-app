const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res) => {
  let token;
  if (
    req.header.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.header.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.ebv.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-paasword");
      next();
    } catch (error) {
      res.status(401).json({ message: "You are not authorized" });
    }
  } else {
    res.status(401).json({ message: "Token not provided" });
  }
});

module.exports = protect;

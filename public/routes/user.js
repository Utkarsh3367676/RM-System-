const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Registration endpoint
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const newUser = await User.create({ username, email, password, role });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT token here (not shown)
    res
      .status(200)
      .json({ message: "Login successful", token: "your_jwt_token" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

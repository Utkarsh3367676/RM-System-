const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Register user
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).send("User registered successfully!");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.sendFile(
        user.role === "admin"
          ? path.join(__dirname, "../public/admin-dashboard.html")
          : path.join(__dirname, "../public/user-dashboard.html")
      );
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Error logging in");
  }
});

module.exports = router;

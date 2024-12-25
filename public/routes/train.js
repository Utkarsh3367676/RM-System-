const express = require("express");
const Train = require("../models/Train");
const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const userRole = req.user.role; // Assuming user role is set in req.user
  if (userRole !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Add train endpoint
router.post("/add", isAdmin, async (req, res) => {
  const { trainNumber, name, totalSeats, route } = req.body;
  try {
    const newTrain = await Train.create({
      trainNumber,
      name,
      totalSeats,
      route,
    });
    res
      .status(201)
      .json({ message: "Train added successfully", train: newTrain });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

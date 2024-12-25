const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Train = require("../models/trainModel");
const Booking = require("../models/bookingModel");

// Add a train (Admin only)
router.post("/add", async (req, res) => {
  const { trainNumber, trainName, totalSeats, route } = req.body;
  console.log("Incoming data:", req.body);

  try {
    // Validate request data
    if (!trainNumber || !trainName || !totalSeats || !route) {
      return res.status(400).send("All fields are required.");
    }

    const newTrain = new Train({
      trainNumber,
      trainName,
      totalSeats,
      availableSeats: totalSeats,
      route,
    });

    await newTrain.save();

    res.status(201).send("Train added successfully!");
  } catch (err) {
    console.error("Error details:", err.message);
    console.error("Error stack:", err.stack);
    res.status(500).send("Error adding train");
  }
});

// Check seat availability
router.get("/availability", async (req, res) => {
  const { trainNumber } = req.query;
  try {
    // Validate query parameter
    if (!trainNumber) {
      return res.status(400).send("Train number is required");
    }

    const train = await Train.findOne({ trainNumber });
    if (!train) {
      return res.status(404).send("Train not found");
    }

    res.status(200).send(`Seats available: ${train.availableSeats}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error checking availability");
  }
});

// Book a seat
router.post("/book", async (req, res) => {
  const { trainNumber, seatCount } = req.body;
  try {
    // Validate request data
    if (!trainNumber || !seatCount) {
      return res.status(400).send("Train number and seat count are required");
    }

    if (seatCount <= 0) {
      return res.status(400).send("Seat count must be a positive number");
    }

    const train = await Train.findOne({ trainNumber });
    if (!train) {
      return res.status(404).send("Train not found");
    }

    if (train.availableSeats < seatCount) {
      return res.status(400).send("Insufficient seats available");
    }

    // Optimistic concurrency control with a session
    const session = await mongoose.startSession();
    session.startTransaction();

    // Decrease available seats
    train.availableSeats -= seatCount;
    await train.save({ session });

    // Create a booking record
    const booking = new Booking({ trainNumber, seatCount });
    await booking.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).send("Seat booked successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error booking seat");
  }
});

module.exports = router;

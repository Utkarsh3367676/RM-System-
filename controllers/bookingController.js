// controllers/bookingController.js
const { Op } = require('sequelize');
const User = require('../models/userModel');
const Train = require('../models/trainModel');
const Booking = require('../models/bookingModel');

// Get all bookings with the associated User and Train details
const GetBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], // Select only necessary fields
        },
        {
          model: Train,
          attributes: ['trainNumber', 'trainName', 'availableSeats'],
        },
      ],
    });
    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch bookings. Please try again later.' });
  }
};

// Book a seat for a user on a specific train
const BookSeat = async (req, res) => {
  const { trainNumber, seatCount, userId } = req.body;

  // Validate input data
  if (!trainNumber || !seatCount || !userId) {
    return res.status(400).json({ error: 'Missing required fields: trainNumber, seatCount, userId' });
  }

  if (isNaN(seatCount) || seatCount <= 0) {
    return res.status(400).json({ error: 'Invalid seat count. Must be a positive number.' });
  }

  try {
    // Find the train by its train number
    const train = await Train.findOne({ where: { trainNumber } });
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }

    // Check if the train has enough available seats
    if (train.availableSeats < seatCount) {
      return res.status(400).json({ error: 'Not enough seats available on this train' });
    }

    // Update the available seats on the train
    train.availableSeats -= seatCount;
    await train.save();

    // Create the booking
    const booking = await Booking.create({
      seatCount,
      status: 'confirmed', // You could add more statuses like 'pending', 'cancelled', etc.
      UserId: userId, // Assuming the userId is passed from the request body
      TrainId: train.id, // Reference to the train that was booked
    });

    // Include the booked train and user details in the response
    const newBooking = await Booking.findOne({
      where: { id: booking.id },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Train,
          attributes: ['trainNumber', 'trainName', 'availableSeats'],
        },
      ],
    });

    // Return the new booking with associated data
    return res.status(201).json({ message: 'Booking confirmed', booking: newBooking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while processing the booking. Please try again later.' });
  }
};

module.exports = { GetBookings, BookSeat };

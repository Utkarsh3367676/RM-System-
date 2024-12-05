// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { BookSeat, GetBookings } = require('../controllers/bookingController');

// Get all bookings
router.get('/all', GetBookings);

// Book a seat
router.post('/book-seat', BookSeat);

module.exports = router;

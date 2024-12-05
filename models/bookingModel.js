// models/bookingModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');
const Train = require('./trainModel');

// Define the Booking model
const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  seatCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Set up associations
Booking.belongsTo(User);  // Booking belongs to a User
Booking.belongsTo(Train); // Booking belongs to a Train

module.exports = Booking;

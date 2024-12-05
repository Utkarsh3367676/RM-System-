// models/trainModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Train model
const Train = sequelize.define('Train', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  trainNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trainName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Train;

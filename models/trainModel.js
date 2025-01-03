// models/trainModel.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define the Train model
const Train = sequelize.define("Train", {
  trainNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trainName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Train;

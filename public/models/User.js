const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "user",
  },
});

module.exports = User;

// config/database.js
const { Sequelize } = require("sequelize");

// Create a connection to the database
const sequelize = new Sequelize("railway_management_system", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable SQL query logging (optional)
});

module.exports = sequelize;

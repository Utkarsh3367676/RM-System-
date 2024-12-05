// config/database.js
const { Sequelize } = require('sequelize');

// Create a connection to the database
const sequelize = new Sequelize('railway_management_system', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Correct path to database config

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure username is unique
    validate: {
      notEmpty: {
        msg: "Username is required", // Custom error message for empty username
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Email already exists", // Custom error message for duplicate email
    },
    validate: {
      isEmail: {
        msg: "Please provide a valid email address", // Custom error message for invalid email
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 100], // Password must be between 8 and 100 characters
        msg: "Password must be at least 8 characters long",
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user", // Default role
    validate: {
      isIn: {
        args: [["user", "admin"]],
        msg: "Role must be either 'user' or 'admin'",
      },
    },
  },
});

// Sync model to create/update table structure
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Syncs schema with the database
    console.log("User model synced successfully.");
  } catch (error) {
    console.error("Error syncing User model:", error);
  }
})();

module.exports = User;

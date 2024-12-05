const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');  // Assuming Sequelize is set up in models/index.js
const bookingController = require('./controllers/bookingController');
const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // To parse incoming JSON data

// Routes
app.use('/api/users', userRoutes);  // User-related routes (e.g., registration, login)
app.use('/api/trains', trainRoutes);  // Train-related routes (e.g., train info)
app.get('/api/bookings/all', bookingController.GetBookings);  // Get all bookings
app.post('/api/bookings/book-seat', bookingController.BookSeat);  // Book a seat

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Sync database models with Sequelize and start server
sequelize.sync({ force: false })  // { force: false } will avoid dropping tables on every server restart
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

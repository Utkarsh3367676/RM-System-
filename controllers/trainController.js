const Train = require('../models/trainModel');

// Admin: Add a new train
exports.addTrain = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  const { trainNumber, name, totalSeats, route } = req.body;

  try {
    const newTrain = new Train({ trainNumber, name, totalSeats, availableSeats: totalSeats, route });
    await newTrain.save();
    res.status(201).send('Train added successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const Train = require('../models/Train');

// Fetch all available trains for a given source and destination
exports.getTrainAvailability = async (req, res) => {
    try {
        const { source, destination } = req.query; // Assuming source & destination are passed in query
        const trains = await Train.find({ source, destination });
        res.json({ trains });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching train availability' });
    }
};

// Fetch details of a specific train
exports.getTrainDetails = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) return res.status(404).json({ error: 'Train not found' });
        res.json({ train });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching train details' });
    }
};


// User: Check availability between stations
exports.checkAvailability = async (req, res) => {
  const { trainNumber, fromStation, toStation } = req.body;

  try {
    const train = await Train.findOne({ trainNumber });
    if (!train) return res.status(404).send('Train not found');

    // Check if both stations exist in the route
    const fromIndex = train.route.findIndex((station) => station.station === fromStation);
    const toIndex = train.route.findIndex((station) => station.station === toStation);

    if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
      return res.status(400).send('Invalid station range');
    }

    res.status(200).json({ availableSeats: train.availableSeats });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

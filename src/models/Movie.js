const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  Released: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  Director: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Movies', movieSchema);

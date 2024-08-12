const mongoose = require('mongoose');

const userRatingSchema = new mongoose.Schema({
  rating_text: {
    type: String,
    // required: true,
  },
  rating_color: {
    type: String,
    // required: true,
  },
  votes: {
    type: String,
    // required: true,
  },
  aggregate_rating: {
    type: String,
    // required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserRating', userRatingSchema);

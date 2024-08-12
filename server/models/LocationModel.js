const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country_id: {
    type: Number,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  locality_verbose: {
    type: String,
    required: true,
  },
  city_id: {
    type: Number,
    required: true,
  },
  zipcode: {
    type: String,
    required: false,
  },
  coordinates: {
    type: [Number],  // [longitude, latitude]
    index: '2dsphere'  // Adding geospatial index
  }
}, {
  timestamps: true,
});

locationSchema.pre('save', function(next) {
  this.coordinates = [parseFloat(this.longitude), parseFloat(this.latitude)];
  next();
});

module.exports = mongoose.model('Location', locationSchema);

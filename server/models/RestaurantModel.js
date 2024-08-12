const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  id: {
    type: String,
    // required: true,
    unique: true,
  },
  name: {
    type: String,
    // required: true,
  },
  cuisines: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cuisine"
            }
        ],
  average_cost_for_two: {
    type: Number,
    // required: true,
  },
  price_range: {
    type: Number,
    // required: true,
  },
  currency: {
    type: String,
    // required: true,
  },
  featured_image: {
    type: String,
  },
  menu_url: {
    type: String,
  },
  book_url: {
    type: String,
  },
  is_delivering_now: {
    type: Boolean,
    // required: true,
  },
  has_online_delivery: {
    type: Boolean,
    // required: true,
  },
  switch_to_order_menu: {
    type: Boolean,
    // required: true,
  },
  has_table_booking: {
    type: Boolean,
    // required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    // required: true,
  },
  user_rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserRating',
    // required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);

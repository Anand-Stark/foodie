const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const app = express();
const combineAndUploadData = require('./uploadData.js')
const restaurantRoutes = require('./routes/restaurant.js');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: true }));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
  });

app.use(express.json());


app.use(require('./middlewares/errorHandler.js'));

// combineAndUploadData();
app.use('/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const routes = require("express").Router();
const restaurantControl = require("../controllers/restaurant");
const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// for fetching all the restaurants with pagination support
routes.get("/fetch-restaurant/all", restaurantControl.getAllRestaurants);

// for getting the restaurants with a particular id
routes.get("/fetch-restaurant/:id", restaurantControl.getRestaurantById);

// another route for getting all the restaurants which are within the radius  :
routes.get(
  "/restaurants-within-radius",
  restaurantControl.getRestaurantWithinRadius
);

// route for cuisines :
// routes.get("/cuisines", restaurantControl.getCuisine);


// route for uploading the image :
routes.post(
  "/upload",
  upload.single("image"),
  restaurantControl.uploadImage,
  restaurantControl.getCuisine
);

// route for filtering the country data : 
routes.get('/country',restaurantControl.getCountry);

// route for getting cuisines : 
routes.get('/cuisines',restaurantControl.getAllCuisine);
routes.get('/getbyfilter',restaurantControl.getRestaurantWithFilters);


module.exports = routes;

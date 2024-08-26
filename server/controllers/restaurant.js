const express = require("express");
const Restaurant = require("../models/RestaurantModel");
const Location = require("../models/LocationModel");
const mime = require('mime-types'); 
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const Cuisine = require("../models/cuisines");
const Country = require("../models/CountryModel");
const { log } = require("console");


const API_KEY = 'AIzaSyBKdg6RP935PRwJVla4G2gEcoRALOY1H3c';
const fileManager = new GoogleAIFileManager(API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);


exports.getRestaurantById = async (req, res) => {
  try {
    const resturantId = req.params.id;

    console.log(resturantId);

    const restaurant = await Restaurant.findOne({ id: resturantId })
      .populate("cuisines")
      .populate("location")
      .populate("user_rating");
      

    if (!restaurant) {
      res.status(400).json({ msg: "Restaurant Not Found" });
    }

    return res
      .status(200)
      .json({ data: restaurant, message: "Restaurant Found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 restaurants per page

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const count = await Restaurant.countDocuments();

    const restaurants = await Restaurant.find({})
      .populate("location")
      .populate("user_rating")
      .populate("cuisines")
      .limit(limit)
      .skip(startIndex);

    // Pagination Result Object
    const paginationResult = {};

    if (endIndex < count) {
      paginationResult.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      paginationResult.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    paginationResult.current = {
      page: page,
      limit: limit,
    };

    return res.json({
      pagination: paginationResult,
      totalRestaurants: count,
      restaurants: restaurants,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getRestaurantWithinRadius = async (req, res) => {
  try {
    const { longitude, latitude } = req.query;

    console.log(longitude, latitude);

    // Find all locations within 3km radius
    const nearbyLocations = await Location.find({
      coordinates: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(longitude), parseFloat(latitude)],
            3 / 6378.1,
          ], // 3 km radius
        },
      },
    });

    console.log(nearbyLocations);

    if (nearbyLocations.length === 0) {
      return res.json({ message: "No restaurants found within 3km radius" });
    }

    const locationIds = nearbyLocations.map((location) => location._id);

    const restaurants = await Restaurant.find({
      location: { $in: locationIds },
    })
      .populate("location")
      .populate("user_rating");

    return res.json({
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



// now, this is the function for the file upload : 

// the machine learing function for cuisine prediction :

async function analyzeFoodImage(file, prompt) {
  try {
      const mimeType = file.mimetype || 'image/jpeg'; 

      const uploadResponse = await fileManager.uploadFile(file.path, {
          mimeType: mimeType,
          displayName: file.originalname,
      });

      console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);

      const getResponse = await fileManager.getFile(uploadResponse.file.name);
      console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);

      const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
      });

      const result = await model.generateContent([
          {
              fileData: {
                  mimeType: uploadResponse.file.mimeType,
                  fileUri: uploadResponse.file.uri
              }
          },
          { text: prompt },
      ]);

      return result.response.text();

  } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to analyze the food image');
  }
}


exports.getCuisine = async (req, res) => {
  try {
    const cuisineName = req.name ? req.name.replace(/\s+/g, '') : '';
    
    const cuisines = await Cuisine.find({ 
      cuisineName: cuisineName
    });

    if (cuisines.length === 0) {
        return res.status(404).json({ message: 'Cuisine not found' });
    }
    
    // Extracting the IDs from the cuisines array
    const cuisineIds = cuisines.map(cuisine => cuisine._id);

    const restaurants = await Restaurant.find({ cuisines: { $in: cuisineIds } })
      .populate("location")
      .populate("cuisines")
      .populate("user_rating"); // Assuming you meant to use "user_rating"

    // console.log(restaurants);
    
   return res.status(200).json({restaurants: restaurants, "cuisine": cuisineName});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching restaurants' });
  }
}



exports.uploadImage = async (req, res,next) => {

  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  // writing the promt for the image :

  const prompt = `
  Given an image of a food item, predict the cuisine it belongs to from the following list. Just provide the name of the cuisine.Just provide a cuisine name from the following list.Dont include any extra characters in your response:

  - Continental
  - American
  - Asian
  - North Indian
  - Thai
  - European
  - Mexican
  - Chinese
  - Cafe
  - Italian
  - Finger Food
  - Modern Indian
  - Mughlai
  - Mediterranean
  - Fast Food
  - South Indian
  - Middle Eastern
  - Bengali
  - Tex-Mex
  - Biryani
  - Desserts
  - Seafood
  - Street Food
  - Tea
  - Bakery
  - Burger
  - Pizza
  - Healthy Food
  - Salad
  - Beverages
  - Japanese
  - British
  - Spanish
  - Greek
  - Charcoal Grill
  - Indonesian
  - North Eastern
  - Burmese
  - German
  - Andhra
  - Chettinad
  - Goan
  - Hyderabadi
  - Awadhi
  - Arabian
  `;

  try {
    const analysisResult = await analyzeFoodImage(req.file, prompt);
    req.name = analysisResult;

    console.log(analysisResult);
    

    next()

} catch (error) {
    res.status(500).send({ message: "Failed to analyze image", error: error.message });
}

};

// getting al the countries :

exports.getCountry = async (req, res) => {
   try {

    const Countries = await Country.find();

    return res.status(200).json({countries: Countries});
    
   } catch (error) {
    res.status(500).send({ message: "Error in fetching the countries", error: error.message });
   }
}

exports.getAllCuisine = async (req, res) => {
  try {

    const Cuisines = await Cuisine.find();

    return res.status(200).json({cuisines: Cuisines});
    
   } catch (error) {
    res.status(500).send({ message: "Error in fetching the countries", error: error.message });
   }
}

const mongoose = require('mongoose');

exports.getRestaurantWithFilters = async (req, res) => {
  try {
      const { countryId, cuisineId, averageCostForTwo, name } = req.query;

      // Construct the query object dynamically based on the provided filters
      let query = {};

      if (countryId) {


          // Find locations with the provided countryId
          const locations = await Location.find({ country_id: countryId });

          // Extract the location IDs from the results
          const formattedLocations = locations.map((loc) => loc._id);

          // Update the query to filter restaurants by any of the location IDs
          if (formattedLocations.length > 0) {
              query["location"] = { $in: formattedLocations };
          }
      }

      if (cuisineId) {
          query["cuisines"] = { $in: [cuisineId] };
      }

      if (averageCostForTwo) {
          query["average_cost_for_two"] = { $lte: Number(averageCostForTwo) };
      }

      if (name) {
          query["name"] = name;
      }

      
      // Find restaurants based on the constructed query
      const restaurants = await Restaurant.find(query)
      .populate("location")
      .populate("cuisines")
      .populate("user_rating");


          // console.log(restaurants);
          

      res.status(200).json(restaurants);
  } catch (err) {
      console.error(err);
      res.status(500).json({
          message: "An error occurred while fetching restaurants",
  });
}
};

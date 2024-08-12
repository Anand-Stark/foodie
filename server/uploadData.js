const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Restaurant = require("./models/RestaurantModel");
const Location = require("./models/LocationModel");
const UserRating = require("./models/UserRatingModel");
const isCountry = require("./models/CountryModel");
const Cuisine = require("./models/cuisines");

const dataFolderPath = path.join(__dirname, "util", "data");

async function combineAndUploadData() {
  try {
    const jsonFiles = [ "file5.json","file4.json","file3.json","file2.json","file1.json"];
    
    for (const file of jsonFiles) {
      const filePath = path.join(dataFolderPath, file);
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const parsedData = JSON.parse(jsonData);

      // console.log(parsedData);
      

      for (const data of parsedData) {
        if (data.restaurants && Array.isArray(data.restaurants)) {
          for (const restaurantData of data.restaurants) {
            // Check if the restaurant already exists by id
            const existingRestaurant = await Restaurant.findOne({ id: restaurantData.restaurant.id });

            if (!existingRestaurant) {
              const location = new Location(restaurantData.restaurant.location);
              const savedLocation = await location.save();

              const userRating = new UserRating(restaurantData.restaurant.user_rating);
              const savedUserRating = await userRating.save();

              const cuisinesArray = restaurantData.restaurant.cuisines
                                .split(",")
                                .map((cuisine) => cuisine.trim());
                            let cuisineIds = [];
    
                            for (const cuisine of cuisinesArray) {
                                try {
                                    const result = await Cuisine.findOneAndUpdate(
                                        { cuisineName: cuisine }, // Query condition
                                        { $setOnInsert: { cuisineName: cuisine } }, // Update or insert
                                        { upsert: true, new: true } // Upsert option and return the new document
                                    );
                                    cuisineIds.push(result._id);
                                } catch (err) {
                                    console.error(
                                        `Error processing cuisine "${cuisine}":`,
                                        err
                                    );
                                }
                            }



              const restaurant = new Restaurant({
                id: restaurantData.restaurant.id,
                name: restaurantData.restaurant.name,
                cuisines: cuisineIds,
                average_cost_for_two: restaurantData.restaurant.average_cost_for_two,
                price_range: restaurantData.restaurant.price_range,
                currency: restaurantData.restaurant.currency,
                featured_image: restaurantData.restaurant.featured_image,
                menu_url: restaurantData.restaurant.menu_url,
                book_url: restaurantData.restaurant.book_url,
                is_delivering_now: restaurantData.restaurant.is_delivering_now,
                has_online_delivery: restaurantData.restaurant.has_online_delivery,
                switch_to_order_menu: restaurantData.restaurant.switch_to_order_menu,
                has_table_booking: restaurantData.restaurant.has_table_booking,
                location: savedLocation._id,
                user_rating: savedUserRating._id,
              });

              await restaurant.save();
              console.log(`Restaurant data for ${restaurant.name} successfully uploaded to MongoDB`);
            } else {
              console.log(`Restaurant with id ${restaurantData.restaurant.id} already exists. Skipping insertion.`);
            }
          }
        }
      }
    }

    const filepath = path.join(dataFolderPath, 'country.json');
    const jsonData = fs.readFileSync(filepath, "utf-8");
    const parsingData = JSON.parse(jsonData);

    for (const country of parsingData) {
      const Country = new isCountry({
        country_code: country.country_code,
        country: country.country_name,
      });

      await Country.save();
    }
  } catch (error) {
    console.error("Error during data upload:", error);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = combineAndUploadData;

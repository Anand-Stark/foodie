import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchRestaurantById } from "../services/restaurantService";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaInfoCircle,
  FaTruck,
  FaCheckCircle,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { IoReload } from "react-icons/io5";

const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [cuisine, setcuisine] = useState("")
  const { id } = useParams();

  useEffect(() => {
    const loadRestaurant = async () => {
      const data = await fetchRestaurantById(id);
      setRestaurant(data.data);
      console.log(data.data)
      setcuisine(data.data.cuisines.map(cuisine => cuisine.cuisineName).join(', '))
    };

    loadRestaurant();
  }, [id]);

  if (!restaurant)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 animate-spin">
        <IoReload />
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="relative flex flex-col bg-white shadow-lg rounded-xl w-full max-w-4xl mx-auto overflow-hidden">
          <div className="relative h-96 bg-gray-300">
            <img
              src={
                restaurant.featured_image ||
                "https://via.placeholder.com/600x400"
              }
              alt={restaurant.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
              {restaurant.name}
            </h1>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center text-lg text-gray-700">
                <FaMapMarkerAlt className="mr-3 text-blue-600" />
                <span>{cuisine}</span>
              </div>
              <div className="flex items-center text-lg text-gray-700">
                <FaMapMarkerAlt className="mr-3 text-blue-600" />
                <strong className="text-gray-800">Address : </strong>
                <p className='p-0.5'>

                {restaurant.location.address}
                </p>
              </div>
              <div className="flex items-center text-lg text-gray-700">
                <FaDollarSign className="mr-3 text-green-600" />
                <strong className="text-gray-800">
                  Average Cost for Two :{" "}
                </strong>{" "}
                <p className='p-0.5'>

                {restaurant.currency}
                {restaurant.average_cost_for_two}
                </p>
              </div>
              <div className="flex items-center text-lg text-gray-700">
                <FaTruck className="mr-3 text-orange-600" />
                <strong className="text-gray-800">
                  Delivering Now :{" "}
                </strong>{" "}
                <p className='p-0.5'>

                {restaurant.is_delivering_now ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex items-center text-lg text-gray-700">
                <FaCheckCircle className="mr-3 text-blue-600" />
                <strong className="text-gray-800">
                  Online Delivery :{" "}
                </strong>{" "}
                <p className='p-0.5'>

                {restaurant.has_online_delivery ? "Available" : "Not Available"}
                </p>
              </div>
              <div className="flex items-center text-lg text-gray-700">
                <FaStar className="mr-3 text-yellow-500" />
                <strong className="text-gray-800">User Rating : </strong>{" "}
                <p className='p-0.5'>

                {restaurant.user_rating.aggregate_rating || "Not Rated"}
                </p>
              </div>
              <div className="flex items-center text-lg text-gray-700">
                <FaUser className="mr-3 text-yellow-500" />
                <strong className="text-gray-800">User Reviews : </strong>
                <p className="p-0.5">
                  {restaurant.user_rating.rating_text || "Not Rated"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;

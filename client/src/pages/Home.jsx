

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import Pagination from "../components/Pagination";
import { fetchRestaurants } from "../services/restaurantService";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initialize with 1

  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await fetchRestaurants(currentPage, 9); // Fetch with the current page and items per page
      
      if (data) {
        setRestaurants(data.restaurants);
        
        console.log(data);
        
        setTotalPages(Math.ceil(data.totalRestaurants / 10)); // Update total pages based on the total count
      }
    };

    loadRestaurants();
  }, [currentPage]);

  return (
    <div className="flex justify-center flex-col">
      <Navbar />
      <div className="mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants?.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)} // Pass the page change handler
        />
      </div>
    </div>
  );
};

export default Home;

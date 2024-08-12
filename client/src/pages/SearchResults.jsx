import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import { searchRestaurantsByLocation } from '../services/restaurantService';

const SearchResults = () => {
    const [restaurants, setRestaurants] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const latitude = searchParams.get('latitude');
        const longitude = searchParams.get('longitude');

        const fetchResults = async () => {
            if (latitude && longitude) {
                const data = await searchRestaurantsByLocation(latitude, longitude);

                setRestaurants(data.restaurants);
            }
        };

        fetchResults();
    }, [location.search]);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Search Results : {Location} </h1>
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
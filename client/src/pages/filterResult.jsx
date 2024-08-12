import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import axios from 'axios';
import { API_URL } from '../services/restaurantService';

const FilterResult = () => {
    const [restaurants, setRestaurants] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const countryId = searchParams.get('countryId');
        const cuisineId = searchParams.get('cuisineId');
        const averageCostForTwo = searchParams.get('averageCostForTwo');
        const name = searchParams.get('name');

        const fetchResults = async () => {
            if (countryId || cuisineId || averageCostForTwo || name) {
                const { data } = await axios.get(`${API_URL}/getbyfilter?countryId=${countryId}&cuisineId=${cuisineId}&averageCostForTwo=${averageCostForTwo}&name=${name}`);
                setRestaurants(data);
            }
        };

        fetchResults();
    }, [location.search]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen">
                <div className="w-full max-w-6xl p-6 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-8 text-center">Search Results</h1>
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full justify-evenly">
                        {restaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterResult;

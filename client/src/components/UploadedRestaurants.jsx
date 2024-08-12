import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';

const UploadedRestaurants = () => {
    const restaurants = useSelector((state) => state.image.uploadedRestaurants);
    const cuisine = useSelector((state) => state.image.uploadedDish);

    useEffect(() => {
        if (!restaurants) {
            console.log('Error in Displaying Restaurants from Image Search');
        }
    }, [restaurants]);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-8 text-center">Restaurants {`${cuisine.length>0?'with '+ cuisine +"Food":'Not Available'}`}</h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {restaurants.length > 0 ? (
                        restaurants.map((restaurant) => (
                            <div className="flex-shrink-0" key={restaurant.id}>
                                <RestaurantCard restaurant={restaurant} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg font-semibold"></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadedRestaurants;

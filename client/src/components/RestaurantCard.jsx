import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    // console.log(restaurant.id);

    navigate(`/restaurant/${restaurant.id}`);
  };

  const cuisinesString = restaurant.cuisines.map(cuisine => cuisine.cuisineName).join(', ');
  
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={restaurant.featured_image || "https://via.placeholder.com/150"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-row">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {restaurant.name}
            {" ,"}
          </h5>
          <h2 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {restaurant.location.city}
          </h2>
        </div>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {cuisinesString}
        </p>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {`Average Cost for Two: ${restaurant.currency}${restaurant.average_cost_for_two}`}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          onClick={handleReadMore}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;

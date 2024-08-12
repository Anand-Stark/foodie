import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ onClose }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (latitude && longitude) {
            navigate(`/search-results?latitude=${latitude}&longitude=${longitude}`);
            onClose(); // Close the modal after search
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-10 ">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Search Restaurants by Location</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Latitude</label>
                    <input
                        type="number"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter latitude"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Longitude</label>
                    <input
                        type="number"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter longitude"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg">Cancel</button>
                    <button onClick={handleSearch} className="px-4 py-2 bg-red-500 text-white rounded-lg">Search</button>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;

import React, { useState } from 'react';
import { MdAddLocation, MdCameraAlt, MdSearch, MdFilterList } from 'react-icons/md';
import ImageUploadModal from './ImageUploadModal';
import SearchModal from './SearchModal';
import Filter from './Filter';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [name, setName] = useState("");

    const handleSearch = () => {
        navigate(`/filter-result?countryId=${""}&cuisineId=${""}&averageCostForTwo=${""}&name=${name}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <nav className="bg-red-600 shadow-md py-4 px-6 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-white">
                Zomato
            </a>
            <div className="flex flex-row items-center space-x-4">
                <div className="relative">
                    <input
                        onKeyDown={handleKeyDown}
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-lg py-2 px-4 pr-10"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <MdSearch
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        size={24}
                    />
                </div>
                <div
                    onClick={() => setShowLocationModal(true)}
                    className="text-white hover:text-gray-200 flex items-center space-x-1 cursor-pointer"
                >
                    <MdAddLocation />
                    <span>Search by Location</span>
                </div>
                <div
                    onClick={() => setShowImageModal(true)}
                    className="text-white hover:text-gray-200 flex items-center space-x-1 cursor-pointer"
                >
                    <MdCameraAlt />
                    <span>Search by Image</span>
                </div>
                <div
                   
                    className="text-white hover:text-gray-900 flex items-center cursor-pointer justify-center"
                >
                    <MdFilterList />
                    <Filter  />
                </div>
            </div>
            {showLocationModal && (
                <SearchModal onClose={() => setShowLocationModal(false)} />
            )}
            {showImageModal && (
                <ImageUploadModal onClose={() => setShowImageModal(false)} />
            )}
        </nav>
    );
};

export default Navbar;


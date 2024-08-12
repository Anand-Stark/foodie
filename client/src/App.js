import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UploadedRestaurants from './components/UploadedRestaurants';
import FilterResult from './pages/filterResult';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import SearchResults from './pages/SearchResults';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/uploaded-restaurants" element={<UploadedRestaurants />} />
                <Route path="/filter-result" element={<FilterResult />} />
            </Routes>
            <Toaster />
        </Router>
    );
};

export default App;

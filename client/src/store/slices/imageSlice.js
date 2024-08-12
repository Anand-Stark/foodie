
import { createSlice } from '@reduxjs/toolkit';
import Loader from '../../components/Loader';

const initialState = {
    uploadedImage: null,
    uploadedDish: "",
    uploadedRestaurants: [],
    loading : false
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setUploadedImage: (state, action) => {
            state.uploadedImage = action.payload;
        },
        setUploadedDish: (state, action) => {
            state.uploadedDish = action.payload;
        },
        setUploadedRestaurants: (state, action) => {
            state.uploadedRestaurants = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUploadedImage, setUploadedRestaurants, setUploadedDish, setLoading } = imageSlice.actions;

export default imageSlice.reducer;
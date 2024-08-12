import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice';

export const store = configureStore({
  reducer: {
    // Add reducers here
    image: imageReducer,
  },
});

export default store;
import axios from 'axios';

export const API_URL = 'https://foodie-box.onrender.com/restaurants';

export const fetchRestaurants = async (page,limit) => {

    try {
        
        const response = await axios.get(`${API_URL}/fetch-restaurant/all?page=${page}&limit=${limit}`);

        return response.data;

    } catch (error) {
        console.log('Error in fetching All the Restaurants',error); 
    }

};

export const fetchRestaurantById = async (id) => {

    try {

        const response = await axios.get(`${API_URL}/fetch-restaurant/${id}`);
        
        return response.data;
    } catch (error) {
        console.log('Error in fetching restaurant by Id',error); 
    }
};

export const searchRestaurantsByLocation = async (latitude, longitude) => {

    try {

        const response = await axios.get(`${API_URL}/restaurants-within-radius?latitude=${latitude}&longitude=${longitude}`);  

        return response.data;
        
    } catch (error) {
        console.log('Error in fetching restaurant by radius',error); 
    }

};

export const uploadImageToServer = async (formData) => {
     try {

       const response =  await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert('Image uploaded successfully!');
        
        return response
        
     } catch (error) {
        console.log('Error in uploading image to server',error);      
     }
}
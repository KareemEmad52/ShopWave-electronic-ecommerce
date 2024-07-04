import axios from "axios";


// Base URL for your API
const BASE_URL = 'https://ecom-zgup.onrender.com';

// Function to handle signup
export const AddNewUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/user/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Handle Login Users
export const LoginUser = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/user/login`, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};
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


// Get All Product Function
export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/product`,{ params: {
      page: 1
    }});
    return response;
  } catch (error) {
    throw error;
  }
};


// Add Product 
export const addProduct = async (productData ,token) => {

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/product`, productData, {
      headers: {
        'token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Get All Categories 
export const getCategories = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/categories`);
    return response.data;
  } catch (error) {
    console.error('Error getting all categories:', error);
    throw error;
  }
};


// Get All Brands 
export const getBrands = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/brands`);
    return response.data;
  } catch (error) {
    console.error('Error getting all categories:', error);
    throw error;
  }
};



// Delete Product 
export const deleteProduct = async (id ,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/product/${id}`, {
      headers: {
        'token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


// Add Category 
export const addCategory = async (CategoryData ,token) => {

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/categories`, CategoryData, {
      headers: {
        'token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding Category:', error);
    throw error;
  }
};

// Delete Category 
export const deleteCategory = async (id ,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/categories/${id}`, {
      headers: {
        'token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting Category:', error);
    throw error;
  }
};


// Add Brand 
export const addBrand = async (BrandData ,token) => {

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/brands`, BrandData, {
      headers: {
        'token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding Brands:', error);
    throw error;
  }
};

// Delete Brand 
export const deleteBrand = async (id ,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/brands/${id}`, {
      headers: {
        'token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting Brand:', error);
    throw error;
  }
};
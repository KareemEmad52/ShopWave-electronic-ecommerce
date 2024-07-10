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
export const getAllProduct = async ({ page = 1, keyword = '' }) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/product`, {
      params: {
        page: page,
        keyword: keyword,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Add Product 
export const addProduct = async (productData, token) => {

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
export const getCategories = async ({ page = 1, keyword = '' }) => {

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/categories`,{
      params: {
        page: page,
        keyword: keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting all categories:', error);
    throw error;
  }
};


// Get All Brands 
export const getBrands = async ({ page = 1, keyword = '' }) => {

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/brands`,{
      params: {
        page: page,
        keyword: keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting all categories:', error);
    throw error;
  }
};



// Delete Product 
export const deleteProduct = async (id, token) => {
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
export const addCategory = async (CategoryData, token) => {

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
export const deleteCategory = async (id, token) => {
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
export const addBrand = async (BrandData, token) => {

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
export const deleteBrand = async (id, token) => {
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


// Get Product By ID 
export const getSingleProductByID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};


// Add To Cart
export const AddToCart = async (productID, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/cart/add`, { product_id: productID }, {
      headers: {
        'token': `${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
import axios from "axios";


// Base URL for your API
const BASE_URL = 'https://ecom-zgup.onrender.com';



// Get User Function
export const getUserDetails = async (token) => {
  try {
    let res = await axios.get(`${BASE_URL}/api/v1/user`, {
      headers: {
        'token': `${token}`
      }
    })
    return res.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

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

// Get All Product Function Without pagenation
export const getAllProductWithoutPagenation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/product/all`);
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
    const response = await axios.get(`${BASE_URL}/api/v1/categories`, {
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
    const response = await axios.get(`${BASE_URL}/api/v1/brands`, {
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

// Get Category By ID 
export const getSingleCategoryByID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/categories/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get Single Brand By ID
export const getSingleBrandByID = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/brands/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};


// Get User's Cart
export const getUserCart = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/cart`, {
      headers: {
        'token': `${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error getting cart', error);
    throw error;
  }
};

// Delete Product From Cart
export const removeProductFromCart = async (productID, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/cart/remove`, { product_id: productID }, {
      headers: {
        'token': `${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error getting cart', error);
    throw error;
  }
};

// Delete all the Product  From Cart
export const deleteProductFromCart = async (productID, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/cart/remove`,
      {
        headers: {
          'token': `${token}`
        },
        data: { product_id: productID } // Send product_id in the data property
      }
    );
    return response;
  } catch (error) {
    console.error('Error removing product from cart', error);
    throw error;
  }
};


// Make Online Order
export const onlineOrder = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/order/online`, { data }, {
      headers: {
        'token': `${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error getting cart', error);
    throw error;
  }
};


// Get All Orders 
export const getUserOrder = async (token) => {
  try {
    let res = await axios.get(`${BASE_URL}/api/v1/order`, {
      headers: {
        'token': token
      },
    })
    return res
  } catch (error) {
    console.error('Error getting cart', error);
    throw error;
  }
}


// Get User wishlist 
export const getUserWishlist = async (token) => {
  try {
    let res = await axios.get(`${BASE_URL}/api/v1/user/wishlist`, {
      headers: {
        'token': token
      }
    })
    return res
  } catch (error) {
    console.error('Error getting wishlist', error);
    throw error;
  }
}


// Update The WishList 
export const updateUserWishlist = async ({ token, productID }) => {
  try {
    let res = await axios.put(
      `${BASE_URL}/api/v1/user/wishlist`,
      { product_id: productID },
      {
        headers: {
          'token': token
        }
      }
    );
    return res;
  } catch (error) {
    console.error('Error updating wishlist', error);
    throw error;
  }
};



//update user
export const updateUser = async ({ id, formData }) => {
  try {
    let res = axios.put(`${BASE_URL}/api/v1/user/${id}`, formData)
    return res
  } catch (error) {
    console.error('Error updating user', error);
    throw error;
  }
}
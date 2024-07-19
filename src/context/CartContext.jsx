import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the token
import { getUserCart } from '../utils/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Function to decode token and get the productCartCount
  const getProductCartCountFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.productCartCount || 0;
    } catch (error) {
      console.error("Invalid token");
      return 0;
    }
  };

  const savedToken = localStorage.getItem('token');
  const initialCartCount = savedToken ? getProductCartCountFromToken(savedToken) : 0;
  const [cartItems, setCartItems] = useState(initialCartCount);

  const getCartDetails = async (token) => {
    try {
      const res = await getUserCart(token);
      const productsLength = res?.data?.cart[0]?.products?.length || 0;
      setCartItems(productsLength);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (savedToken) {
      getCartDetails(savedToken);
    }
  }, [savedToken]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, getCartDetails }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

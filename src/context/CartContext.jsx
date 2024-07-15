import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserCart } from '../utils/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  let [cartItems, setCartItems] = useState(0);
  
  const getCartDetails = async (token) => {
    try {
      setCartItems(0)
      let res = await getUserCart(token);
      setCartItems(res?.data?.cart[0].products.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      getCartDetails(savedToken);
    }
  }, []);


  return (
    <CartContext.Provider value={{ cartItems ,setCartItems ,getCartDetails}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

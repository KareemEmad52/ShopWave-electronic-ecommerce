import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AddToCart, getAllProduct } from '../../utils/api';

import {
  Button,
} from "@material-tailwind/react";
import { Puff } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

function FeaturedProducts() {

  const nav = useNavigate()
  let [loadingProductId, setLoadingProductId] = useState(null)
  let { token } = useUser()

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: getAllProduct,
  });

  const navigateToProduct = (id) => {
    nav(`/productdetails/${id}`)
  }

  const handleAddProductToCart = async (id) => {
    setLoadingProductId(id);
    try {
      await AddToCart(id, token);
      setLoadingProductId(null);
      toast.success("Product added successfully");
    } catch (error) {
      console.error(error);
      setLoadingProductId(null);
      toast.error("An error occurred while adding the product to the cart");
    }
  }


  if (isError) {
    toast.error("An error occur please refresh the page !")
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto font-poppins">
      <span className='block text-alternative-500 font-poppins text-[9px] md:text-[12px] font-medium mt-5 mb-2 ps-3'>Products</span>
      <h2 className='font-poppins  font-semibold mb-1 ps-3 text-[22px] md:text-[27px]'>Featured Products : </h2>

      {isLoading ? <div className='h-[20vh] w-100 flex justify-center items-center'>
        <Puff
          height="60"
          width="60"
          radius={1.5}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div> : <div className="gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
        {data?.data?.document.map((product) => (
          <div key={product._id} className=" shadow-lg rounded-lg overflow-hidden mt-3 sm:mt-0">
            <figure className="relative cursor-pointer" onClick={() => navigateToProduct(product._id)}>
              <div className='overflow-hidden'>
                <img
                  className='w-100 hover:scale-110 transtionAll'
                  src={product.imgCover.path}
                  alt={product.name}
                />
              </div>
            </figure>
            <div className="p-4">
              <div className='flex justify-between items-center cursor-pointer' onClick={() => navigateToProduct(product._id)}>
                <h2 className="text-sm max-w-[70%] h-[20px]  font-poppins font-semibold overflow-hidden text-[#263238]">{product.title.split(" ").slice(0, 5).join(' ')}</h2>
                <p className="text-[#263238] text-sm font-poppins font-medium">${product.priceAfterDiscount}</p>
              </div>
              <div className='h-[50px] overflow-hidden cursor-pointer' onClick={() => navigateToProduct(product._id)}>
                <span className='text-[#263238] text-xs opacity-75'>{product.description.split(" ").slice(0, 20).join(' ')}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
              {loadingProductId === product._id ? (
                    <Button
                      loading={true}
                      ripple={false}
                      fullWidth={true}
                      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex justify-center items-center"
                    >
                      Loading
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddProductToCart(product._id)}
                      ripple={false}
                      fullWidth={true}
                      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                      Add to Cart
                    </Button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}

export default FeaturedProducts;

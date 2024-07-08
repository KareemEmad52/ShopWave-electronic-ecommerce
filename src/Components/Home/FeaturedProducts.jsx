import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProduct } from '../../utils/api';

import {
  Button,
} from "@material-tailwind/react";

function FeaturedProducts() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: getAllProduct,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto font-poppins">
      <span className='block text-alternative-500 font-poppins text-[9px] md:text-[12px] font-medium mt-5 mb-2 ps-3'>Products</span>
      <h2 className='font-poppins text-sm font-semibold mb-1 ps-3 text-[16px] md:text-[27px]'>Featured Products : </h2>

      <div className="gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
        {data?.data?.document.map((product) => (
          <div key={product._id} className=" shadow-lg rounded-lg overflow-hidden mt-3 sm:mt-0">
            <figure className="relative">
              <div className='overflow-hidden'>
                <img
                  className='w-100 hover:scale-110 transtionAll'
                  src={product.imgCover.path}
                  alt={product.name}
                />
              </div>
            </figure>
            <div className="p-4">
              <div className='flex justify-between items-center'>
                <h2 className="text-sm max-w-[70%] h-[20px]  font-poppins font-semibold overflow-hidden text-[#263238]">{product.title.split(" ").slice(0, 5).join(' ')}</h2>
                <p className="text-[#263238] text-sm font-poppins font-medium">${product.priceAfterDiscount}</p>
              </div>
              <div className='h-[50px] overflow-hidden'>
              <span className='text-[#263238] text-xs opacity-75'>{product.description.split(" ").slice(0, 20).join(' ')}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Add to Cart
                </Button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;

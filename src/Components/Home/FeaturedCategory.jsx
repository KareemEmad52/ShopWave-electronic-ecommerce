import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCategories } from '../../utils/api'; // Assuming this function fetches categories

const Categories = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1700,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 3,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ],
    arrows: false
  };

  return (
    <>
    <span className='block text-alternative-500 font-poppins text-[9px] md:text-[12px] font-medium mt-5 mb-2 ps-3'>Category</span>
    <h2 className='font-poppins text-sm font-semibold mb-1 ps-3 text-[16px] md:text-[27px]'>Featured Category : </h2>
      <div className="slider-container ">
        <Slider {...settings} className="h-full">
          {data?.document?.map((category) => (
            <div key={category._id} className=" rounded overflow-hidden p-2 md:p-3">
              <div className='p-2 cursor-pointer  border border-transparent hover:border-1 hover:border-main-500 transtionAll rounded-lg'>
                <img className="w-full h-full object-cover" src={category.image.path} alt={category.name} />
                <div className="pt-4">
                  <div className="font-bold text-[7px] sm:text-[10px] md:text-sm mb-2">{category.name}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      </>
  );
};

export default Categories;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleProductByID } from '../../utils/api';
import Slider from "react-slick";
import { Button } from '@material-tailwind/react';
import { Puff } from 'react-loader-spinner';


function ProductDetails() {
  let { id } = useParams()
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => getSingleProductByID(id),
  });

  console.log(data);


  return (<>
    {isLoading ? <div className='h-[40vh] w-100 flex justify-center items-center'>
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
    </div> : <div className="custom-container">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-0 mt-10 mb-5 lg:mb-12 ">
        <div className="col-span-1 md:col-span-2 p-8 sm:py-1 sm:px-2">
          <Slider {...settings}>
            {data?.data?.document.images.map((imgSrc) => (
              <img key={data?.data?.document._id} src={imgSrc.image_id.path} alt="" />
            ))}
          </Slider>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-3  flex flex-col ps-5 justify-center">

          <h4 className='max-w-[550px] mt-3 md:mt-0 md:max-w-[550px] font-poppins text-sm md:text-lg font-medium'>{data?.data?.document.title.split(',').slice(0, 5).join(' ')}</h4>
          <p className='text-[#263238] text-[12px] pe-3 md:px-0 md:text-md opacity-75 md:max-w-[750px] mt-2 mb-3'><span className='text-black opacity-100'>Descripton:</span> {data?.data?.document.description}</p>

          <div className='mt-4 mb-2 w-full flex justify-between items-center'>
            <div>
              <p>Category : <span className=' text-[#263238] opacity-85'> {data?.data?.document.category.name}</span> </p>
              <p>Brand : <span className=' text-[#263238] opacity-85'> {data?.data?.document.brand.name}</span> </p>
            </div>
            <p className='pe-10 text-xl text-alternative-500'> ${data?.data?.document.price}</p>
          </div>

          <div className='pe-8 mt-2 mb-4'>
            <Button className='bg-main-500' size='md' fullWidth>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>}
  </>

  );
}

export default ProductDetails;

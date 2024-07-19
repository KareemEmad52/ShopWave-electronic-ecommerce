import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AddToCart, getSingleProductByID } from '../../utils/api';
import Slider from "react-slick";
import { Button, Spinner } from '@material-tailwind/react';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';


function ProductDetails() {

  let { token } = useUser()
  let { id } = useParams()
  let [isLoadingCart,setIsLoadingCart] = useState()
  const {setCartItems} = useCart()
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

  const handleAddProductToCart = async (id) => {
    setIsLoadingCart(true)
    try {
      let res = await AddToCart(id, token)
      setCartItems(res?.data?.cart.products.length)
      setIsLoadingCart(false)
      toast.success("Product Add Successfully")
    } catch (error) {
      if(error.response.data.message === "Forbidden"){
        toast.error("Please Login First !")
      } else {
        toast.error("An error occurred while adding the product to the cart");
      }
      setIsLoadingCart(false)
    }
  }

  


  return (<>
    {isLoading ? <div className='h-[40vh] w-100 flex justify-center items-center'>
      <Spinner color="green" className="h-10 w-10" />
    </div> : <div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-0 md:gap-0 mt-10 mb-5 lg:mb-12 ">
        <div className="col-span-1 md:col-span-2 p-8 sm:py-1 sm:px-2 ">
          <Slider {...settings}>
            {data?.data?.document.images.map((imgSrc) => (
              <img key={data?.data?.document._id} src={imgSrc.image_id.path} alt="" />
            ))}
          </Slider>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-3  flex flex-col md:ps-10 justify-center">

          <h4 className='max-w-[550px] mt-3 md:mt-0 md:max-w-[750px] font-poppins text-sm md:text-lg font-semibold'>{data?.data?.document.title.split(',').slice(0, 5).join(' ')}</h4>
          <p className='text-[#263238] text-[12px] md:pe-3 md:px-0 md:text-md opacity-75 md:max-w-[750px] mt-2 mb-3'><span className='text-black opacity-100'>Descripton:</span> {data?.data?.document.description}</p>

          <div className='mt-4 mb-2 w-full flex justify-between items-center'>
            <div>
              <p>Category : <span className=' text-alternative-400 opacity-100'> {data?.data?.document.category.name}</span> </p>
              <p>Brand : <span className=' text-alternative-400 opacity-100'> {data?.data?.document.brand.name}</span> </p>
            </div>
            <p className='pe-2 md:pe-10 text-xl text-alternative-500'> ${data?.data?.document.price}</p>
          </div>

          <div className='md:pe-8 mt-2 mb-4'>
            {isLoadingCart ? <Button loading={true} className='bg-main-500 flex justify-center items-center' size='md' fullWidth>Loading</Button> : <Button onClick={() => handleAddProductToCart(data?.data?.document._id)} className='bg-main-500' size='md' fullWidth>Add to cart</Button>}
          </div>
        </div>
      </div>
    </div>}
  </>

  );
}

export default ProductDetails;

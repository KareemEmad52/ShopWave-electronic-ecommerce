import { Input, Spinner } from '@material-tailwind/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { AddToCart, getAllProduct } from '../../utils/api';
import _ from 'lodash';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

function Products() {
  const nav = useNavigate();
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [products, setProducts] = useState({ document: [], totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useUser();
  const {setCartItems} = useCart()

  const handleGetProductDetails = async (page = 1, keyword = '') => {
    setIsLoading(true);
    try {
      const res = await getAllProduct({ page, keyword });
      setProducts(res.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error('Failed to fetch products');
    }
  };

  const navigateToProduct = (id) => {
    nav(`/productdetails/${id}`);
  };

  const handleAddProductToCart = async (id) => {
    setLoadingProductId(id);
    try {
      let res = await AddToCart(id, token);
      setCartItems(res?.data?.cart.products.length)
      setLoadingProductId(null);
      toast.success("Product added successfully");
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Forbidden") {
        toast.error("Please Login First !")
      } else {
        toast.error("An error occurred while adding the product to the cart");
      }
      setLoadingProductId(null);
    }
  }

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1); // Reset to the first page on a new search
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const next = () => {
    if (currentPage === products.totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    handleGetProductDetails(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  return (
    <>
      <div className='w-full'>


        <div className='container mx-auto font-poppins'>
          <div>
            <span className='block text-alternative-500 font-poppins text-[9px] md:text-[12px] font-medium mt-5 mb-2 ps-3'>
              Products
            </span>
            <h2 className='font-poppins  font-semibold mb-1 ps-3 text-[22px] md:text-[27px]'>
              Explore All Products :{' '}
            </h2>
          </div>

          <div className='w-full mt-5 md:my-5 flex justify-center items-center '>
            <div className='w-[80%] md:w-[70%]'>
              <Input
                variant='outlined'
                label='Search'
                placeholder="Search by product's name"
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {isLoading ? (
            <div className='h-[20vh] w-100 flex justify-center items-center'>
              <Spinner color="green" className="h-10 w-10" />
            </div>
          ) : (
            <div className='gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '>
              {products.document.map((product) => (
                <div
                  key={product._id}
                  className=' shadow-lg rounded-lg overflow-hidden mt-3 sm:mt-0'
                >
                  <figure
                    className='relative cursor-pointer'
                    onClick={() => navigateToProduct(product._id)}
                  >
                    <div className='overflow-hidden'>
                      <img
                        className='w-100 hover:scale-110 transtionAll'
                        src={product.imgCover.path}
                        alt={product.name}
                      />
                    </div>
                  </figure>
                  <div className='p-4'>
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
            </div>
          )}
        </div>

        <div className='w-100 md:my-8 flex justify-center items-center'>

          <div className='flex items-center gap-8 mt-4'>
            <IconButton
              size='sm'
              variant='outlined'
              onClick={prev}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />
            </IconButton>
            <Typography color='gray' className='font-normal'>
              Page <strong className='text-gray-900'>{currentPage}</strong> of{' '}
              <strong className='text-gray-900'>{products.totalPages}</strong>
            </Typography>
            <IconButton
              size='sm'
              variant='outlined'
              onClick={next}
              disabled={currentPage === products.totalPages}
            >
              <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;

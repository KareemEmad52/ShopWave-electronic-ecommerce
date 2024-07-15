import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { getAllProduct, getSingleBrandByID, AddToCart, getAllProductWithoutPagenation } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spinner } from '@material-tailwind/react';
import { toast } from 'react-toastify';

function BrandsDetails() {
  const nav = useNavigate();
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Brand, setBrand] = useState();
  const { token } = useUser();
  let { id } = useParams();

  const getBrandDetails = async (id) => {
    try {
      const res = await getSingleBrandByID(id);
      setBrand(res.data.document);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductDetails = async () => {
    setIsLoading(true);
    try {
      const res = await getAllProductWithoutPagenation();
      const filteredProducts = res.data.document.filter(product => product.brand._id === id);
      setProducts(filteredProducts);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error('Failed to fetch products');
    }
  };

  const handleAddProductToCart = async (id) => {
    setLoadingProductId(id);
    try {
      await AddToCart(id, token);
      setLoadingProductId(null);
      toast.success("Product added successfully");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message === "Forbidden") {
        toast.error("Please Login First!");
      } else {
        toast.error("An error occurred while adding the product to the cart");
      }
      setLoadingProductId(null);
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      await getBrandDetails(id);
      await handleGetProductDetails();
    };
    fetchData();
  }, [id]);

  const navigateToProduct = (productId) => {
    nav(`/productDetails/${productId}`);
  };

  return (
    <div className='my-5'>
      {Brand ?<h1 className='font-poppins md:text-xl font-semibold '>Brand Name :<span className='text-alternative-400 md:text-lg'> {Brand?.name}</span></h1> :" "}
      {isLoading ? (
        <div className='h-[20vh] w-100 flex justify-center items-center'>
          <Spinner color="green" className="h-10 w-10" />
        </div>
      ) : (
        <div className='gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '>
          {products.length ? products.map((product) => (
            <div
              key={product._id}
              className='shadow-lg rounded-lg overflow-hidden mt-3 sm:mt-0'
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
                  <h2 className="text-sm max-w-[70%] h-[20px] font-poppins font-semibold overflow-hidden text-[#263238]">{product.title.split(" ").slice(0, 5).join(' ')}</h2>
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
          )) : "No products found"}
        </div>
      )}
    </div>
  );
}

export default BrandsDetails;

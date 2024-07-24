import { Button, Spinner } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AddToCart, getUserWishlist, updateUserWishlist } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

const queryClient = new QueryClient();

function Wishlist() {
  const { token } = useUser();
  const queryClient = useQueryClient();
  const { setCartItems } = useCart()
  const [loadingProductId, setLoadingProductId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['wishlist', token],
    queryFn: () => getUserWishlist(token),
    enabled: !!token,
  });

  // Update wishlist mutation
  const mutation = useMutation({
    mutationFn: ({ token, productID }) => updateUserWishlist({ token, productID }),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist', token]);
    },
  });


  // Handle delete wishlist item
  const handleDeleteWishList = (prod_id) => {
    const toastId = toast.loading("Deleting item...");
    mutation.mutate(
      { token, productID: prod_id },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
        },
        onError: () => {
          toast.update(toastId, {
            render: "Error while Deleting item!",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        },
      }
    );
  };


  // Add to cart mutation
  const { mutate: addToCartMutation  } = useMutation({
    mutationFn: ({ token, productID }) => AddToCart(productID, token),
    onSuccess: (data) => {
      setCartItems(data?.data?.cart.products.length)
      setLoadingProductId(null); // Reset the loading state
    },
    onError: ()=>{
      setLoadingProductId(null); // Reset the loading state
    }
  });

  // Handle add to cart
  const handleAddToCart = (prod_id) => {
    setLoadingProductId(prod_id); // Set the loading state for the specific product
    addToCartMutation({ token, productID: prod_id }, {
      onSuccess: () => {
        toast.success('item Added Successfully!')
      },
      onError: () => {
        toast.error('Error while adding item to cart')
      },
    });
  };




  return (
    <section className="pb-24 pt-14 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">WishList</h2>
        {isLoading ? <div className='h-[20vh] w-100 flex justify-center items-center'>
          <Spinner color="green" className="h-10 w-10" />
        </div> : data?.data?.wishlist.length == 0 ? <div className='h-[20vh] w-100 flex justify-center items-center'>
          <h1>Wishlist is empty </h1>
        </div> : data?.data?.wishlist.map((product) => (
          <div key={product._id} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
            <div className="col-span-12 md:col-span-2 img box">
              <img src={product?.imgCover.path} alt="speaker image" className="max-lg:w-full lg:w-[170px] lg:h-[150px]" />
            </div>
            <div className="col-span-12 md:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                  {product.title.split(' ').slice(0, 5).join(' ')}
                </h5>
                <button
                  onClick={() => handleDeleteWishList(product._id)}
                  className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                      cx="17"
                      cy="17"
                      r="17"
                      fill=""
                    />
                    <path
                      className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                      d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                {product.description.split(' ').slice(0, 15).join(' ')}
                <a href="#" className="text-indigo-600">More....</a>
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {loadingProductId === product._id  ? <Button loading={true}>Loading</Button> : <Button onClick={() => handleAddToCart(product._id)}>Add To Cart</Button>}
                </div>
                <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">${product.priceAfterDiscount}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



export default Wishlist;

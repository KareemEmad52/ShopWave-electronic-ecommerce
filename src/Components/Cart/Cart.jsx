import React, { useEffect, useState } from 'react';
import { AddToCart, removeProductFromCart, getUserCart, onlineOrder, deleteProductFromCart } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import { Button, Input, Spinner } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { checkoutValidationSchema } from '../../utils/ValidationSchema';

function Cart() {
  let { token } = useUser();
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paymantLoading, setPaymentLoading] = useState(false)

  const getCartDetails = async () => {
    setIsLoading(true);
    try {
      let res = await getUserCart(token);
      setCart(res?.data?.cart);
      setTotalPrice(res?.data?.cart[0].total_price);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleAddProductToCart = async (id) => {
    const toastId = toast.loading("Adding Product...");
    try {
      await AddToCart(id, token);
      await getCartDetails();
      toast.update(toastId, {
        render: "Product Added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: error.response.data.message || 'Please try Again!',
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      if (error.response.data.message === "Forbidden") {
        toast.error("Please Login First!");
      } else {
        toast.error("An error occurred while adding the product to the cart");
      }
    }
  };

  const HandleDeleteProductFromCart = async (prodID) => {
    const toastId = toast.loading("Deleting Product...");
    try {
      let res = await removeProductFromCart(prodID, token);
      await getCartDetails();
      toast.update(toastId, {
        render: "Product Deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  const HandleRemoveProductFromCart = async (prodID) => {
    const toastId = toast.loading("Deleting Product...");
    try {
      let res = await deleteProductFromCart(prodID, token);
      await getCartDetails();
      toast.update(toastId, {
        render: "Product Deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getCartDetails();
    }
  }, [token]);

  const initialValues = {
    fullName: '',
    address: '',
    phone: '',
  };

  const handleSubmit = async (values) => {
    setPaymentLoading(true)
    try {
      let res = await onlineOrder({
        address: values.address,
        phone: values.phone
      }, token);
      setPaymentLoading(false)
      window.location.href = res?.data?.session?.url
    } catch (error) {
      setPaymentLoading(false)
      console.log(error);
    }
  };



  return (
    <>
      {isLoading ? (
        <div className="h-[40vh] w-100 flex justify-center items-center">
          <Spinner color="green" className="h-10 w-10" />
        </div>
      ) : (
        <div className="font-sans max-w-6xl max-md:max-w-xl mx-auto bg-white py-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="md:col-span-2 space-y-4">
              {cart ? (
                <>
                  {cart[0].products.length == 0 ? <h1 className='font-poppins ps-8'>Cart Is Empty</h1> : cart[0].products.map((prod, index) => (
                    <div className="grid grid-cols-3 items-start gap-4" key={index}>
                      <div className="col-span-2 flex items-start gap-4">
                        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                          <img src={prod.product_id.imgCover.path} className="w-full h-full object-contain" alt={prod.product_id.name} />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-base font-bold text-gray-800">{prod.product_id.title.split(' ').slice(0, 5).join(' ')}</h3>
                          <p className="text-xs font-semibold text-gray-500 mt-0.5">description: {prod.product_id.description.split(' ').slice(0, 5).join(' ')}</p>
                          <button
                            onClick={() => HandleRemoveProductFromCart(prod.product_id._id)}
                            type="button"
                            className="mt-3 md:mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                              <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                            </svg>
                            REMOVE
                          </button>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <h4 className="text-lg max-sm:text-base font-bold text-gray-800">${prod.product_id.priceAfterDiscount}.00</h4>
                        <button
                          type="button"
                          className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          <svg
                            onClick={() => HandleDeleteProductFromCart(prod.product_id._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2.5 fill-current"
                            viewBox="0 0 124 124"
                          >
                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                          </svg>
                          <span className="mx-3 font-bold">{prod.quantity}</span>
                          <svg
                            onClick={() => handleAddProductToCart(prod.product_id._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2.5 fill-current"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center">Your Cart Is Empty</div>
              )}
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg space-y-4 shadow-md">
                <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>
                <div className="border-b border-gray-200 pb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-800">${totalPrice}</span>
                </div>
                <div className="border-b border-gray-200 pb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">Shipping</span>
                  <span className="font-bold text-gray-800">Free</span>
                </div>
                <div className="border-b border-gray-200 pb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">tax</span>
                  <span className="font-bold text-gray-800">$0.00</span>
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-base font-bold text-gray-800">Total</span>
                  <span className="text-base font-bold text-gray-800">${totalPrice}</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-4 shadow-md">
                <h3 className="text-lg font-bold text-gray-800">Checkout</h3>
                <Formik initialValues={initialValues} validationSchema={checkoutValidationSchema} onSubmit={handleSubmit}>
                  {({ errors, touched, isValid, dirty }) => (
                    <Form className="space-y-4">
                      <div className="relative">
                        <Field
                          label="Full Name"
                          variant="outlined"
                          as={Input}
                          type="text"
                          name="fullName"
                          className="w-full px-4 py-2 text-sm border border-gray-200 rounded-md outline-none"
                        />
                        <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      <div className="relative">
                        <Field
                          label="Address"
                          variant="outlined"
                          as={Input}
                          type="text"
                          name="address"
                          className="w-full px-4 py-2 text-sm border border-gray-200 rounded-md outline-none"
                        />
                        <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      <div className="relative">
                        <Field
                          label="Phone"
                          variant="outlined"
                          as={Input}
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-2 text-sm border border-gray-200 rounded-md outline-none"
                        />
                        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      {paymantLoading ? (
                        <Button
                          type="button"
                          className="mt-6 bg-main-500 flex justify-center items-center"
                          fullWidth
                          disabled
                        >
                          <svg
                            className="mr-3 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="font-medium">Processing...</span>
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="w-full text-center bg-main-500 text-white py-2 rounded-md transition duration-100"
                        >
                          Place Order
                        </Button>
                      )}


                    </Form>)}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;

import React, { useEffect, useState } from 'react';
import { getUserOrder } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import { Card, Chip, Spinner, Typography } from "@material-tailwind/react";
import { format } from 'date-fns';


function Order() {
  const TABLE_HEAD = ["Product Name", "Date", "Price", "Status", "Payment Status"];

  const [lastOrder, setLastOrder] = useState(null);
  const { token } = useUser();
  const [isLoading, setIsLoading] = useState(false)

  const handleUsersOrders = async () => {
    setIsLoading(true)
    try {
      let res = await getUserOrder(token);
      console.log(res.data);
      const orders = res.data.orders;
      if (orders.length > 0) {
        setLastOrder(orders[orders.length - 1]);
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    handleUsersOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'eee h:mmaaa');
  };

  return (<>
    {isLoading ?
      <div className="h-[40vh] w-100 flex justify-center items-center">
        <Spinner color="green" className="h-10 w-10" />
      </div> : <div className='w-full py-24'>
        <div className='w-full text-center pb-5'>
          <p className='text-gray-700 opacity-85'>Thank you</p>
          <h1 className=' text-3xl md:text-5xl'>Payment Successfully </h1>
        </div>
        <hr/>
        <section className="py-5 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="flex items-start flex-col gap-6 xl:flex-row ">
            <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
              <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200">
                  Order Summary
                </h2>
                <div className="data py-6 border-b border-gray-200">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Product Cost</p>
                    <p className="font-medium text-lg leading-8 text-gray-900">${lastOrder?.total_discounted_price}.00</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Shipping</p>
                    <p className="font-medium text-lg leading-8 text-gray-600">$00.00</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 ">
                    <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">Coupon Code</p>
                    <p className="font-medium text-lg leading-8 text-emerald-500">#NOT_APPLIED</p>
                  </div>
                </div>
                <div className="total flex items-center justify-between pt-6">
                  <p className="font-normal text-xl leading-8 text-black ">Subtotal</p>
                  <h5 className="font-manrope font-bold text-2xl leading-9 text-indigo-600">${lastOrder?.total_discounted_price}.00</h5>
                </div>
              </div>
            </div>

            <div className='p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 '>
              <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lastOrder && lastOrder.products.map(({ product, quantity, id }) => (
                      <tr key={id}>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {product.title.split(' ').slice(0, 6).join(' ')}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {formatDate(lastOrder.createdAt)}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            ${product.price}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            On Delivery
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={'paid'}
                            color={"green"}
                            className='w-fit'

                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>
      </section>
        </div>}

  </>
  );
}

export default Order;

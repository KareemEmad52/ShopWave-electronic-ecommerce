import React, { useCallback, useEffect, useState } from 'react';
import { getBrands } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Input, Spinner, Typography } from '@material-tailwind/react';
import _ from 'lodash';

function Brands() {
  const nav = useNavigate();
  const [categories, setCategories] = useState({ document: [], totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useUser();


  const handleGetCategoryDetails = async (page = 1, keyword = '') => {
    setIsLoading(true);
    try {
      const res = await getBrands({ page, keyword });
      setCategories(res);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error('Failed to fetch products');
    }
  };


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
    if (currentPage === categories.totalPages) return
    setCurrentPage(currentPage + 1)
  }

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const navigateToBrands = (id) => {
    nav(`brandDetails/${id}`)
  }

  useEffect(() => {
    handleGetCategoryDetails(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  return (
    <>
      <div>
        <span className='block text-alternative-500 font-poppins text-[9px] md:text-[12px] font-medium mt-5 mb-2 ps-3'>Brands</span>
        <h2 className='font-poppins text-sm font-semibold mb-1 md:mb-5 ps-3 text-[16px] md:text-[27px]'>View All Brands : </h2>


        <div className='w-full mt-5 md:my-5 flex justify-center items-center '>
            <div className='w-[80%] md:w-[70%]'>
              <Input
                variant='outlined'
                label='Search'
                placeholder="Search by Brands name"
                onChange={handleSearchChange}
              />
            </div>
          </div>

        {isLoading ? (
          <div className='h-[20vh] w-100 flex justify-center items-center'>
            <Spinner color="green" className="h-10 w-10" />
          </div>
        ) : <div className="w-full min-h-[80vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {categories?.document.map((brand) => (
              <div key={brand._id} className="bg-white cursor-pointer  border rounded-xl shadow-md sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" onClick={() => navigateToBrands(brand._id)}>
                <div className="flex-shrink-0 mx-auto relative w-[80%] rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-70 md:rounded-se-none md:max-w-70">
                  <img className="size-full absolute top-0 start-0 object-cover hover:scale-110 transtionAll" src={brand.image.path} alt="Image Description" />
                </div>
              </div>
            ))}
          </div>
        </div>
        }



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
              <strong className='text-gray-900'>{categories.totalPages}</strong>
            </Typography>
            <IconButton
              size='sm'
              variant='outlined'
              onClick={next}
              disabled={currentPage === categories.totalPages}
            >
              <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
            </IconButton>
          </div>
        </div>

      </div>
    </>
  );
}

export default Brands;

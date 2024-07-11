import React, { useCallback, useEffect, useState } from 'react';
import { getCategories } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Input, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { Puff } from 'react-loader-spinner';

function Categories() {
  const nav = useNavigate();
  const [categories, setCategories] = useState({ document: [], totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useUser();


  const handleGetCategoryDetails = async (page = 1, keyword = '') => {
    setIsLoading(true);
    try {
      const res = await getCategories({ page, keyword });
      setCategories(res);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error('Failed to fetch products');
    }
  };


  const navigateToCategory = (id) => {
    nav(`categoryDetails/${id}`)
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
    if (currentPage === categories.totalPages) return
    setCurrentPage(currentPage + 1)
  }

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    handleGetCategoryDetails(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  return (
    <>
      <div>
        <span className='block text-alternative-500 font-poppins text-[9px] md:text-[12px] font-medium mt-5 mb-2 ps-3'>Category</span>
        <h2 className='font-poppins text-sm font-semibold mb-1 md:mb-5 ps-3 text-[16px] md:text-[27px]'>Featured Category : </h2>


        <div className='w-full mt-5 md:my-5 flex justify-center items-center '>
            <div className='w-[80%] md:w-[70%]'>
              <Input
                variant='outlined'
                label='Search'
                placeholder="Search by Categories name"
                onChange={handleSearchChange}
              />
            </div>
          </div>

        {isLoading ? (
          <div className='h-[20vh] w-100 flex justify-center items-center'>
            <Puff
              height='60'
              width='60'
              radius={1.5}
              color='#4fa94d'
              ariaLabel='puff-loading'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          </div>
        ) : <div className="w-full min-h-[80vh]">
          <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-4 p-4">
            {categories?.document.map((cat) => (
              <div key={cat._id} className="bg-white cursor-pointer  border rounded-xl shadow-md sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" onClick={() => navigateToCategory(cat._id)}>
                <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
                  <img className="size-full absolute top-0 start-0 object-cover hover:scale-110 transtionAll" src={cat.image.path} alt="Image Description" />
                </div>
                <div className="flex flex-wrap">
                  <div className="p-4 flex flex-col h-full sm:p-7">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-neutral-400">
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <div className="mt-5 sm:mt-auto">
                      <p className="text-xs text-gray-500 dark:text-neutral-500">
                        Last updated {formatDistanceToNow(parseISO(cat.updatedAt))} ago
                      </p>
                    </div>
                  </div>
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

export default Categories;

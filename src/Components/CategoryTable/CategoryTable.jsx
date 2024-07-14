import React, { useCallback, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Spinner,
} from "@material-tailwind/react";
import Table from '../Table/Table';
import { deleteCategory, deleteProduct, getCategories } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';
import AddCategoryModal from './AddCategoryModal';
import _ from 'lodash';



const CategoryHeaders = ["Title", "Added"];


function CategoryTable() {

  const [categoryRows, setCategoryRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useUser()


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const HandlegetCategoryDetails = async (page = 1, keyword = '') => {
    try {
      const res = await getCategories({ page, keyword })
      const transformedData = transformData(res.document);
      setCategoryRows(transformedData);
      setIsLoading(false)
    } catch (e) {
      console.log(e);
      setIsLoading(false)
    }
  }

  const HandleDeleteCategory = async (id) => {
    const toastId = toast.loading("Deleting Category...");
    try {
      const res = await deleteCategory(id, token)
      await HandlegetCategoryDetails(currentPage, searchQuery)
      toast.update(toastId, {
        render: "Category Deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Please try again ",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
      console.log(error);
    }
  }

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1); // Reset to the first page on a new search
    }, 500),
    [] // Ensures the debounce function is not recreated on every render
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true)
    HandlegetCategoryDetails(currentPage, searchQuery)
  }, [currentPage, searchQuery]);


  // Function to transform API response
  const transformData = (data) => {
    return data.map((item) => ({
      title: item.name,
      added: new Date(item.createdAt).toLocaleDateString(),
      img: item.image.path,
      _id: item._id
    }));
  };

  return (
    <Card className="h-full w-full">
      <AddCategoryModal isOpen={isModalOpen} closeModal={closeModal} displayCategory={HandlegetCategoryDetails} />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Categories
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              List of all Categories
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button onClick={openModal} className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Category
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        {isLoading ? <div className="text-center text-blue-gray-500 p-4 flex justify-center items-center">
          <Spinner color="green" className="h-10 w-10" />
        </div> : <Table headers={CategoryHeaders} rows={categoryRows} deleteFn={HandleDeleteCategory} />}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" onClick={handleNextPage}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>

  )
}

export default CategoryTable
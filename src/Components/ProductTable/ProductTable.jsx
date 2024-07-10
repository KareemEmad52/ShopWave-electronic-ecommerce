import React, { useEffect, useState, useCallback } from 'react';
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
} from "@material-tailwind/react";
import Table from '../Table/Table';
import { deleteProduct, getAllProduct } from '../../utils/api';
import AddProductModal from './AddProductModal';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';
import _ from 'lodash';

const productHeaders = ["Title", "Category", 'Brand', "Price", "Stock", "Added"];

function ProductTable() {
  const [productRows, setProductRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useUser();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const HandlegetProductDetails = async (page = 1, keyword = '') => {
    setIsLoading(true);
    try {
      const res = await getAllProduct({ page, keyword });
      const transformedData = transformData(res.data);
      setProductRows(transformedData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const transformData = (data) => {
    return data.document.map((item) => ({
      title: item.title.split(" ").slice(0, 3).join(" "),
      category: item.category?.name,
      brand: item.brand?.name,
      price: `$${item.price}`,
      stock: item.stock > 0 ? "In Stock" : "Out of Stock",
      added: new Date(item.createdAt).toLocaleDateString(),
      img: item.imgCover.path,
      _id: item._id,
    }));
  };

  const HandleDeleteProduct = async (id) => {
    const toastId = toast.loading("Deleting Product...");
    try {
      const res = await deleteProduct(id, token);
      await HandlegetProductDetails(currentPage, searchQuery);
      console.log(res);
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
    HandlegetProductDetails(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

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

  return (
    <Card className="h-full w-full">
      <AddProductModal isOpen={isModalOpen} closeModal={closeModal} displayProduct={() => HandlegetProductDetails(currentPage, searchQuery)} />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Products
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              List of all products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button onClick={openModal} className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add product
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
        {isLoading ? (
          <div className="text-center text-blue-gray-500 p-4 flex justify-center items-center">
            <Puff
              height="60"
              width="60"
              radius={0.8}
              color="#4fa94d"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <Table headers={productHeaders} rows={productRows} deleteFn={HandleDeleteProduct} />
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage}
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
  );
}

export default ProductTable;

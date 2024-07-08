import React, { useEffect, useState } from 'react'
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
import {  deleteBrand, getBrands } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';
import AddBrandModal from './AddBrandModal';



const BrandsHeaders = ["Title", "Added"];


function BrandTable() {

  const [brandsRows, setBrandsRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useUser()


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const HandlegetBrandDetails = async () => {
    try {
      const res = await getBrands()
      const transformedData = transformData(res.document);
      setBrandsRows(transformedData);
      setIsLoading(false)
    } catch (e) {
      console.log(e);
      setIsLoading(false)
    }
  }

  const HandleDeleteBrand = async (id) => {
    const toastId = toast.loading("Deleting Brand...");
    try {
      const res = await deleteBrand(id, token)
      await HandlegetBrandDetails()
      toast.update(toastId, {
        render: "Brand Deleted successfully!",
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

  useEffect(() => {
    setIsLoading(true)
    HandlegetBrandDetails()
  }, []);


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
      <AddBrandModal isOpen={isModalOpen} closeModal={closeModal} displayBrand={HandlegetBrandDetails} />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Brand
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              List of all Brands
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button onClick={openModal} className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Brand
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        {isLoading ? <div className="text-center text-blue-gray-500 p-4">
          No data available
        </div> : <Table headers={BrandsHeaders} rows={brandsRows} deleteFn={HandleDeleteBrand} />}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>

  )
}

export default BrandTable
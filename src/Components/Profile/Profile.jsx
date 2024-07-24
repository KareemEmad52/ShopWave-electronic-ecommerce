import { Button, Chip, Spinner } from '@material-tailwind/react'
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import EditProfileModal from './EditProfileModal';
import { getUserDetails } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';

function Profile() {

  const { token } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['userProfileDetails', token],
    queryFn: () => getUserDetails(token),
    enabled: !!token,
    onSuccess: (data) => {
      console.log(data);
      setUserInfo(data.user);
    },
    onError: (error) => {
      console.error('Error fetching user details:', error);
    },
  });


  const profilePicturePath = data?.user?.profilePicture?.path || 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg';

  const user = data?.user;

  return (
    <>
      {selectedUser && <EditProfileModal isOpen={isModalOpen} closeModal={closeModal} user={selectedUser} />}
      {isLoading ? <div className="text-center h-[80vh] text-blue-gray-500 p-4 flex justify-center items-center">
        <Spinner color="green" className="h-10 w-10" />
      </div> :
        <div className='w-full flex justify-center items-center py-5 md:px-5'>
          <div className='w-fit border-spacing-2  border border-main-200 transition-all duration-500 hover:border-main-500 rounded-md py-4 px-2 md:px-8'>
            <h1 className='font-poppins font-medium text-3xl  text-center mb-2 text-main-500'>Profile Info </h1>
            <hr />
            <div className='mx-auto w-36 md:w-40 rounded-full py-8'>
              <img
                className="mx-auto h-auto w-full rounded-full border border-alternative-100 hover:border-alternative-200 duration-500 transition-all border-spacing-1"
                src={profilePicturePath}
                alt="Profile Picture"
              />
            </div>
            <div className='flex flex-col justify-center items-center gap-3 mb-5'>
              <h1 className=' text-sm md:text-xl font-poppins font-medium px-6 py-2 border border-gray-200 rounded-3xl group transition-all duration-500 hover:border-gray-400 w-fit '>Name : <span className='md:text-lg font-medium text-alternative-400'>{data?.user?.name}</span></h1>
              <h1 className='text-sm md:text-xl font-poppins font-medium px-6 py-2 border border-gray-200 rounded-3xl group transition-all duration-500 hover:border-gray-400 w-fit '>Email : <span className='md:text-lg font-medium text-alternative-400'>{data?.user?.email}</span></h1>

              <div className='flex flex-row justify-center items-center gap-5'>
                <Chip
                  variant="ghost"
                  color="green"
                  size="sm"
                  value="Active"
                  icon={
                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                  }
                />
                <Chip variant="ghost" value="Admin" className="rounded-full" />
              </div>
              <div className='border-t border-spacing-2 w-full'>
                <Button onClick={() => openModal(user)} variant="outlined" className="rounded-full mt-4 w-full">
                  Edit Profile Data
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Profile
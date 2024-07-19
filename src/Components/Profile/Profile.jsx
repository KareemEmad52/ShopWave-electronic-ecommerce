import { Button, Chip } from '@material-tailwind/react'
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../context/UserContext';
import { useEffect, useState } from 'react';

function Profile() {

  const { token } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [token]);
  return (
    <>
      <div className='w-full flex justify-center items-center py-5 md:px-5'>
        <div className='w-fit border-spacing-2  border border-main-200 transition-all duration-500 hover:border-main-500 rounded-md py-4 px-2 md:px-8'>
          <h1 className='font-poppins font-medium text-3xl  text-center mb-2 text-main-500'>Profile Info </h1>
          <hr />
          <div className='mx-auto w-36 md:w-40 rounded-full py-8'>
            <img className="mx-auto h-auto w-full rounded-full border border-alternative-100 hover:border-alternative-200 duration-500 transition-all border-spacing-1" src={userInfo?.profilePicture?.path ? userInfo?.profilePicture?.path : 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'} alt="" />
          </div>
          <div className='flex flex-col justify-center items-center gap-3 mb-5'>
            <h1 className=' text-sm md:text-xl font-poppins font-medium px-6 py-2 border border-gray-200 rounded-3xl group transition-all duration-500 hover:border-gray-400 w-fit '>Name : <span className='md:text-lg font-medium text-alternative-400'>{userInfo?.name}</span></h1>
            <h1 className='text-sm md:text-xl font-poppins font-medium px-6 py-2 border border-gray-200 rounded-3xl group transition-all duration-500 hover:border-gray-400 w-fit '>Email : <span className='md:text-lg font-medium text-alternative-400'>{userInfo?.email}</span></h1>

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
              <Button variant="outlined" className="rounded-full mt-4 w-full">
                Edit Profile Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
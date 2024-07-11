import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../context/UserContext';
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  CogIcon
} from "@heroicons/react/24/solid";

function Navbar() {

  const { token, setToken } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/')
  }

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
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/categories">Category</Link></li>
            <li>
              <Link to='/brands'>Brands</Link>
            </li>
            <li><a>Wichlist</a></li>
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl font-poppins font-semibold text-main-500">ShopWave</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/categories">Category</Link></li>
          <li>
            <Link to='/brands'>Brands</Link>
          </li>
          <li><a>Wichlist</a></li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {token ? <>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {userInfo?.profilePicture?.path ? <img
                  alt="Tailwind CSS Navbar component"
                  src={userInfo?.profilePicture?.path} /> : <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />}
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userInfo?.profilePicture?.path} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  <span className='flex gap-1'>
                    <UserCircleIcon className='h-[18px] w-[18px] ' />
                    <span>Profile</span>
                  </span>
                  <span className="badge">New</span>
                </a>
              </li>
              <li><Link to='/adminPanel' className="justify-between">
                <span className='flex gap-1'>
                  <CogIcon className='h-[18px] w-[18px] ' />
                  <span>Admin</span>
                </span>
              </Link></li>
              <li><button onClick={handleLogout} className="justify-between font-poppins text-alternative-500 font-medium ">
                <span className='flex gap-1'>
                  <PowerIcon strokeWidth={1} className='h-[18px] w-[18px]' />
                  <span>Log Out</span>
                </span>
              </button></li>
            </ul>
          </div>

        </>
          :
          <><Link to='/login' className="btn btn-sm">Log in</Link>
            <Link to='/signup' className="btn btn-sm btn-neutral">Register</Link>
          </>}

      </div>
    </div>
  )
}

export default Navbar
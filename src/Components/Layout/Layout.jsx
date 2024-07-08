import { Outlet, useLocation } from "react-router-dom"
import '../../Styles/custom.css'
import Navbar from "../Navbar/Navbar"
import { CarouselDefault } from "../Home/CarouselDefault";
function Layout() {

  const location = useLocation();

  // List of paths that should not have the container class
  const pathsWithoutContainer = ['/adminPanel','/adminPanel/productPanel','/adminPanel/categoryPanel','/adminPanel/brandPanel'];

  const shouldApplyContainer = !pathsWithoutContainer.includes(location.pathname);
  return (
    <>
    <Navbar />
    <div className={shouldApplyContainer ? 'custom-container' : ''}>
    <Outlet />

    </div>

    </>
  )
}

export default Layout
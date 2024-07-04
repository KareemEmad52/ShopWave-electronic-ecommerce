import { Outlet } from "react-router-dom"
import '../../Styles/custom.css'
import Navbar from "../Navbar/Navbar"
function Layout() {
  return (
    <>
    <Navbar />
    <div className="custom-container">
    <Outlet />

    </div>

    </>
  )
}

export default Layout
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import { Signup } from './Components/Signup/Signup'
import { Login } from './Components/Login/Login';
import { UserProvider } from './context/UserContext';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import ProductTable from './Components/ProductTable/ProductTable';
import CategoryTable from './Components/CategoryTable/CategoryTable';
import BrandTable from './Components/BrandTabel/BrandTable';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductDetials from './Components/ProductDetails/ProductDetials';
import Products from './Components/Products/Products';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoutes';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import CategoriesDetails from './Components/Categories/CategoriesDetails';
import BrandsDetails from './Components/Brands/BrandsDetails';
import Cart from './Components/Cart/Cart';
import { CartProvider } from './context/CartContext';
import Order from './Components/Order/Order';


const routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'productDetails/:id', element: <ProductDetials /> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories/categoryDetails/:id', element: <ProtectedRoute><CategoriesDetails /></ProtectedRoute> },
      { path: 'brands/brandDetails/:id', element: <ProtectedRoute><BrandsDetails /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'order', element: <ProtectedRoute><Order /></ProtectedRoute> },
      {
        path: 'adminPanel', element: <AdminPanel />, children: [
          { index: true, element: <ProductTable /> },
          { path: 'categoryPanel', element: <CategoryTable /> },
          { path: 'brandPanel', element: <BrandTable /> },
        ]
      },
    ]
  }
])
function App() {

  return (

    <>
    <CartProvider>
      <UserProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
      </UserProvider>
      </CartProvider>
    </>
  )
}

export default App

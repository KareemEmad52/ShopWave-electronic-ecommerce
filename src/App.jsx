import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import { Signup } from './Components/Signup/Signup'
import { Login } from './Components/Login/Login';
import { UserProvider } from './context/UserContext';

const routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ]
  }
])
function App() {

  return (

    <>
      <UserProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App

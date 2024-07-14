import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import {LoginUser } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginSchema } from '../../utils/ValidationSchema';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';





export function Login() {

  let [isLoading, setIsLoading] = useState(false)
  const Navigate = useNavigate()
  let {setToken} = useUser()
  const {getCartDetails} = useCart()


  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      const data = await LoginUser(values)
      localStorage.setItem('token',data?.token)
      setToken(data?.token)
      setIsLoading(false)
      getCartDetails(data?.token)
      Navigate('/')
    } catch (error) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message)
      console.error('Error uploading data:', error);
    }
  }


  return (
    <div className="py-5 min-h-[90vh] flex justify-center items-center">
      <Card color="transparent" shadow={true} className="shadow-lg px-7 py-2 border border-main-400 mt-10 md:mt-5">
        <Typography variant="h3" color="blue-gray" className='mt-2'>
          Log in
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-[0.9rem]">
          Nice to meet you! Enter your details to log in.
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">

                <Field
                  variant="standard"
                  label="Your Email"
                  as={Input}
                  name="email"
                  type="email"
                  size="lg"
                  placeholder="name@mail.com"
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                <Field
                  variant="standard"
                  label="Your Password"
                  as={Input}
                  name="password"
                  type="password"
                  size="lg"
                  placeholder="********"
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />



              </div>
              {isLoading ? <Button type="submit" className="mt-6 flex justify-center items-center" fullWidth disabled={!(isValid && dirty)}>
                <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-medium"> Processing... </span>
              </Button> : <Button type="submit" className="mt-6" fullWidth disabled={!(isValid && dirty)}>
                Log in
              </Button>}

              <Typography color="gray" className="mt-4 text-center font-normal">
                Don't have an account?{" "}
                <Link to='/signup' className="font-medium text-gray-900">
                  Register
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

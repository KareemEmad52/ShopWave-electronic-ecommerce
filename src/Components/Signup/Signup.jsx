import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { AddNewUser } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SignupSchema } from '../../utils/ValidationSchema';





export function Signup() {

  let [profilePicture, setProfilePicture] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  const Navigate = useNavigate()


  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  }

  const handleSubmit = async (values) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const data = await AddNewUser(formData);
      setIsLoading(false)
      Navigate('/login')
    } catch (error) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message)
      console.error('Error uploading data:', error);
    }
  }


  return (
    <div className="py-5 min-h-[90vh] flex justify-center items-center ">
      <Card color="transparent" shadow={true} className="shadow-lg px-7 py-2 border border-main-400 ">
        <Typography variant="h3" color="blue-gray" className='mt-2'>
          Register
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-[0.9rem]">
          Nice to meet you! Enter your details to register.
        </Typography>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            terms: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Field
                  variant="standard"
                  label="Your Name"
                  as={Input}
                  name="name"
                  size="lg"
                  placeholder="Your Name"
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.name && touched.name ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

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

                <input type="file" onChange={handleProfilePictureChange} className="file-input file-input-bordered file-input-sm w-full max-w-[30rem]" />


              </div>
              <div className="-ml-2.5">
                <Field
                  as={Checkbox}
                  name="terms"
                  type="checkbox"
                  className="border-gray-300"
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                    >
                      I agree to the
                      <span
                        
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        &nbsp;Terms and Conditions
                      </span>
                    </Typography>
                  }
                />
                <ErrorMessage name="terms" component="div" className="text-red-500 text-sm" />
              </div>
              {isLoading ? <Button type="submit" className="mt-6 flex justify-center items-center" fullWidth disabled={!(isValid && dirty)}>
                <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-medium"> Processing... </span>
              </Button> : <Button type="submit" className="mt-6" fullWidth disabled={!(isValid && dirty)}>
                Sign Up
              </Button>}

              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to='/login' className="font-medium text-gray-900">
                  Sign In
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

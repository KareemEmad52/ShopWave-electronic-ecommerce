import * as Yup from 'yup';


export const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum').required('Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

// Validation schema using Yup for Login
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum').required('Password is required'),
});
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

//Add Product Model Schema
export const AddProductSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().min(10,"Discription length must be at least 10 characters long").required('Description is required'),
  priceAfterDiscount: Yup.number().required('Price after discount is required'),
  price: Yup.number().required('Price is required'),
  stock: Yup.number().required('Stock is required'),
  category: Yup.string().required('Category is required'),
  brand: Yup.string().required('Brand is required'),
  imgCover: Yup.mixed().required('Cover image is required'),
  productImages: Yup.array().min(1, 'At least one product image is required'),
});


//Add Category Model Schema
export const AddCategoySchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  image: Yup.mixed().required('Cover image is required'),
});


//Add Brand Model Schema
export const AddBrandSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  image: Yup.mixed().required('Cover image is required'),
});


//checkout schema 
export const checkoutValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone number is required'),
});

// update User Schema
export const updateUserSchema = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email("Not valid email format").optional(),
  password: Yup.string().optional(),
  image: Yup.mixed().optional(),
});
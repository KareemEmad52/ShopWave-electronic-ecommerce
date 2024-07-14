import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Select, Option, Textarea } from "@material-tailwind/react";
import { addProduct, getBrands, getCategories } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import * as Yup from 'yup';
import { AddProductSchema } from '../../utils/ValidationSchema';


const AddProductModal = ({ isOpen, closeModal, displayProduct }) => {
  const { token } = useUser();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    title: '',
    description: '',
    price: '',
    stock: '',
    priceAfterDiscount: '',
    imgCover: null,
    productImages: [],
    category: '',
    brand: '',
  };


  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true)

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('priceAfterDiscount', values.priceAfterDiscount);
    formData.append('price', values.price);
    formData.append('stock', values.stock);
    formData.append('subcategory', '65ccaceb58f54efeafa263a1'); // Adjust accordingly
    formData.append('imgCover', values.imgCover);
    formData.append('category', values.category);
    formData.append('brand', values.brand);

    for (let i = 0; i < values.productImages.length; i++) {
      formData.append('images', values.productImages[i]);
    }


    try {
      const result = await addProduct(formData, token); // Use the addProduct function from the API module
      console.log(result);
      displayProduct()
      setIsLoading(false)
      closeModal(); // Close modal after submission
      resetForm(); // Optionally reset form values
    } catch (error) {
      setIsError(error)
      setIsLoading(false)
      console.error('Error submitting form', error);
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categoryResponse = await getCategories({page : 1, keyword : ''}); // Adjust the URL
        const brandResponse = await getBrands({page : 1, keyword : ''}); // Adjust the URL
        setCategories(categoryResponse.document);
        setBrands(brandResponse.document);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    if (isOpen) {
      fetchOptions();
      document.getElementById('my_modal_1').showModal();
    } else {
      document.getElementById('my_modal_1').close();
    }
  }, [isOpen]);

  return (
    <Fragment>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-[45rem]">
          <h3 className="font-bold text-lg">Add New Product</h3>
          {isError ? (
            <div className="text-red-500 text-sm">{isError.response?.data.message}</div>
          ) : ""}
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={AddProductSchema}>
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    placeholder="Title"
                    type="text"
                    id="title"
                    name="title"
                    className={`mt-2 block w-full px-3 py-2 border ${errors.title && touched.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-main-500 sm:text-sm`}
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-500 text-sm">{errors.title}</div>
                  )}

                  <div className='mt-2'>
                    <Field
                      as={Textarea}
                      className={`textarea textarea-bordered resize-none w-full px-3 py-2 ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-indigo-500 focus:border-main-500 focus:border-t-main-500`}
                      placeholder="Description"
                      id="description"
                      name="description"
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500 text-sm">{errors.description}</div>
                    )}
                  </div>

                  <Field
                    placeholder="Price After Discount"
                    type="text"
                    id="priceAfterDiscount"
                    name="priceAfterDiscount"
                    className={`mt-2 block w-full px-3 py-2 border ${errors.priceAfterDiscount && touched.priceAfterDiscount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-main-500 sm:text-sm`}
                  />
                  {errors.priceAfterDiscount && touched.priceAfterDiscount && (
                    <div className="text-red-500 text-sm">{errors.priceAfterDiscount}</div>
                  )}

                  <Field
                    placeholder="Price"
                    type="text"
                    id="price"
                    name="price"
                    className={`mt-2 block w-full px-3 py-2 border ${errors.price && touched.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-main-500 sm:text-sm`}
                  />
                  {errors.price && touched.price && (
                    <div className="text-red-500 text-sm">{errors.price}</div>
                  )}

                  <Field
                    placeholder="Stock"
                    type="text"
                    id="stock"
                    name="stock"
                    className={`mt-2 block w-full px-3 py-2 border ${errors.stock && touched.stock ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-main-500 sm:text-sm`}
                  />
                  {errors.stock && touched.stock && (
                    <div className="text-red-500 text-sm">{errors.stock}</div>
                  )}

                  <div className='flex justify-around mt-3'>
                    <div className="w-72">
                      <Field name="category">
                        {({ field }) => (
                          <select
                            {...field}
                            label="Select Category"
                            value={values.category}
                            onChange={(e) => setFieldValue('category', e.target.value)}
                            className={`select select-success focus:outline-none w-full max-w-xs ${errors.category && touched.category ? 'border-red-500' : 'border-gray-300'}`}
                          >
                            <option disabled value="">Pick your category</option>
                            {categories.map((option) => (
                              <option key={option._id} value={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </Field>
                      {errors.category && touched.category && (
                        <div className="text-red-500 text-sm">{errors.category}</div>
                      )}
                    </div>

                    <div className="w-72">
                      <Field name="brand">
                        {({ field }) => (
                          <select
                            {...field}
                            label="Select Brand"
                            value={values.brand}
                            onChange={(e) => setFieldValue('brand', e.target.value)}
                            className={`select select-success focus:outline-none w-full max-w-xs ${errors.brand && touched.brand ? 'border-red-500' : 'border-gray-300'}`}
                          >
                            <option disabled value="">Pick your brand</option>
                            {brands.map((option) => (
                              <option key={option._id} value={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </Field>
                      {errors.brand && touched.brand && (
                        <div className="text-red-500 text-sm">{errors.brand}</div>
                      )}
                    </div>
                  </div>

                  <div className='flex flex-col my-2'>
                    <label htmlFor="imgCover">Cover Image:</label>
                    <input
                      type="file"
                      id="imgCover"
                      className={`file-input w-full max-w-xs file-input-sm ${errors.imgCover && touched.imgCover ? 'border-red-500' : 'border-gray-300'}`}
                      onChange={(event) => {
                        setFieldValue('imgCover', event.currentTarget.files[0]);
                      }}
                    />
                    {errors.imgCover && touched.imgCover && (
                      <div className="text-red-500 text-sm">{errors.imgCover}</div>
                    )}
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="productImages">Product Images:</label>
                    <input
                      type="file"
                      id="productImages"
                      multiple
                      className={`file-input w-full max-w-xs file-input-sm ${errors.productImages && touched.productImages ? 'border-red-500' : 'border-gray-300'}`}
                      onChange={(event) => {
                        setFieldValue('productImages', Array.from(event.currentTarget.files));
                      }}
                    />
                    {errors.productImages && touched.productImages && (
                      <div className="text-red-500 text-sm">{errors.productImages}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  {isLoading ? <button type="submit" className="btn btn-neutral  btn-sm flex justify-center items-center">
                    <svg className="mr-1 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-medium text-sm"> Processing... </span>
                  </button> : <button type="submit" className="btn btn-neutral  btn-sm">
                    Add Product
                  </button>}
                  <button type="button" className="btn btn-sm" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </dialog>
    </Fragment>
  );
};

export default AddProductModal;

import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Select, Option, Textarea } from "@material-tailwind/react";
import { addBrand, getBrands } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import * as Yup from 'yup';
import { AddBrandSchema } from '../../utils/ValidationSchema';


const AddBrandModal = ({ isOpen, closeModal, displayBrand }) => {
  const { token } = useUser();
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    name: '',
    image: null,
  };


  const handleSubmit = async (values, { resetForm }) => {
    console.log("Heree");
    setIsLoading(true)

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);


    try {
      const result = await addBrand(formData, token); // Use the addProduct function from the API module
      displayBrand()
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
    if (isOpen) {
      document.getElementById('my_modal_1').showModal();
    } else {
      document.getElementById('my_modal_1').close();
    }
  }, [isOpen]);

  return (
    <Fragment>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-[45rem]">
          <h3 className="font-bold text-lg">Add New Brand</h3>
          {isError ? (
            <div className="text-red-500 text-sm">{isError.response?.data.message}</div>
          ) : ""}
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={AddBrandSchema}>
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    placeholder="Name"
                    type="text"
                    id="name"
                    name="name"
                    className={`mt-2 block w-full px-3 py-2 border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-main-500 sm:text-sm`}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}







                  <div className='flex flex-col my-2'>
                    <label htmlFor="image">Cagetory Image:</label>
                    <input
                      type="file"
                      id="image"
                      className={`file-input w-full max-w-xs file-input-sm ${errors.image && touched.image ? 'border-red-500' : 'border-gray-300'}`}
                      onChange={(event) => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />
                    {errors.image && touched.image && (
                      <div className="text-red-500 text-sm">{errors.image}</div>
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
                    Add Brand
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

export default AddBrandModal;

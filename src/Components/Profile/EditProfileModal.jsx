import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { updateUserSchema } from '../../utils/ValidationSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../utils/api';
import { toast } from 'react-toastify';

function EditProfileModal({ isOpen, closeModal, user }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    profilePicture: null,
  };

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfileDetails'] });
      toast.success("Updated Successfully");
      closeModal();
    },
    onError: (error) => {
      setIsError(error);
      console.error('Error submitting form', error);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);

    const formData = new FormData();
    // Append only changed fields to formData
    Object.keys(values).forEach(key => {
      if (key === 'profilePicture' && values.profilePicture) {
        formData.append(key, values[key]);
      } else if (key !== 'profilePicture' && values[key] && values[key] !== initialValues[key]) {
        formData.append(key, values[key]);
      }
    });

    try {
      await mutation.mutateAsync({ formData, id: user._id });
      resetForm();
    } catch (error) {
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
          <h3 className="font-bold text-lg">Edit Profile</h3>
          {isError && (
            <div className="text-red-500 text-sm">{isError.response?.data.message}</div>
          )}
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={updateUserSchema}>
            {({ values, setFieldValue, errors, touched ,dirty }) => (
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

                  <Field
                    placeholder="New Password"
                    type="text"
                    id="password"
                    name="password"
                    className={`mt-2 block w-full px-3 py-2 border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-main-500 sm:text-sm`}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                  )}

                  <Field
                    placeholder="Email"
                    type="text"
                    id="email"
                    name="email"
                    className={`mt-2 block w-full px-3 py-2 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-main-500 sm:text-sm`}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}

                  <div className='flex flex-col my-2'>
                    <label htmlFor="profilePicture">New User's Image:</label>
                    <input
                      type="file"
                      id="profilePicture"
                      className={`file-input w-full max-w-xs file-input-sm ${errors.profilePicture && touched.profilePicture ? 'border-red-500' : 'border-gray-300'}`}
                      onChange={(event) => {
                        setFieldValue('profilePicture', event.currentTarget.files[0]);
                      }}
                    />
                    {errors.profilePicture && touched.profilePicture && (
                      <div className="text-red-500 text-sm">{errors.profilePicture}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  {isLoading ? (
                    <button type="submit" className="btn btn-neutral btn-sm flex justify-center items-center">
                      <svg className="mr-1 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-medium text-sm"> Processing... </span>
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-neutral btn-sm" disabled={!dirty || isLoading}>
                      Update User
                    </button>
                  )}
                  <button type="button" className="btn btn-sm" onClick={closeModal} >
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
}

export default EditProfileModal;

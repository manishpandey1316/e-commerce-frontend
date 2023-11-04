import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useForm } from "react-hook-form";
import { RotatingTriangles } from "react-loader-spinner";
import {
  fetchUpdateUserAsync,
  fetchUserAsync,
  selectUserDetails,
  selectUserStatus
} from "./UserSlice";

function UserProfile() {
  const dispatch = useDispatch();
 
  const userDetails = useSelector(selectUserDetails);
  const [profile, setProfile] = useState(-1);
  const [openForm, setOpenForm] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch]);
  function handleEdit() {
    const address = userDetails.Address[profile];
    setValue("fullName", address.fullName);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("postalCode", address.postalCode);
    setOpenForm(1);
  }
  function handleRemove() {
    const userData = [...userDetails.Address];
    userData.splice(profile, 1);
    dispatch(fetchUpdateUserAsync({ ...userDetails, Address: userData }));
  }
  function handleSave(data) {
    const userData = [...userDetails.Address];
    if (profile > -1) {
      userData.splice(profile, 1, data);
    } else {
      userData.push(data);
    }
    dispatch(fetchUpdateUserAsync({ ...userDetails, Address: userData }));
    setOpenForm(0)
    reset();
  }
  function handleCancel() {
    setOpenForm(0);
    reset();
  }
  const status=useSelector(selectUserStatus)
  return (
    <>
  {status==='loading'?
  <div className="min-h-screen flex items-center justify-center">
  <RotatingTriangles
  visible={true}
  height="120"
  width="120"
  ariaLabel="rotating-triangels-loading"
  wrapperStyle={{}}
  wrapperClass="rotating-triangels-wrapper"
/>
  </div>
:
    <div className=" grid grid-cols-1 gap-x-4  gap-y-8 sm:grid-cols-5">
      <div className="sm:col-span-3">
        <h1 className=" text-3xl text-black">Your Profiles</h1>
        {userDetails
          ? userDetails.Address.map((address, index) => (
              <div className="mt-2 max-w-3xl sm:max-w-xl  sm:px-2 lg:px-2 bg-white">
                <h1 className="ml-2 mt-4 text-2xl text-blue-600">
                  Email: {address.email}
                </h1>
                <div className="baddress-t  baddress-gray-200 px-4 py-2 sm:px-6 text-base text-black">
                  <ul role="list" className="divide-y divide-gray-100">
                    <li
                      key={address.id}
                      className="mr-20 flex justify-between gap-x-6 py-5 baddress-solid baddress-2 p-2 "
                    >
                      <div className="flex min-w-0 gap-x-2">
                        <input
                          onClick={() => setProfile(index)}
                          id="address"
                          name="address"
                          type="radio"
                          className="h-4 w-4 border-gray-30"
                        />
                        <div className="h-4 w-4 baddress-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        <div className="min-w-0 inline flex-auto">
                          <p className="font-semibold leading-6">
                            {address.fullName}
                          </p>
                          <p className="mt-1 truncate  leading-5">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate  leading-5">
                            {address.city}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end ">
                        <p className="\leading-6">{address.phone}</p>

                        <p className="mt-1 leading-5">{address.postalCode}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          : null}
        <div className="mt-2 max-w-3xl px-4 sm:max-w-xl sm:px-6 lg:px-8 flex justify-end">
          <div className="inline-flex gap-8">
            <button
              onClick={() => setOpenForm(1)}
              className="mt-4 mx-auto flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Add
            </button>
            <button
              disabled={profile < 0 ? true : false}
              onClick={handleEdit}
              className="mt-4 mx-auto flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Edit
            </button>
            
            <button
              onClick={handleRemove}
              className="mt-4 mx-auto flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {openForm ? (
        <div className="sm:col-span-2 ml-10">
          <form
            className=" bg-white p-16 "
            noValidate
            onSubmit={handleSubmit((data) => handleSave(data))}
          >
            <div className="space-y-8">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>

                <div className=" mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("fullName", {
                          required: "Enter your name",
                        })}
                        id="fullName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.fullName && (
                    <p className=" text-red-500">{errors.fullName.message}</p>
                  )}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                            message: "Email not valid",
                          },
                        })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <p className=" text-red-500">{errors.email.message}</p>
                  )}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone No.
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "Phone no. is required",
                        })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className=" text-red-500">{errors.phone.message}</p>
                  )}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        {...register("country", {
                          required: "Enter country",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>India</option>
                      </select>
                    </div>
                  </div>
                  {errors.country && (
                    <p className=" text-red-500">{errors.country.message}</p>
                  )}
                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street", { required: "Enter street" })}
                        id="street"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.street && (
                    <p className=" text-red-500">{errors.street.message}</p>
                  )}
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", { required: "Enter city" })}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.city && (
                    <p className=" text-red-500">{errors.city.message}</p>
                  )}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state", { required: "Enter state" })}
                        id="state"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.state && (
                    <p className=" text-red-500">{errors.state.message}</p>
                  )}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("postalCode", {
                          required: "Enter Postal Code",
                        })}
                        id="postalCode"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.postCode && (
                    <p className=" text-red-500">{errors.postalCode.message}</p>
                  )}
                </div>
              </div>

              <div className="inline-flex gap-8 justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>}
    </>
  );
}

export default UserProfile;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import {
  increment,
  fetchUpdateCartAsync,
  fetchDeleteCartAsync,
  selectCartItems,
  selectcheckCart,
} from "../Cart/CartSlice";
import { selectLoggedInUser } from "../Auth/AuthSlice";
import { selectProduct } from "../Product/ProductSlice";
import { useForm } from "react-hook-form";
import { fetchCreateOrderAsync, selectCurrentOrder } from "../Order/OrderSlice";
import {
  fetchUserAsync,
  fetchUpdateUserAsync,
  selectUserDetails,
} from "../User/UserSlice";

import Modal from "../common/Modal";
function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const userDetails = useSelector(selectUserDetails);
  const currentOrder = useSelector(selectCurrentOrder);
  const checkCart=useSelector(selectcheckCart)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch]);
  function handleChange(e, item) {
    dispatch(fetchUpdateCartAsync({id:item.id,productId:item.productId.id,quantity:e.target.value }));
  }
  function handleRemove(id) {
    dispatch(fetchDeleteCartAsync(id));
  }
  const total = cartItems.reduce(
    (amount, Item) =>
      Item.productId.discountedPrice * Item.quantity + amount,
    0
  );
  const totalItems = cartItems.length;
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(-1);
  const [orderModal, setOrderModal] = useState(false);
  const [payment, setPayment] = useState("cash");
  const [address, setAddress] = useState(null);
  function handleAddress(add) {
    setAddress(add);
  }
  function handlePayment(pay) {
    setPayment(pay);
  }
  function handleOrder() {
    const orderedProducts=cartItems.map((item)=> { return {product:item.productId.id,quantity:item.quantity}})
    dispatch(
      fetchCreateOrderAsync({
        orderedProducts,
        paymentMethod:payment,
        paymentStatus:"Pending",
        deliveryAddress: address,
        totalItems,
        total,
        status: "Confirmed",
      })
    );
  }

  return (
    <>
      {
      checkCart?<div>

      {currentOrder && currentOrder.paymentMethod==='cash' &&(
        <Navigate
          to={`/OrderSuccess/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod==='card' &&(
        <Navigate
          to={`/StripeCheckout`}
          replace={true}
        ></Navigate>
      )}
      {cartItems.length < 1 && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className=" bg-white p-16 "
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  fetchUpdateUserAsync({
                    ...userDetails,
                    Address: [...userDetails.Address, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-8">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          id="fulllName"
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
                        htmlFor=""
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
                      <p className=" text-red-500">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </form>
            <div className="border-b border-gray-900/10 pb-12 bg-white px-16">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing Address
              </p>
              <ul role="list" className="divide-y divide-gray-100">
                {userDetails
                  ? userDetails.Address.map((address,index) => (
                      <li
                        key={address.Ph}
                        className="flex justify-between gap-x-6 py-5 border-solid border-2 p-2"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            onClick={() => handleAddress(address)}
                            id="address"
                            name="address"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 inline flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.fullName}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.city}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {address.phone}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            {address.postalCode}
                          </p>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        onClick={() => handlePayment("cash")}
                        name="payment"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked={payment === "cash"}
                      />
                      <label
                        htmlFor="payment"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        onClick={() => handlePayment("card")}
                        id="card"
                        name="payment"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked={payment === "card"}
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-2 lg:px-4 bg-white">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.length > 0 &&
                      cartItems.map((Item) => (
                        <li key={Item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={Item.productId.thumbnail}
                              alt={Item.productId.thumbnail}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <div>{Item.productId.title}</div>
                                <div>{Item.productId.brand}</div>

                                <p className="ml-4">{Item.productId.discountedPrice}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div>
                                <label
                                  htmlFor="quantity"
                                  className=" text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleChange(e, Item)}
                                  name="Qty"
                                  className="m-2 h-10 text-sm"
                                  value={Item.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                              <Modal
                                title="Remove Product"
                                message={`Are you sure you want to remove ${Item.productId.title} from cart`}
                                actionName="Remove"
                                action={() => handleRemove(Item.id)}
                                cancel={() => setOpenModal(-1)}
                                show={openModal === Item.id}
                                color={true}
                              ></Modal>
                              <div className="flex">
                                <button
                                  onClick={() => setOpenModal(Item.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{totalItems}</p>
                </div>
                <div className="mt-2 flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{total}</p>
                </div>
                <div className="mt-2 flex justify-between text-base font-medium text-gray-900">
                  <p>Shipping</p>
                  <p>50</p>
                </div>
                <div className="mt-2 flex justify-between text-base font-medium text-gray-900">
                  <p>Total Amount</p>
                  <p>{total + 50}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>

                <Modal
                  title="Confirm Order"
                  message={`you are placing order with ${cartItems.length} items`}
                  actionName="confirm"
                  action={handleOrder}
                  show={orderModal}
                  cancel={()=>setOrderModal(false)}
                  color={false}
                ></Modal>
                <button
                  onClick={()=>setOrderModal(true)}
                  className="mt-4 mx-auto flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </button>

                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>:null}
    </>
  );
}

export default Checkout;

import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { fetchOrderbyUserAsync, selectOrdersStatus, selectUserOrders } from "../Order/OrderSlice";
import { selectLoggedInUser } from "../Auth/AuthSlice";
import { RotatingTriangles } from "react-loader-spinner";
function UserOrders() {
  const Orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  useEffect(() => {
      dispatch(fetchOrderbyUserAsync());
  },[dispatch]);

  const status = useSelector(selectOrdersStatus)
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
    <div>
     {Orders.map((Order) => (
      <div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ">
          <div className="border-t  border-gray-200 px-4 py-2 sm:px-6 bg-white">
            <h1 className="mt-4 text-2xl"> Order #{Order.id}</h1>
            <h5 className="mt-4 text-2xl">Order Status: {Order.status}</h5>
            <div className="mt-2 flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {Order.orderedProducts.map((Item) => (
                  <li key={Order.id} className="flex py-6">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={Item.product.thumbnail}
                        alt={Item.product.thumbnail}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className=" block text-base font-medium text-gray-900">
                          <div>{Item.product.title}</div>
                          <div>{Item.product.brand}</div>
                          <div>{Item.product.discountedPrice}</div>
                          <div>Qty: {Item.quantity}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 mx-10 flex justify-between text-base font-medium text-gray-900">
              <p>Total Amount</p>
              <p>{Order.total}</p>
            </div>
            <div className="mt-2 mx-10 flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{Order.totalItems}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping Address
              </p>
              <ul role="list" className="mt-2 divide-y divide-gray-100">
                <li
                  key={Order.id}
                  className="flex justify-between gap-x-6 py-5 border-solid border-2 p-2"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <div className="min-w-0 inline flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {Order.deliveryAddress.fullName}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {Order.deliveryAddress.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {Order.deliveryAddress.city}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {Order.deliveryAddress.phone}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {Order.deliveryAddress.postalCode}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
     ))}
    </div>}
    </>
  );
}

export default UserOrders;

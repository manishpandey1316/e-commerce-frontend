import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  increment,
  fetchUpdateCartAsync,
  fetchDeleteCartAsync,
  selectCartItems,
} from "./CartSlice";
import { selectProduct } from "../Product/ProductSlice";

import Modal from "../common/Modal";
function Cart() {
 
  const cartItems = useSelector(selectCartItems);
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  function handleChange(e, item) {
    dispatch(fetchUpdateCartAsync({id:item.id,productId:item.productId.id,quantity:e.target.value }));
  }
  function handleRemove(id) {
    dispatch(fetchDeleteCartAsync(id));
  }
  const [openModal, setOpenModal] = useState(-1);
  const total = cartItems.reduce(
    (amount, Item) =>
    Item.productId.discountedPrice* Item.quantity + amount,
    0
  );
  const [open, setOpen] = useState(true);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8  bg-white ">
      <div className="border-t my-10 border-gray-200 px-4 py-6 sm:px-6">
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
                        <Link to={`/Details/:${product.id}`}>
                          <div>{Item.productId.title}</div>
                          <div>{Item.productId.brand}</div>
                        </Link>
                        <p className="ml-4">{ Item.productId.discountedPrice}</p>
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
                          className="ml-2"
                          value={Item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="flex">
                        <Modal
                          title="Remove Product"
                          message={`Are you sure you want to remove ${Item.productId.title} from cart`}
                          actionName="Remove"
                          action={() => handleRemove(Item.id)}
                          show={openModal===Item.id}
                          cancel={()=>setOpenModal(-1)}
                          color={true}
                        ></Modal>

                        <button
                          onClick={() => setOpenModal(Item.id)}
                          type="button"
                          className=" font-medium text-indigo-600 hover:text-indigo-500"
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
          <p>Subtotal</p>
          <p>{total}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/Checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
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
  );
}

export default Cart;

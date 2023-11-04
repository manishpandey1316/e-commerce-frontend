import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  fetchUpdateProductAsync,
  fetchProductByFilterAsync,
  fetchCategoriesAsync,
  fetchBrandsAsync,
  selectProduct,
  selectTotal,
  selectCategories,
  selectBrands,
} from "../Product/ProductSlice";
import { Link } from "react-router-dom";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {  LIMIT_PER_PAGE_PRODUCTS } from "../../app/Constants";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import Modal from "../common/Modal";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Best Rating", _sort: "rating", _order: "asc" },
  { name: "Price: Low to High", _sort: "discountedPrice", _order: "asc" },
  { name: "Price: High to Low", _sort: "discountedPrice", _order: "desc" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function AdminPanel() {
  const products = useSelector(selectProduct);
  const total = useSelector(selectTotal);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  const [FilterVal, setFilterVal] = useState({});
  const [Sort, setSort] = useState({});
  const [Page, setPage] = useState(1);

  useEffect(() => {
    const Pagination = { _page: Page, _limit: LIMIT_PER_PAGE_PRODUCTS };
    dispatch(fetchProductByFilterAsync({ FilterVal, Sort, Pagination }));
  }, [dispatch, FilterVal, Sort, Page]);

  useEffect(() => {
    setPage(1);
  }, [total, FilterVal, Sort]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
  }, [dispatch]);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "brand",
      options: brands,
    },
  ];
  return (
    <>
      <Filter
        products={products}
        filters={filters}
        FilterVal={FilterVal}
        setFilterVal={setFilterVal}
        Sort={Sort}
        setSort={setSort}
        Page={Page}
        setPage={setPage}
        total={total}
        dispatch={dispatch}
      ></Filter>
    </>
  );
}

function Filter({
  products,
  filters,
  FilterVal,
  setFilterVal,
  Sort,
  setSort,
  Page,
  setPage,
  total,
  dispatch,
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const handleFilter = (e, option, section) => {
    const newFilter = { ...FilterVal };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const newFilterIndex = newFilter[section.id].findIndex(
        (c) => c == option.value
      );
      newFilter[section.id].splice(newFilterIndex, 1);
    }
    setFilterVal(newFilter);
  };
  const handleSort = (e, option) => {
    const newSort = { ...Sort, _sort: option._sort, _order: option._order };
    setSort(newSort);
  };
  return (
    <div className="bg-white m-12">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200 cursor-pointer">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      checked={FilterVal[section.id] && (FilterVal[section.id].findIndex((val)=>val===option.value)>-1)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onClick={(e) =>
                                        handleFilter(e, option, section)
                                      }
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <div
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={(e) => handleSort(e, option)}
                            >
                              {option.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onClick={(e) =>
                                    handleFilter(e, option, section)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductList
                  products={products}
                  dispatch={dispatch}
                ></ProductList>
              </div>
            </div>
          </section>
          {/* pagination */}
          <Pagination Page={Page} setPage={setPage} total={total}></Pagination>
        </main>
      </div>
    </div>
  );
}
function ProductList({ products, dispatch }) {
  const [openModal,setOpenModal]=useState(-1)
  function handleRemove(product) {
    dispatch(fetchUpdateProductAsync({ ...product, status: "deleted" }));
  }
  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-8 ">
        <Link to="/Admin/Products">
          <button className=" rounded-md border border-transparent bg-indigo-600 px-2 py-2  text-white shadow-sm  hover:bg-indigo-700">
            Add Product
          </button>
        </Link>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className=" relative border-solid border-2 border-gray p-3 "
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.description}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between ">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </h3>
                </div>

                <p className="text-sm font-medium text-gray-500 line-through">
                  {product.price}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="inline-flex">
                  <StarIcon className="h-5 w-5"></StarIcon>
                  <p className=" ml-1 mt-1 text-sm text-gray-500">
                    {product.rating}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900 ">
                  {product.price.discountedPrice}
                </p>
              </div>
              <p className="text-base font-medium text-blue-500">
                {product.status}
              </p>
              {product.stock <= 0 && (
                <p className="text-base font-medium text-blue-500">
                  Out of stock
                </p>
              )}
              <div className="relative mt-4 ml-4 max-w-sm  flex justify-between ">
                <div className="inline-flex gap-10">
                  <Link to={`/Admin/Products/${product.id}`}>
                    <button className="rounded-md border border-transparent  bg-indigo-600 px-2 py-2  text-white shadow-sm  hover:bg-indigo-700">
                      Edit
                    </button>
                  </Link>
                  <Modal
                    title="Remove Product"
                    message={`Are you sure you want to remove ${product.title} from cart`}
                    actionName="Remove"
                    action={() => handleRemove(product)}
                    show={openModal === product.id}
                    cancel={() => setOpenModal(-1)}
                    color={true}
                  ></Modal>
                  <button
                    onClick={() => setOpenModal(product.id)}
                    className="rounded-md border border-transparent bg-indigo-600 px-2 py-2   text-white shadow-sm hover:bg-indigo-700 "
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function Pagination({ Page, setPage, total }) {
  const handlePage = (page) => {

    setPage(page);
  };
  const totalPage = total / LIMIT_PER_PAGE_PRODUCTS;
  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 cursor-pointer">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={(e) => (Page > 0 ? handlePage(Page - 1) : null)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <div
            onClick={(e) => (Page < totalPage ? handlePage(Page + 1) : null)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(Page - 1) * LIMIT_PER_PAGE_PRODUCTS + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Page * LIMIT_PER_PAGE_PRODUCTS > total
                  ? total
                  : Page * LIMIT_PER_PAGE_PRODUCTS}
              </span>{" "}
              of <span className="font-medium">{total}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={(e) => (Page > 1 ? handlePage(Page - 1) : null)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>

              {Array.from({ length: Math.ceil(totalPage) }).map((el, index) => (
                <div
                  onClick={(e) => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center ${
                    Page === index + 1 ? " bg-blue-600" : " bg-white"
                  } text-blue-700 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              ))}

              <div
                onClick={(e) =>
                  Page < totalPage ? handlePage(Page + 1) : null
                }
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminPanel;
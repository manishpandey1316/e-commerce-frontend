import { ArrowDownIcon, ArrowUpIcon, PencilIcon } from "@heroicons/react/24/outline";
import{
ChevronLeftIcon,
ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersAsync,
  fetchOrdersByFilterAsync,
  fetchUpdateOrderAsync,
  selectOrders,
  selectOrdersCount,
} from "../Order/OrderSlice";
import { useEffect, useState } from "react";
import { LIMIT_PER_PAGE_ORDERS} from "../../app/Constants";

function AdminOrders() {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);

  const [select, setSelect] = useState(-1);

  function handleChange(e, index) {
    const product=orders[index].orderedProducts.map((prod)=>{return {product:prod.product.id,quantity:prod.quantity,_id:prod._id}})
    const orderData = { ...orders[index],orderedProducts:product,[e.target.name]:e.target.value };

    dispatch(fetchUpdateOrderAsync(orderData));
    setSelect(-1);
  }
  function colorOrderStatus(order) {
    if (order.status === "Pending") {
      return "bg-yellow-300 text-blue-600";
    } else if (order.status === "Confirmed") {
      return "bg-pink-400 text-blue-600";
    } else if (order.status === "Dispatched") {
      return "bg-green-300 text-blue-600";
    } else if (order.status === "Delivered") {
      return "bg-green-700 text-blue-600";
    } else if (order.status === "Cancelled") {
      return "bg-red-600 text-blue-600";
    }
    
  }

  function colorPaymentStatus(order)
  {
    if (order.paymentStatus ==="Pending") {
      return "bg-yellow-300 text-blue-600";
    }
    else if (order.paymentStatus ==="Received") {
      return "bg-green-300 text-blue-600";
    }
    else if (order.paymentStatus ==="Refunded") {
      return "bg-red-600 text-blue-600";
    }
  }
  const [Page, setPage] = useState(1);
  const [Sort,setSort]=useState({})
  const total=useSelector(selectOrdersCount)
  useEffect(() => {
    const Pagination = { _page: Page, _limit: LIMIT_PER_PAGE_ORDERS };
    dispatch(fetchOrdersByFilterAsync({Pagination,Sort}));
  }, [dispatch,Page,Sort]);

useEffect(()=>
{setPage(1)
},[total,Sort])

  return (
    <>
      {orders && (
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-2  bg-white ">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full max-w-full ">
              <thead>
                <tr>
                  <th 
                  onClick={()=>(Sort && Sort._order==="asc")?setSort({_sort:"id",_order:"desc"}):setSort({_sort:"id",_order:"asc"})}
                  className="px-2 py-3 border-b-2 border-gray-20 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   {Sort && Sort._sort==="id" && (Sort._order==="asc"?<ArrowUpIcon className="h-4 inline mr-2"></ArrowUpIcon>:<ArrowDownIcon className="h-4 inline mr-2"></ArrowDownIcon>)}
                    Order#
                  </th>
                  <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-300  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    products
                  </th>
                  <th 
                  onClick={()=>(Sort && Sort._order==="asc")?setSort({_sort:"total",_order:"desc"}):setSort({_sort:"total",_order:"asc"})}
                  className="px-2 py-3 border-b-2 border-gray-20 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   {Sort && Sort._sort==="total" && (Sort._order==="asc"?<ArrowUpIcon className="h-4 inline mr-2"></ArrowUpIcon>:<ArrowDownIcon className="h-4 inline mr-2"></ArrowDownIcon>)}
                    Total Price
                  </th>
                  <th className="px-2 py-3 border-b-2 border-gray-200  bg-gray-300  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delivery Address
                  </th>
                  <th className="px-2 py-3 border-b-2 border-gray-200  bg-gray-300  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="px-2 py-3 border-b-2 border-gray-200  bg-gray-300  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th 
                    onClick={()=>(Sort && Sort._order==="asc")?setSort({_sort:"createdAt",_order:"desc"}):setSort({_sort:"createdAt",_order:"asc"})}
                  className="px-2 py-3 border-b-2 border-gray-200 bg-gray-300  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {Sort && Sort._sort==="createdAt" && (Sort._order==="asc"?<ArrowUpIcon className="h-4 inline mr-2"></ArrowUpIcon>:<ArrowDownIcon className="h-4 inline mr-2"></ArrowDownIcon>)}
                    Order At
                  </th>
                  <th
                   onClick={()=>(Sort && Sort._order==="asc")?setSort({_sort:"updatedAt",_order:"desc"}):setSort({_sort:"updatedAt",_order:"asc"})}
                   className="px-2 py-3 border-b-2 border-gray-200 bg-gray-300  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                     {Sort && Sort._sort==="updatedAt" && (Sort._order==="asc"?<ArrowUpIcon className="h-4 inline mr-2"></ArrowUpIcon>:<ArrowDownIcon className="h-4 inline mr-2"></ArrowDownIcon>)}
                    Updated At
                  </th>
                  <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-300  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.id}
                      </p>
                    </td>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                      {order.orderedProducts.map((Item) => (
                        <p className="text-gray-900 whitespace-no-wrap">
                          {Item.product.title}-
                          {Item.product.discountedPrice}-
                          {Item.product.quantity}
                        </p>
                      ))}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.total}
                      </p>
                    </td>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.deliveryAddress.fullName}
                      </p>
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.deliveryAddress.state}
                      </p>
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.deliveryAddress.country}
                      </p>
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.deliveryAddress.phone}
                      </p>
                    </td>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight">
                        <select
                          onChange={(e) => handleChange(e, index)}
                          defaultValue={order.status}
                          disabled={select !== index}
                          id="status"
                          name="status"
                          className={`block w-full ${
                            select !== index ? colorOrderStatus(order) : null
                          } rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </span>
                    </td>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight">
                        <select
                          onChange={(e) => handleChange(e, index)}
                          defaultValue={order.paymentStatus}
                          disabled={select !== index}
                          id="paymentStatus"
                          name="paymentStatus"
                          className={`block w-full ${
                            select !== index ? colorPaymentStatus(order) : null
                          } rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Received">Received</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </span>
                    </td>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.createdAt?new Date(order.createdAt).toLocaleString():null}
                      </p>
                    </td>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.updatedAt?new Date(order.updatedAt).toLocaleString():null}
                      </p>
                    </td>
                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                      <PencilIcon
                        className="h-10 cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        onClick={() => {
                          setSelect(index);
                        }}
                      ></PencilIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <Pagination
                Page={Page}
                setPage={setPage}
                total={total}
              ></Pagination>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function Pagination({ Page, setPage, total }) {
  const handlePage = (page) => {

    setPage(page);
  };
  const totalPage = total / LIMIT_PER_PAGE_ORDERS
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
                {(Page - 1) * LIMIT_PER_PAGE_ORDERS + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Page * LIMIT_PER_PAGE_ORDERS > total ? total : Page * LIMIT_PER_PAGE_ORDERS}
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
                className="ml-6 relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
export default AdminOrders;

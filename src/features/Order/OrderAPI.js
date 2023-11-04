// A mock function to mimic making an async request for data
export function fetchCreateOrder(orderData) {
  return new Promise(async (resolve) =>
   {

    const response = await fetch('/orders',{
    method:"POST",
    body: JSON.stringify(orderData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()

 
   resolve({data})}
  );
}
export function fetchUpdateOrder(orderData) {
  return new Promise(async (resolve) =>
   {const response = await fetch(`/orders/${orderData.id}`,{
    method:"PATCH",
    body: JSON.stringify(orderData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()
   resolve({data})}
  );
}

export function fetchOrderbyUser() {
  return new Promise(async (resolve) =>
   {const response = await fetch(`/orders`)
   const data = await response.json()
   resolve({data})}
  );
}

export function fetchOrdersByFilter({Pagination,Sort}) {
  var query='?'

 for (const key in Sort)
  {query+=`${key}=${Sort[key]}&`}
 
  for (const key in Pagination)
  {query+=`${key}=${Pagination[key]}&`}
   return new Promise(async (resolve) =>
    {const response = await fetch(`/orders/all${query}`)
    const data = await response.json()
    const totalCount =  response.headers.get('X-Total-Count')
    resolve({data:{Orders:data,totalCount:totalCount}})}
   );
 }


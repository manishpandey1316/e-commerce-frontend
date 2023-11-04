// A mock function to mimic making an async request for data
export function fetchProduct() {
  return new Promise(async (resolve) =>
   {const response = await fetch('/products')
   const data = await response.json()
   resolve({data})}
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>
   {
    const response = await fetch(`/products/${id}`)
   const data = await response.json()
   resolve({data})}
  );
}

export function fetchProductByFilter({FilterVal,Sort,Pagination}) {
 var query='?'
 for (const key in FilterVal){
     for (const k of FilterVal[key])
     {
        query+=`${key}=${k}&`
     }
 }
for (const key in Sort)
 {query+=`${key}=${Sort[key]}&`}

 for (const key in Pagination)
 {query+=`${key}=${Pagination[key]}&`}
  return new Promise(async (resolve) =>
   {const response = await fetch(`/products${query}`)
   const data = await response.json()
   const totalCount =  response.headers.get('X-Total-Count')
   resolve({data:{products:data,totalCount:totalCount}})}
  );
}

export function fetchUpdateProduct(productData) {
  return new Promise(async (resolve) =>
  {
    const response = await fetch(`/products/${productData.id}`,{
    method:"PATCH",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()

   resolve({data})}
  );
}
export function fetchCreateProduct(productData) {
  return new Promise(async (resolve) =>
  {
    const response = await fetch(`/products`,{
    method:"POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()

   resolve({data})}
  );
}
export function fetchCategories() {
  return new Promise(async (resolve) =>
   {const response = await fetch('/categories')
   const data = await response.json()
   resolve({data})}
  );
}

export function fetchBrands()
{
   return new Promise(async (resolve)=>
   {
       const response = await fetch('/brands')
       const data = await response.json()
       resolve({data})
   });
}


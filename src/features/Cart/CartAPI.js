export function fetchCreateCart(cartData) {
  return new Promise(async (resolve) =>
   {const response = await fetch('/carts',{
    method:"POST",
    body: JSON.stringify(cartData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()
   resolve({data})}
  );
}
export function fetchCart() {
  return new Promise(async (resolve) =>
   {const response = await fetch(`/carts`)
   const data = await response.json()
   resolve({data})}
  );
}
export function fetchUpdateCart(cartData) {
  return new Promise(async (resolve) =>
 
   { 
    const response = await fetch(`/carts/${cartData.id}`,{
    method:"PATCH",
    body: JSON.stringify(cartData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()
   resolve({data})}
  );
}
export function fetchDeleteCart(id) {
  return new Promise(async (resolve) =>
   {const response = await fetch(`/carts/${id}`,{
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()
   resolve({data})}
  );
}

export function fetchResetCart() {
  return new Promise(async (resolve) =>
   {
      const res = await fetchCart()
      const cartItems = res.data

      for (const item of cartItems)
      {
         await fetchDeleteCart(item.id)
      }
   resolve({status:"successfully reset"})}
  );
}
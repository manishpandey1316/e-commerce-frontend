export function fetchUpdateUser(userData) {
  return new Promise(async (resolve) =>
   {const response = await fetch(`/users`,{
    method:"PATCH",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()
   resolve({data})}
  );
}
export function fetchUser() {
  return new Promise(async (resolve,reject) =>
   {const response = await fetch(`/users`)
   const data = await response.json()
    resolve({data})
  }
  );
}



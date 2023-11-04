import { isRejectedWithValue } from "@reduxjs/toolkit";

// A mock function to mimic making an async request for data
export function fetchCreateUser(userData) {
  return new Promise(async (resolve) =>
   {const response = await fetch('/auth/signup',{
    method:"POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   const data = await response.json()
   resolve({data})}
  );
}


export function fetchloginUser(userData) {
  return new Promise(async (resolve,reject) =>
   {
    try{
    const response = await fetch(`/auth/login`,
   {
    method:"POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    }
   })
   

   if(response.ok)
   {
    const data = await response.json()
        resolve({data})
   }
   else
   {const error = await response.json()
    reject(error)}
  }
  catch(error)
  {
    reject(error)
  }
}
  );

}

export function fetchSignOutUser() {
  return new Promise(async (resolve,reject) =>
   {
    const response = await fetch(`/auth/logout`)
      if(response.ok)
     {resolve({message:"success"})}
     else
     {
       reject()
     }
});}

export function fetchcheckUser() {
  return new Promise(async (resolve,reject) =>
   { 
   
    const response = await fetch(`/auth/check`)
    

    if(response.ok)
    {
     const data = await response.json()
         resolve({data})
    }
    else
    {
     reject()
    }
   }
 
 
   );
 
 }
 
 export function fetchresetPasswordRequest(data) {
  return new Promise(async (resolve,reject) =>
   { 
   
    const response = await fetch(`/auth/reset-password-request`, {
      method:"POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",}
      })
    

    if(response.ok)
    {
     const data = await response.json()
         resolve({data})
    }
    else
    {
      const error = await response.json()
      reject(error)
    }
   }
 
 
   );
 
 }
 
 export function fetchresetPasswordConfirm(data) {
  return new Promise(async (resolve,reject) =>
   { 
   
    const response = await fetch(`/auth/reset-password-confirm`, {
      method:"POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",}
      })
    

    if(response.ok)
    {
     const data = await response.json()
         resolve({data})
    }
    else
    {
      const error = await response.json()
      reject(error)
    }
   }
 
 
   );
 
 }
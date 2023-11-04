import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  fetchCreateUserAsync,
  selectLoggedInUser,
} from './AuthSlice';
import { Link,Navigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
 function Signup(){
  
  const userId = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();
   
  const {register,handleSubmit,watch,formState:{errors}} = useForm()
  
      return (
        <>
        {(userId && userId.role==="admin")?<Navigate to="/Admin"></Navigate>:null}
        {(userId)?<Navigate to="/"></Navigate>:null}
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         <img
           className="mx-auto h-14 w-14"
           src="logo.png"
           alt="Your Company"
         />
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Sign in to your account
         </h2>
       </div>

       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form className="space-y-6" noValidate onSubmit={handleSubmit((data)=>
         {
               dispatch(fetchCreateUserAsync({email:data.email,password:data.password,Address:[],role:"user"}))
         })}>
           <div>
             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
               Email address
             </label>
             <div className="mt-2">
               <input
                 id="email"
                 {...register("email",{required:"Email is required",pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,message:"Email not valid"}})}
                 type="email"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>
           {errors.email && <p className=' text-red-500'>{errors.email.message}</p>}
           <div className="flex items-center justify-between">
               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
               </label>
            
             </div>
             <div className="mt-2">
               <input
                 id="password"
                 type="password"
                 {...register("password",{required:"Password required",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,message:`- at least 8 characters
- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
- Can contain special characters`}})}
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
             {errors.password && <p className=' text-red-500'>{errors.password.message}</p>}
           <div>
           
             <div className="flex items-center justify-between">
               <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                 Confirm Password
               </label>
               
               <div className="text-sm">
                 <Link  to="/Forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                   Forgot password?
                 </Link>
               </div>
             </div>
             <div className="mt-2">
               <input
                 id="confirmPassword"
                 
                 {...register("confirmPassword",{required:"Password is required",validate:(value,formValues)=>value===formValues.password || "Password not matching"})}
                 type="password"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>             
           </div>
           {errors.confirmPassword && <p className=' text-red-500'>{errors.confirmPassword.message}</p>}
           <div>
             <button
               type="submit"
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Sign up
             </button>
           </div>
         </form>

         <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
           <Link to="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Login
           </Link>
         </p>
       </div>
     </div>
      </>
      )
    }

    export default Signup
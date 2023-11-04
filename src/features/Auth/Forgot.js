import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,Navigate} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { fetchresetPasswordRequestAsync, selectresetReqStatus } from './AuthSlice';

 function Forgot(){
  const dispatch=useDispatch()
  const resetReqStatus=useSelector(selectresetReqStatus)
    const {register,handleSubmit,watch,formState:{errors}} = useForm()
      return (
       <>
         <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-14"
            src="logo.png"
            alt="Your Company"
          />
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            FORGOT PASSWORD
          </h1>
          <h3 className="mt-10 text-center text-lg  leading-9 tracking-tight text-gray-950">
            Enter your mail we'll send you an invite to reset your password
          </h3>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6"onSubmit={handleSubmit((data)=>
         {
                dispatch(fetchresetPasswordRequestAsync(data))
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
           {resetReqStatus && <p className=' text-green-500'>{resetReqStatus.message}</p>}
          
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Go to Login?{' '}
            <Link to="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              login
              </Link>
          </p>
        </div>
      </div>
       </>
      )
    }

    export default Forgot
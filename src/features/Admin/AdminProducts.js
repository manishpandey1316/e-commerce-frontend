import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, Navigate, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../Auth/AuthSlice";
import { fetchBrandsAsync, fetchCategoriesAsync, fetchCreateProductAsync, fetchProductByIdAsync, fetchUpdateProductAsync, resetSelectedProduct, selectBrands, selectCategories, selectProduct, selectSelectedProduct } from "../Product/ProductSlice";
import { useForm } from "react-hook-form";
import { fetchProductById } from "../Product/ProductAPI";
function AdminProducts() {

const brands=useSelector(selectBrands)
const category=useSelector(selectCategories)
const dispatch = useDispatch();
const {id} =  useParams()
const selectedProduct=useSelector(selectSelectedProduct)
const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
} = useForm();
useEffect(()=>
{
   dispatch(fetchBrandsAsync())
   dispatch(fetchCategoriesAsync())
},[dispatch])

useEffect(()=>
{  if(id)
    {
      dispatch(fetchProductByIdAsync(id))     
    }
    else{
       dispatch(resetSelectedProduct())
    }
},[dispatch])

useEffect(()=>
{
  if(id && selectedProduct)
  {
        setValue("title",selectedProduct.title)
        setValue("description",selectedProduct.description)
        setValue("price",selectedProduct.price)
        setValue("discountPercentage",selectedProduct.discountPercentage)
        setValue("stock",selectedProduct.stock)
        setValue("brand",selectedProduct.brand)
        setValue("category",selectedProduct.category)
        setValue("thumbnail",selectedProduct.thumbnail)
        setValue("image1",selectedProduct.images[0])
        setValue("image2",selectedProduct.images[1])
        setValue("image3",selectedProduct.images[2])
  }  
},[selectedProduct])
  
 function handleSave(data)
 {
     const newData={...data,price:+data.price,discountPercentage:+data.discountPercentage,
      stock:+data.stock,images:[data.image1,data.image2,data.image3]}
     delete newData["image1"]
     delete newData["image2"]
     delete newData["image3"]
     if(id)
     {
      newData["rating"]=selectedProduct.rating;
       newData["id"]=selectedProduct.id
  
       dispatch(fetchUpdateProductAsync(newData))
     }
     else
     {
      newData["rating"]=0;
       dispatch(fetchCreateProductAsync(newData))
     }
    
 }

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="lg:col-span-3">
          <form
            className=" bg-white p-16 "
            noValidate
            onSubmit={handleSubmit((data) => handleSave(data)
            )}
          >
            <div className="space-y-8">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className=" text-xl font-semibold leading-7 text-gray-900">
                  Product Information
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("title", {
                          required: "Enter Product Name",
                        })}
                        id="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.title && (
                    <p className=" text-red-500">{errors.title.message}</p>
                  )}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product Description
                    </label>
                    <div className="mt-2">
                      <input
                        id="description"
                        {...register("description", {
                          required: "Product's description is required"  
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.description && (
                    <p className=" text-red-500">{errors.description.message}</p>
                  )}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        id="price"
                        {...register("price", {min:{value:0,message:"Price should be greater than 0"},
                          max:{value:10000,message:"Price should be less than 1000"},
                          required: "Price is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.price && (
                    <p className=" text-red-500">{errors.price.message}</p>
                  )}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="discountPercentage"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Discount Percentage
                    </label>
                    <div className="mt-2">
                      <input
                        id="discountPercentage"
                        {...register("discountPercentage", {min:{value:0,message:"Discount should be greater than 0"},
                          max:{value:100,message:"Discount should be less than 100"},
                          required: "Discount is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.discountedPercentage && (
                    <p className=" text-red-500">{errors.discountedPercentage.message}</p>
                  )}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                     Brand
                    </label>
                    <div className="mt-2">
                      <select
                        id="brand"
                        {...register("brand", {
                          required: "Select Brand",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                       {brands.map((brand)=>
                       (
                        <option value={brand.value} className="p-2">{brand.label}</option>
                       ))}
                      </select>
                    </div>
                  </div>
                  {errors.brand && (
                    <p className=" text-red-500">{errors.brand.message}</p>
                  )}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                     Category
                    </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        {...register("category", {
                          required: "Select category",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                       {category.map((cat)=>
                       (
                        <option value={cat.value} className="p-2">{cat.label}</option>
                       ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Stock
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("stock", {min:{value:0,message:"Stock should be greater than 0"}, required: "Enter stock" })}
                        id="stock"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.stock && (
                    <p className=" text-red-500">{errors.stock.message}</p>
                  )}
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="thumbnail"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Thumbnail
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("thumbnail", { required: "Add thumbnail link" })}
                        id="thumbnail"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {errors.thumbnail && (
                    <p className=" text-red-500">{errors.thumbnail.message}</p>
                  )}
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="image1"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image 1
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("image1")}
                        id="image1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                 
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="image2"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image 2
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("image2")}
                        id="image2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                 
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="image3"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      image 3
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("image3")}
                        id="image3"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                
                </div>
              </div>
              <div className="mt-2 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="h-10 w-20 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save  
                </button>
              </div>
            </div>
          </form>         
        </div>
      </div>
    </>
  );
}

export default AdminProducts;

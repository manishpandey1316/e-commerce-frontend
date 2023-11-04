import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import DetailsPage from "./Pages/DetailsPage";
import Protector from "./features/Protector";
import Error404 from "./Pages/Error404";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAsync } from "./features/Cart/CartSlice";
import { fetchcheckUserAsync, selectLoggedInUser } from "./features/Auth/AuthSlice";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import UserOrdersPage from "./Pages/UserOrdersPage";
import LogOut from "./features/LogOut";
import UserProfilePage from "./Pages/UserProfilePage";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminPanelPage from "./Pages/AdminPanelPage";
import AdminProtector from "./features/AdminProtector";
import AdminOrdersPage from "./Pages/AdminOrdersPage"
import AdminProductsPage from "./Pages/AdminProductsPage";
import StripeCheckoutPage from "./Pages/StripeCheckoutPage";
import { selectcheckUser } from "./features/Auth/AuthSlice";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
function App() {
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_LEFT
  };
  
  const dispatch = useDispatch();
  const userId = useSelector(selectLoggedInUser);
  const checkUser=useSelector(selectcheckUser)
  useEffect(()=>
  {
     dispatch(fetchcheckUserAsync())
  },[dispatch])
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartAsync());
    }
  }, [dispatch, userId]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
       
          <Home />
        
      ),
    },
    {
      path: "/Login",
      element: <LoginPage />,
    },
    {
      path: "/Signup",
      element: <SignupPage />,
    },
    {
      path: "/Cart",
      element: (
        <Protector>
          <CartPage />
        </Protector>
      ),
    },
    {
      path: "/Checkout",
      element: (
        <Protector>
          <CheckoutPage />,
        </Protector>
      ),
    },
    {
      path: "/Details/:id",
      element: (
       
          <DetailsPage />
        
      ),
    },
    {
      path: "/OrderSuccess/:id",
      element: <OrderSuccessPage></OrderSuccessPage>,
    },
    {
      path: "/UserOrders",
      element: (
        <Protector>
          <UserOrdersPage></UserOrdersPage>
        </Protector>
      ),
    },
    {
      path: "/UserProfile",
      element: (
        <Protector>
          <UserProfilePage></UserProfilePage>
        </Protector>
      ),
    },
    {
      path: "/LogOut",
      element: (
        <Protector>
           <LogOut></LogOut>
        </Protector>
      ),
    },
    {
      path: "/Forgot",
      element: (
       <ForgotPassword></ForgotPassword>
      ),
    },
    {
      path: "/ResetPassword",
      element: (
       <ResetPasswordPage></ResetPasswordPage>
      ),
    },
    {
      path: "/Admin",
      element: (
        <AdminProtector>
          <AdminPanelPage></AdminPanelPage>
        </AdminProtector>       
      ),
    }, {
      path: "/Admin/Products/:id",
      element: (
        <AdminProtector>
          <AdminProductsPage></AdminProductsPage>
        </AdminProtector>       
      ),
    },
    {
      path: "/Admin/Products",
      element: (
        <AdminProtector>
          <AdminProductsPage></AdminProductsPage>
        </AdminProtector>       
      ),
    },
    {
      path: "/Admin/Orders",
      element: (
        <AdminProtector>
          <AdminOrdersPage></AdminOrdersPage>
        </AdminProtector>       
      ),
    },
    {
      path: "/StripeCheckout",
      element: (
        <Protector>
          <StripeCheckoutPage></StripeCheckoutPage>
        </Protector>     
      ),
    },
    {
      path: "*",
      element: <Error404></Error404>,
    },
  ]);

  return (
    <>
      { checkUser &&
        <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
   }
    </>
  );
}

export default App;

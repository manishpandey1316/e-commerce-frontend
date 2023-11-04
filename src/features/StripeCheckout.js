import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeCheckoutForm from "./StripeCheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "./Order/OrderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NyuMFSFYreV5sbfZ8TfPIX11iqTDVSfhdtSI2wUoNFIi3kbpT7EaiTnULVUZVpCroIQ2uan8Pj3yeV6NIKDwHaE002si9zq7J");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
const currentOrder=useSelector(selectCurrentOrder)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total:currentOrder.total,orderId:currentOrder.id }),
     
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
   
  );
}
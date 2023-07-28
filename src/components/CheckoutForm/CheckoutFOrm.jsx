import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ totalPrice, handleCheckout, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        console.log(clientSecret);
        // Call the handleCheckout function passed as a prop from CartPage
        await handleCheckout();

        const response = await axios.post(
          /*set HTTPS=true&&*/
          "http://localhost:5005/payments/payment",
          {
            id,
            amount: totalPrice * 100,
            client_secret: clientSecret,
          }
        );

        if (response.data.success) {
          console.log("Payment successful");
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... Your payment form elements */}
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
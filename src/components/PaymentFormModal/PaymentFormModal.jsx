import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutFrom";


const stripePromise = loadStripe(
  "pk_test_51NRxMIAJ0RHQyfziSQFiiswOORe2ztGLwkPBLRjk5JezRTwYfqJ4VQ5D3ZzF5qw58O4M2KflSYTmdelmUVJEsWSJ00sshA570x"
);

const PaymentFormModal = ({ totalPrice, onClose }) => {
  return (
    <div className="payment-form-modal">
      <div className="payment-form">
        <Elements stripe={stripePromise}>
          <CheckoutForm totalPrice={totalPrice} />
        </Elements>
      </div>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default PaymentFormModal;

import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CartContext from "../../components/cartContext";
import ShopHeader from "../../components/shopHeader/shopHeader";
import CheckoutForm from "../Payment/checkoutForm";

function CartPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch("http://localhost:5005/api/cart");
        const data = await res.json();
        console.log("Received cart items:", data);
        setCartItems(data);
        localStorage.setItem("cartItems", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      fetchCartItems();
    }
  }, [setCartItems]);

  const handleRemoveFromCart = async (productId) => {
    try {
      const itemIndex = cartItems.findIndex(
        (item) => item.productId === productId
      );
      if (itemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[itemIndex].quantity > 1) {
          updatedCartItems[itemIndex].quantity -= 1;
        } else {
          updatedCartItems.splice(itemIndex, 1);
        }
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = (productId, event) => {
    const quantity = parseInt(event.target.value);
    if (!isNaN(quantity) && quantity >= 0) {
      const updatedCartItems = [...cartItems];
      const itemIndex = updatedCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (itemIndex !== -1) {
        updatedCartItems[itemIndex].quantity = quantity;
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5005/payments/payment/intent",
        {
          amount: totalPrice * 100,
        }
      );
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const response = await axios.post(
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
    <div>
      <ShopHeader title="Shop Page" />
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id}>
              <img src={item.image} alt={item.name} />
              <h3>Name: {item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <label>
                Quantity:
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(event) =>
                    handleQuantityChange(item.productId, event)
                  }
                />
              </label>
              <button
                className="bg-lime-800 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRemoveFromCart(item.productId)}
              >
                Remove from Cart
              </button>
            </div>
          ))}
          <p>Total Price: ${totalPrice}</p>
          <form onSubmit={handleSubmit}>
  <CheckoutForm totalPrice={totalPrice} clientSecret={clientSecret} />
  <button type="submit" disabled={!stripe}>
    Pay
  </button>
</form>
        </div>
      )}
    </div>
  );
}

export default CartPage;

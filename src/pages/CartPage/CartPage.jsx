import React, { useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartContext from "../../components/cartContext";
import ShopHeader from "../../components/shopHeader/shopHeader";

function CartPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const stripePromise = loadStripe("pk_test_51NRxMIAJ0RHQyfziSQFiiswOORe2ztGLwkPBLRjk5JezRTwYfqJ4VQ5D3ZzF5qw58O4M2KflSYTmdelmUVJEsWSJ00sshA570x");
  console.log(process.env.REACT_APP_STRIPE_API_KEY);

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
      const itemIndex = cartItems.findIndex((item) => item.productId === productId);
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
      const itemIndex = updatedCartItems.findIndex((item) => item.productId === productId);
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

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Error creating token:", error);
      return;
    }

    try {
      const res = await fetch("http://localhost:5005/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token.id, amount: totalPrice }),
      });

      if (res.ok) {
        console.log("Payment successful");
      } else {
        console.error("Payment failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
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
                  onChange={(event) => handleQuantityChange(item.productId, event)}
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
          <form onSubmit={handleCheckout}>
            <button
              className="bg-lime-800 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={!stripe}
            >
              Checkout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CartPage;

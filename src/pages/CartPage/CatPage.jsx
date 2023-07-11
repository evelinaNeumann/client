import React, { useEffect, useState } from "react";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch("http://localhost:5005/api/cart");
        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await fetch(`http://localhost:5005/api/cart/${productId}`, {
        method: "DELETE",
      });
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  console.log("Rendering cart page with items:", cartItems);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id}>
              <h3>Name:{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.productId)}>
                Remove from Cart
              </button>
            </div>
          ))}
          <p>Total Price: ${totalPrice}</p>
        </div>
      )}
    </div>
  );
}

export default CartPage;
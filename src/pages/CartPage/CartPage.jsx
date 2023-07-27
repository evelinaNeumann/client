import React, { useEffect, useContext, useState } from "react";

  

import CartContext from "../../components/cartContext";

import "./CartPage.css";
import PaymentFormModal from "../../components/PaymentFormModal/PaymentFormModal";




function CartPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  

  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch("https://petapp.fly.dev/api/cart");
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
  const handlePayNowClicked = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentFormClose = () => {
    setShowPaymentForm(false);
  };

 

  return (
    <div className="cart-page ui-serif-font">
      <h2>Welcome to your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div>
          {/* Move the cartItems.map block inside the conditional rendering */}
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              {/* Use the 'image' property from each cart item 
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />*/}
              <div className="cart-item-details">
                <h3>{item.name}</h3>
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
                    className="cart-item-quantity-input"
                  />
                </label>
                <button
                  className="cart-item-remove-button"
                  onClick={() => handleRemoveFromCart(item.productId)}
                >
                  Remove from Cart
                  
                </button>
                
              </div>
              
            </div>
          ))}
          <p className="total-price">Total Price: ${totalPrice}</p>
          <button className="pay-now-button" onClick={handlePayNowClicked}>
            Pay Now
          </button>
          {showPaymentForm && (
            <PaymentFormModal
              totalPrice={totalPrice}
              onClose={handlePaymentFormClose}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CartPage;
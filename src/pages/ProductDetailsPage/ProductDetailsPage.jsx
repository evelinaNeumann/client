import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5005/api/shop_products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async (productId, name) => {
    try {
      await fetch(`http://localhost:5005/api/cart/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <p>Product ID: {productId}</p>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <button onClick={() => handleAddToCart(productId, product.name)}>Add to Cart</button>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
}

export default ProductDetailsPage;
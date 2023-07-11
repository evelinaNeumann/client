import React from "react";

function ProductPage({ category, products }) {
  return (
    <div>
      <h2>{category}</h2>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          
        </div>
      ))}
    </div>
  );
}

export default ProductPage;

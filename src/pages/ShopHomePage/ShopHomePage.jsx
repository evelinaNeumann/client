import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./ShopHomePage.css";

function ShopHomePage() {
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const res = await fetch("http://localhost:5005/api/shop_products");
          const data = await res.json();
          console.log("Fetched products:", data);
          const groupedProducts = groupProductsByCategory(data);
          console.log("Grouped products:", groupedProducts);
          setGroupedProducts(groupedProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    fetchProducts();
  }, []);

  const groupProductsByCategory = (products) => {
    const groupedProducts = {};
    products.forEach((product) => {
      const { category } = product;
      if (groupedProducts[category]) {
        groupedProducts[category].push(product);
      } else {
        groupedProducts[category] = [product];
      }
    });
    return groupedProducts;
  };

  const handleSlideChange = (event) => {
    console.log("Slide changed:", event.item);
  };

  const mapImagesToSlides = (images, products) => {
    const slides = [];
    console.log("Products:", products);
    for (let i = 0; i < images.length; i += 2) {
      const product1 = products[i];
      const product2 = products[i + 1];
      console.log("Product 1 ID:", product1 && product1.id);
      console.log("Product 2 ID:", product2 && product2.id);
      if (!product1 && !product2) {
        continue;
      }
  
      slides.push(
        <div className="slide flex justify-center space-x-2 mt-8">
          {product1 && (
            <Link to={`/product/${product1._id}`}>
              <img src={images[i]} alt="" className="carousel-image" />
            </Link>
          )}
          {product2 && (
            <Link to={`/product/${product2._id}`}>
              <img src={images[i + 1]} alt="" className="carousel-image" />
            </Link>
          )}
        </div>
      );
    }
    return slides;
  };
  
  
  
  
  
  

  return (
    <div>
      <h1 className="shadow h-20 flex justify-between items-center">
        <div className="flex items-center">Shop Home page</div>
        <div className="flex items-center">
          <FaUserCircle size={50} />
          <MdOutlineShoppingCart
            size={50}
            style={{ marginRight: "16px" }}
          />
        </div>
      </h1>
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} className={category.toLowerCase()}>
            <h2>{category}</h2>
            <AliceCarousel
              mouseTracking
              items={mapImagesToSlides(
                products.map((product) => product.image),
                products
              )}
              stagePadding={{ paddingLeft: 50, paddingRight: 50 }}
              onSlideChanged={handleSlideChange}
            />
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default ShopHomePage;

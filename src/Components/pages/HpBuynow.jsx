import React from "react";
import "../../App.css"; // Correct relative path to App.css
import { FaExchangeAlt, FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";

function HpBuynow() {
  return (
    <div className="product-page">
      {/* Header */}
      <header className="header">
        <h1>croma</h1>
        <input type="text" placeholder="What are you looking for ?" />
        <div className="icons">
          <span>📍 Mumbai, 400049</span>
          <FaShoppingCart />
        </div>
      </header>

      {/* Main Content */}
      <div className="content">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="thumbnail selected">Image 1</div>
          <div className="thumbnail">Image 2</div>
          <div className="thumbnail">Image 3</div>
        </div>

        {/* Product Image */}
        <div className="product-image">
          <img
            src="https://via.placeholder.com/500"
            alt="Lenovo Laptop"
            className="main-image"
          />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h2>
          HP 15-fd0221TU Intel Core i5 13th Gen Business Laptop (16GB, 512GB SSD, Windows 11 Home, 15.6 inch Full HD Display, MS Office 2021, Natural Silver, 1.59 KG)
          </h2>
          <p className="price">
            ₹24,990.00 <span className="mrp">MRP: ₹47,290.00</span>{" "}
            <span className="discount">(47.16% off)</span>
          </p>
          <p className="emi">₹1,176/mo EMI Options</p>

          {/* Exchange Options */}
          <div className="exchange">
            <h4>With Exchange</h4>
            <p>Up to ₹27,500 off</p>
            <button className="exchange-btn">
              <FaExchangeAlt /> Choose Laptop for Exchange
            </button>
            <p className="link">How does exchange work?</p>
          </div>

          {/* Purchase Button */}
          <button className="purchase-btn">Purchase</button>

          <div className="without-exchange">
            <h4>Without Exchange</h4>
          </div>

          <div className="options">
            <div>
              <span>RAM</span>
              <span className="badge">8GB</span>
            </div>
            <div>
              <span>Brand Color</span>
              <span className="badge">Grey</span>
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <FaHeart />
            <FaShareAlt />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HpBuynow;

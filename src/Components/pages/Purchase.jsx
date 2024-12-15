import React from "react";
import "../../App.css"; // Link your CSS file here
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import { useCart } from "../../contexts/CartContext"; // Import useCart from CartContext

function PurchasePage() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object which contains the state passed from hppage.jsx

  const product = location.state?.product; // Retrieve the product from location state

  const { addToCart } = useCart(); // Access addToCart from CartContext

  if (!product) {
    return <div>No product selected!</div>; // In case no product is passed
  }

  // Function to add item to the cart and navigate to the cart page
  const handleCartClick = () => {
    addToCart(product); // Add the current product to the cart
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <div
      className="product-page"
      style={{ width: "100%", height: "100%", backgroundColor: "#808080" }}
    >
      {/* Search Bar Container */}
      <div
        className="search-bar-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000', // Black container background
          padding: '15px',
          borderRadius: '8px',
          maxWidth: '100%', // Black container takes up full width
          margin: '0 auto',
        }}
      >
        <div
          className="search-bar-wrapper"
          style={{
            maxWidth: '600px', // Controls the search bar's width
            width: '100%', // Ensures responsiveness
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Menu Icon */}
          <div className="menu-icon" style={{ marginRight: '10px' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#fff', // White menu icon for contrast
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>
          </div>

          {/* Search Bar */}
          <div
            className="search-bar"
            style={{
              display: 'flex',
              flexGrow: 1,
              backgroundColor: '#333', // Dark grey background for the search bar itself
              borderRadius: '5px', // Smooth edges
              padding: '5px',
            }}
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              style={{
                flexGrow: 1,
                padding: '10px',
                borderRadius: '4px 0 0 4px', // Rounded edges for the input
                border: 'none', // Removes default input border
                outline: 'none', // Removes the focus border
              }}
            />
            <button
              className="search-button"
              style={{
                backgroundColor: '#555', // Slightly lighter grey for button
                color: '#fff',
                border: 'none',
                borderRadius: '0 4px 4px 0', // Rounded edges for the button
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Header with Cart Icon */}
      <header
        className="header"
        style={{
          position: "relative",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-black font-bold">Laptop Store</h1>

          {/* Cart Icon in the top-right corner */}
          <div
            className="cart-icon"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
            onClick={handleCartClick} // Trigger cart navigation on click
          >
            <FaShoppingCart size={30} color="#000" />
          </div>
        </div>
      </header>

      {/* Product Display */}
      <div
        className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 px-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* Product Image (Left Column) */}
        <div className="image-gallery">
          <div className="product-image">
            <img
              src={product.image}
              style={{ width: "230px", height: "230px" }}
              alt="Laptop Image"
              className="main-image"
            />
          </div>
        </div>

        {/* Product Details (Right Column) */}
        <div
          className="product-details"
          style={{
            maxWidth: "500px",
            padding: "20px",
            backgroundColor: "#808080",
            borderRadius: "8px",
          }}
        >
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p>{product.description || "No description available"}</p>
          <p className="price">
            {product.price}{" "}
            <span className="mrp">MRP: {product.discountPrice}</span>{" "}
            <span className="discount">({product.discount})</span>
          </p>
          <p className="emi">EMI Options available</p>

          <button
            className="bg-blue-600 px-4 py-1 rounded text-white hover:bg-white"
            onClick={handleCartClick} // Add item to cart and navigate
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;

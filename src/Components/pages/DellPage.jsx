import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const App = () => {
  const products = [
    {
      id: 1,
      image: "public/images/dell1.webp",
      title: "Dell Inspiron 3530 Intel Core i5 13th Gen Thin & Light Laptop (16GB, 512GB SSD, Windows 11 Home, 15.6 inch Full HD WVA Display, MS Office 2021, Platinum Silver, 1.63 KG)",
      price: "₹29,990",
      discountPrice: "₹57,243",
      discount: "42% Off",
      rating: "4.4 ⭐ (82)",
      description: "A powerful AMD Ryzen 3 laptop for all your everyday tasks.",
    },
    {
      id: 2,
      image: "public/images/dell2.webp",
      title: "DELL Inspiron 3530 Intel Core i7 13th Gen Thin and Light Laptop (16GB, 512GB SSD, Windows 11, 15.6 inch FHD LED Backlit Display, MS Office 2021, Platinum Silver, 1.65 KG)",
      price: "₹40,990",
      discountPrice: "₹67,143",
      discount: "39% Off",
      rating: "4.5 ⭐ (92)",
      description: "Intel Core i3 laptop with a sleek design for work and play.",
    },
    {
      id: 3,
      image: "public/images/dell3.webp",
      title: "DELL Inspiron 15 3535 AMD Ryzen 3 7320U Notebook Laptop (8GB, 512GB SSD, Windows 11 Home, 15.6 inch Full HD Display, MS Office 2021, Carbon Black, 1.85 KG)",
      price: "₹31,999",
      discountPrice: "₹33,990",
      discount: "25% Off",
      rating: "4.3 ⭐ (74)",
      description: "Intel Core i5 laptop for productivity and entertainment.",
    },
    {
      id: 4,
      image: "public/images/dell4.webp",
      title: "DELL G15-5530 Intel Core i5 13th Gen Gaming Laptop with RGB Keyboard(16GB, 512GB SSD, Windows 11, 6GB Graphics, 15.6 inch 120 Hz FHD Display, MS Office 2021, Dark Shadow Gray, 2.97 KG)",
      price: "₹75,990",
      discountPrice: "₹107,199",
      discount: "25% Off",
      rating: "4.3 ⭐ (74)",
      description: "A lightweight AMD Ryzen 3 laptop with excellent battery life.",
    },
    {
      id: 5,
      image: "public/images/hp5.webp",
      title: "HP 15s-eq2143AU AMD Ryzen 3 5300U Thin & Light Laptop",
      price: "₹31,990",
      discountPrice: "₹56,999",
      discount: "25% Off",
      rating: "4.3 ⭐ (74)",
      description: "Thin & light AMD Ryzen 3 laptop for everyday use.",
    },
    {
      id: 6,
      image: "public/images/hp6.webp",
      title: "HP Victus 15-FA1313TX Intel Core i5 12th Gen Gaming Laptop ",
      price: "₹59,990",
      discountPrice: "₹80,242",
      discount: "25% Off",
      rating: "4.3 ⭐ (74)",
      description: "A powerful Intel Core i5 gaming laptop for immersive experiences.",
    },
  ];

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleBuyNow = (product) => {
    // Navigate to the purchase page with the selected product
    navigate("/purchase", { state: { product } }); // Passing the product info to the purchase page
  };

  const handleCartClick = () => {
    // Navigate to the cart page
    navigate("/cart");
  };

  return (
    <div className="second page" style={{ width: '100%', height: '100%', backgroundColor: '#212121' }}>
      {/* Header Section */}
      <header className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold">Laptop Store</h1>
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-1/2 px-4 py-2 rounded-lg text-black"
          />
          <div className="flex space-x-5">
            {/* Cart Button */}
            <button onClick={handleCartClick} className="text-white">
              🛒
            </button>
            <button className="text-white">👤</button>
          </div>
        </div>
      </header>

      {/* Product Section */}
      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center space-y-2">
            {/* Grey Box with Image */}
            <div className="hplaptop" style={{ minHeight: '230px', minWidth: '400px', backgroundColor: '#4F4F4F', borderRadius: '8px' }}>
              <img
                src={product.image}
                alt={product.title}
                className="w-70 h-60 object-contain mx-auto mt-2"
              />
            </div>

            {/* Product Details */}
            <div className="text-center p-2">
              <h3 className="text-white font-semibold">{product.title}</h3>
              <p className="text-green-400 font-bold mt-1">{product.price}</p>
              <p className="text-white line-through">{product.discountPrice}</p>
              <p className="text-yellow-300 mt-1">{product.rating}</p>
              <div className="mt-2 flex items-center justify-center space-x-2">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">{product.discount}</span>
                <button
                  className="bg-blue-600 px-4 py-1 rounded text-white hover:bg-white"
                  onClick={() => handleBuyNow(product)} // Call handleBuyNow on button click
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

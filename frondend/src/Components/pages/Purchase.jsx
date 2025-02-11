import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { getAuth } from "firebase/auth";

function PurchasePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">No product selected!</div>
      </div>
    );
  }

  const handleBuyNow = () => {
    if (!auth.currentUser) {
      setError("Please login to proceed with the purchase");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      navigate("/order", { state: { product } });
    } catch (error) {
      setError("Failed to proceed to order page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">Laptop Store</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="px-4 py-2 rounded-lg w-64"
            />
            <button
              onClick={() => navigate("/cart")}
              className="text-white relative"
            >
              <FaShoppingCart size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="container mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full h-auto object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              
              <div className="space-y-2">
                <p className="text-3xl font-bold text-green-600">{product.price}</p>
                <p className="text-gray-500 line-through">{product.discountPrice}</p>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {product.discount}
                </span>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold
                  ${loading 
                    ? 'bg-green-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {loading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;

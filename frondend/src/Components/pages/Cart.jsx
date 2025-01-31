import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { CartService } from "./cartService";

function CartPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (auth.currentUser) {
      // Subscribe to real-time cart updates
      unsubscribe = CartService.subscribeToCart(
        auth.currentUser.uid,
        (items) => {
          setCartItems(items);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth.currentUser]);

  const removeFromCart = async (productId) => {
    try {
      await CartService.removeFromCart(auth.currentUser.uid, productId);
    } catch (error) {
      setError("Failed to remove item from cart");
    }
  };

  const clearCart = async () => {
    try {
      await CartService.clearCart(auth.currentUser.uid);
    } catch (error) {
      setError("Failed to clear cart");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { items: cartItems } });
  };

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please login to view your cart</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Your Shopping Cart
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <p className="text-xl text-gray-600">Loading cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty!</p>
            <button
              onClick={() => navigate("/Firstpage")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-green-600 font-bold mt-1">{item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
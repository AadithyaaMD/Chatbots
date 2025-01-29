import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Path to Firebase configuration
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const auth = getAuth();

  // Fetch items for the current user
  useEffect(() => {
    const fetchCartItems = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const cartCollection = collection(db, "cartItems");
        const cartSnapshot = await getDocs(cartCollection);
        const cartData = cartSnapshot.docs
          .filter((doc) => doc.data().userId === user.uid)
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setCartItems(cartData);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [auth.currentUser]);

  // Add to Cart function
  const addToCart = async (product) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    try {
      await addDoc(collection(db, "cartItems"), {
        userId: user.uid,
        name: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        model: product.model,
      });

      setCartItems((prevItems) => [...prevItems, product]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

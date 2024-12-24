import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../config/config";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from Firestore on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      const cartCollection = collection(db, "cart"); // Assuming 'cart' is your collection name
      const cartSnapshot = await getDocs(cartCollection);
      const cartList = cartSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Ensure each item has a unique `id`
      }));
      setCartItems(cartList);
    };
    fetchCartItems();
  }, []);

  // Add an item to the cart in Firestore and state
  const addToCart = async (item) => {
    try {
      const docRef = await addDoc(collection(db, "cart"), item); // Add item to Firestore
      setCartItems([...cartItems, { ...item, id: docRef.id }]); // Append the new item with its Firestore `id`
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove an item from the cart by its Firestore id
  const removeFromCart = async (id) => {
    try {
      const itemDoc = doc(db, "cart", id); // Reference to the document to delete
      await deleteDoc(itemDoc); // Delete the item from Firestore
      setCartItems(cartItems.filter(item => item.id !== id)); // Remove item from state
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Clear all items from the cart
  const clearCart = async () => {
    try {
      const cartCollection = collection(db, "cart");
      const cartSnapshot = await getDocs(cartCollection);
      cartSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref); // Delete each item
      });
      setCartItems([]); // Clear the state
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};

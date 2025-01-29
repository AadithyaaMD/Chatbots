import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const CartService = {
  // Initialize cart for user
  initializeCart: async (userId) => {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      await setDoc(cartRef, {
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    return cartRef;
  },

  // Add item to cart
  addToCart: async (userId, product) => {
    try {
      const cartRef = await CartService.initializeCart(userId);
      const cartSnap = await getDoc(cartRef);
      
      let updatedCart = [];
      if (cartSnap.exists()) {
        updatedCart = cartSnap.data().items || [];
        
        // Check for duplicate
        if (updatedCart.some(item => item.id === product.id)) {
          throw new Error("Product already in cart");
        }
      }
      
      updatedCart.push({
        ...product,
        addedAt: new Date().toISOString()
      });
      
      await updateDoc(cartRef, { 
        items: updatedCart,
        updatedAt: new Date().toISOString()
      });
      
      return updatedCart;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  // Rest of the service methods remain the same
  removeFromCart: async (userId, productId) => {
    try {
      const cartRef = await CartService.initializeCart(userId);
      const cartSnap = await getDoc(cartRef);
      
      const updatedCart = cartSnap.data().items.filter(
        item => item.id !== productId
      );
      
      await updateDoc(cartRef, { 
        items: updatedCart,
        updatedAt: new Date().toISOString()
      });
      
      return updatedCart;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  clearCart: async (userId) => {
    try {
      const cartRef = await CartService.initializeCart(userId);
      await updateDoc(cartRef, { 
        items: [],
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },

  subscribeToCart: (userId, onUpdate) => {
    const cartRef = doc(db, "carts", userId);
    return onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        onUpdate(doc.data().items || []);
      } else {
        // Initialize cart if it doesn't exist
        CartService.initializeCart(userId)
          .then(() => onUpdate([]));
      }
    }, (error) => {
      console.error("Error subscribing to cart:", error);
    });
  }
};
import React, { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext'; // Correct path to CartContext.js

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart(); // Get methods from CartContext

  useEffect(() => {
    console.log('Cart Items:', cartItems); // Debugging
  }, [cartItems]);

  return (
    <div className="cart-page" style={styles.page}>
      <h1 style={styles.header}>Your Shopping Cart</h1>
      
      {cartItems.length > 0 ? (
        <div>
          <ul style={styles.cartList}>
            {cartItems.map((item, index) => (
              <li key={index} style={styles.cartItem}>
                <div>
                  <h3 style={styles.itemName}>{item.title || "Unnamed Item"}</h3>
                  <p style={styles.itemDescription}>{item.description || "No description available."}</p>
                  <p style={styles.itemPrice}><strong>₹{item.price || "0.00"}</strong></p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          <div style={styles.buttonsContainer}>
            <button onClick={clearCart} style={styles.clearButton}>
              Clear Cart
            </button>
            <button onClick={() => alert('Proceeding to checkout!')} style={styles.checkoutButton}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p style={styles.emptyCart}>Your cart is empty!</p> 
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: '20px',
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
    textAlign: 'center',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#2c3e50', // Dark blue-gray
    marginBottom: '20px',
  },
  cartList: {
    listStyle: 'none',
    padding: '0',
    margin: '0 auto',
    maxWidth: '600px',
    textAlign: 'left',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#34495e', // Slate gray
  },
  itemDescription: {
    fontSize: '14px',
    color: '#7f8c8d', // Muted gray
  },
  itemPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#27ae60', // Green
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  buttonsContainer: {
    marginTop: '20px',
  },
  clearButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  checkoutButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  emptyCart: {
    fontSize: '20px',
    color: '#555', // Dark gray
  },
};

export default CartPage;

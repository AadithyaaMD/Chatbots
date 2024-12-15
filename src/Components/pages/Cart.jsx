import React from 'react';
import { useCart } from '../../contexts/CartContext'; // Correct path to CartContext.js

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart(); // Get methods from CartContext

  return (
    <div className="cart-page" style={styles.page}>
      <h1 style={styles.header}>Your Shopping Cart</h1> {/* Bold, large, centered cart header */}
      
      {cartItems.length > 0 ? (
        <div>
          <ul style={styles.cartList}>
            {cartItems.map((item, index) => (
              <li key={index} style={styles.cartItem}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p><strong>₹{item.price}</strong></p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)} // Ensure the id is passed to remove only this item
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
    color: '#333',
    marginBottom: '20px',
  },
  cartList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    maxWidth: '600px',
    margin: '0 auto',
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
    color: '#555',
  },
};

export default CartPage;

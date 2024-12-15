// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import FirstPage from './Components/pages/FirstPage';
import HpPage from './Components/pages/HpPage';
import DellPage from './Components/pages/DellPage';
import HpBuynow from './Components/pages/HpBuynow';
import Purchase from './Components/pages/Purchase';
import CartPage from './Components/pages/cart';

function App() {
  return (
    <CartProvider> {/* Wrap the app with CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/hppage" element={<HpPage />} />
          <Route path="/dellpage" element={<DellPage />} />
          <Route path="/hpbuynow" element={<HpBuynow />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

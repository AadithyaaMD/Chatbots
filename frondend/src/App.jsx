import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

// Components
import ChatbotSection from './Components/pages/ChatbotSection'; // Use ChatbotSection here
import FirstPage from './Components/pages/FirstPage';
import HpPage from './Components/pages/HpPage';
import DellPage from './Components/pages/DellPage';
import Purchase from './Components/pages/Purchase';
import CartPage from './Components/pages/Cart';
import AsusPage from './Components/pages/Asuspage';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Main Split-Screen Layout */}
        <div className="split-screen">
          
          {/* Left Side: Chatbot */}
          <ChatbotSection /> {/* Replacing direct ChatbotPopup */}

          {/* Right Side: Main Content */}
          <div className="right-screen">
            <Suspense fallback={<div>Loading Content...</div>}>
              <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/hppage" element={<HpPage />} />
                <Route path="/asuspage" element={<AsusPage />} />
                <Route path="/dellpage" element={<DellPage />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </Suspense>
          </div>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
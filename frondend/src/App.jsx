import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

// Components
import ChatbotSection from './Components/pages/ChatbotSection'; 
import FirstPage from './Components/pages/FirstPage';
import HpPage from './Components/pages/HpPage';
import DellPage from './Components/pages/DellPage';
import Purchase from './Components/pages/Purchase';
import CartPage from './Components/pages/Cart';
import SignUp from './Components/pages/SignUp';
import UserManagement from './Components/pages/usermanagement';
import Login from './Components/pages/login';
 // Import User Management Page

function App() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    wallet: 120.5,
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add logout logic, e.g., clear session or redirect to login
  };

  return (
    <CartProvider>
      <Router>
        {/* Main Split-Screen Layout */}
        <div className="split-screen">
          
          {/* Left Side: Chatbot */}
          <ChatbotSection /> 

          {/* Right Side: Main Content */}
          <div className="right-screen">
            <Suspense fallback={<div>Loading Content...</div>}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/FirstPage" element={<FirstPage />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/hppage" element={<HpPage />} />
                <Route path="/dellpage" element={<DellPage />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/user-management"
                  element={<UserManagement user={user} onLogout={handleLogout} />}
                />
              </Routes>
            </Suspense>
          </div>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

// Components
import Login from './Components/pages/Login.jsx';
import SignUp from './Components/pages/Signup';
import FirstPage from './Components/pages/FirstPage';
import HpPage from './Components/pages/HpPage';
import DellPage from './Components/pages/DellPage';
import Purchase from './Components/pages/Purchase';
import CartPage from './Components/pages/Cart';
import UserManagement from './Components/pages/UserManagement';
import AdminDashboard from './Components/pages/AdminDashboard.jsx';
import AdminHome from './Components/pages/AdminHome.jsx';


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

  console.log("Rendering App.jsx");

  return (
    <CartProvider>
      <Router>
        <div className="split-screen">
          <div className="right-screen">
            <Suspense fallback={<div>Loading Content... Please wait.</div>}>
              <Routes>
                {/* Routes for Login and SignUp */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Other Pages */}
                <Route path="/FirstPage" element={<FirstPage />} />
                <Route path="/hppage" element={<HpPage />} />

                <Route path="/dellpage" element={<DellPage />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/user-management"
                  element={<UserManagement user={user} onLogout={handleLogout} />}
                />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/adminhome" element={<AdminHome/>}/>
              </Routes>
            </Suspense>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

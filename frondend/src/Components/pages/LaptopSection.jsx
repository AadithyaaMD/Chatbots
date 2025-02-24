import React, { useState } from 'react';
import UserManagement from './UserManagement';

const LaptopSection = ({ handleHpClick, handleDellClick }) => {
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com"
  });

  const laptops = [
    { name: 'HP', imgSrc: '/images/hpimage.jpg', onClick: 'handleHpClick' },
    { name: 'DELL', imgSrc: '/images/dellimage.avif', onClick: 'handleDellClick' },
    { name: 'ASUS', imgSrc: '/images/asus.jpg' },
    { name: 'SAMSUNG', imgSrc: '/images/samsung.jpg' },
    { name: 'APPLE', imgSrc: '/images/apple.webp' },
  ];

  const handleLogout = () => {
    setShowUserManagement(false);
  };

  const clickHandlers = { handleHpClick, handleDellClick };

  if (showUserManagement) {
    return <UserManagement user={user} onLogout={handleLogout} />;
  }

  // Filter laptops based on search query
  const filteredLaptops = laptops.filter((laptop) =>
    laptop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="right-screen">
      <header className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={() => setSearchQuery(searchQuery)}>🔍</button>
        </div>
        <div className="user-cart-icons">
          <button 
            className="user-icon"
            onClick={() => setShowUserManagement(true)}
          >
            👤
          </button>
          <button className="cart-icon">🛒</button>
        </div>
      </header>

      <section className="laptop-carousel-section">
        {filteredLaptops.map((laptop) => (
          <div
            key={laptop.name}
            className="laptop-item"
            onClick={laptop.onClick ? clickHandlers[laptop.onClick] : null}
          >
            <img src={laptop.imgSrc} alt={laptop.name} />
            <p>{laptop.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LaptopSection;

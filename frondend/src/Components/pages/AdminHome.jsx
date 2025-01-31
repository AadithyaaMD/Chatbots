// src/components/admin/AdminHome.jsx
import React from 'react';
import './AdminHome.css';

const AdminHome = () => {
  const adminFeatures = [
    {
      title: "Add Products",
      description: "Add new products to your store inventory",
      icon: "📦",
      path: "/admin/products/add"
    },
    {
      title: "Manage Offers",
      description: "Create and manage discounts for products",
      icon: "🏷️",
      path: "/admin/offers"
    },
    {
      title: "View Users",
      description: "Monitor user activities and orders",
      icon: "👥",
      path: "/admin/users"
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="admin-home">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Admin</p>
      </div>
      
      <div className="admin-features">
        {adminFeatures.map((feature) => (
          <div 
            key={feature.title} 
            className="feature-card"
            onClick={() => handleNavigation(feature.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigation(feature.path);
              }
            }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;

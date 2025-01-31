import React, { useState } from 'react';
import './AdminDashboard.css';
const AdminDashboard = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    model: '',
    image: '',
    rating: '',
    discount: '',
    discountPrice: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Product data to submit:', productData);
    // Firebase integration will go here
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="card-title">Add New Product</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Product Title</label>
              <input
                id="title"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="model">Model Number</label>
              <input
                id="model"
                name="model"
                value={productData.model}
                onChange={handleInputChange}
                placeholder="Enter model number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={productData.rating}
                onChange={handleInputChange}
                placeholder="Enter rating"
              />
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount Percentage</label>
              <input
                id="discount"
                name="discount"
                value={productData.discount}
                onChange={handleInputChange}
                placeholder="Enter discount (e.g., '25% OFF')"
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountPrice">Discounted Price</label>
              <input
                id="discountPrice"
                name="discountPrice"
                value={productData.discountPrice}
                onChange={handleInputChange}
                placeholder="Enter discounted price"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="image">Image URL</label>
              <input
                id="image"
                name="image"
                value={productData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const navigate = useNavigate();

  const handleHpClick = () => {
    navigate('/HpPage');
  };

  const handleDellClick = () => {
    navigate('/DellPage'); // Navigate to DellPage when clicked
  };

  return (
    <div className="app">
      <header className="header" style={{ backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
        <div className="menu-icon" style={{ marginRight: 'auto' }}>
          <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>☰</button>
        </div>
        <div className="search-bar" style={{ display: 'flex', flexGrow: 1, maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="What are you looking for?"
            style={{ flexGrow: 1, padding: '5px', borderRadius: '4px 0 0 4px', border: '1px solid #ccc' }}
          />
          <button
            className="search-button"
            style={{ backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '0 4px 4px 0', padding: '5px 10px', cursor: 'pointer' }} >
            🔍
          </button>
        </div>
        <div className="user-cart-icons" style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
          <button className="user-icon" style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>👤</button>
          <button className="cart-icon" style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>🛒</button>
        </div>
      </header>

      <main className="main-content" style={{ padding: '20px', minHeight: '50px', backgroundColor: '#f4f4f4' }}>
        <section className="laptops-section" style={{ margin: '20px 0', backgroundColor: '#D1B9A5', padding: '20px', borderRadius: '0px', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="top-content" style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '20px', flexDirection: 'row-reverse' }}>
              <div className="left-laptop-image" style={{ flex: '1', marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="public/images/firstimage.jpg" alt="Laptop" style={{ maxWidth: '100%', minHeight: '250px', borderRadius: '0px' }} />
              </div>
              <h2 style={{ fontSize: '26px', fontStyle: 'normal', fontWeight: '700', flex: '2' }}>Laptops</h2>
            </div>
          </div>
        </section>

        <section className="laptop-carousel-section" style={{ margin: '20px 0', backgroundColor: '#fff', padding: '20px', borderRadius: '0px', width: '95%', marginLeft: 'auto', marginRight: 'auto', minHeight: '250px' }}>
          <div className="laptop-carousel" style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px' }}>
            <div className="laptop-item" style={{ minWidth: '10px', textAlign: 'center', minHeight: '10px', cursor: 'pointer' }} onClick={handleHpClick}>
              <img src="public/images/hpimage.jpg" alt="Laptop 1" style={{ width: '300px', height: '150px', borderRadius: '8px' }} />
              <p style={{ marginTop: '5px' }}>HP</p>
            </div>
            <div className="laptop-item" style={{ minWidth: '30px', textAlign: 'center', minHeight: '10px', cursor: 'pointer' }} onClick={handleDellClick}>
              <img src="public/images/dellimage.avif" alt="Laptop 2" style={{ width: '300px', height: '150px', borderRadius: '8px' }} />
              <p style={{ marginTop: '5px' }}>DELL</p>
            </div>
            <div className="laptop-item" style={{ minWidth: '150px', textAlign: 'center' }}>
              <img src="public/images/asus.jpg" alt="Laptop 3" style={{ width: '300px', height: '150px', borderRadius: '8px' }} />
              <p style={{ marginTop: '5px' }}>ASUS</p>
            </div>
            <div className="laptop-item" style={{ minWidth: '150px', textAlign: 'center' }}>
              <img src="public/images/samsung.jpg" alt="Laptop 4" style={{ width: '300px', height: '150px', borderRadius: '8px' }} />
              <p style={{ marginTop: '5px' }}>SAMSUNG</p>
            </div>
            <div className="laptop-item" style={{ minWidth: '150px', textAlign: 'center' }}>
              <img src="public/images/apple.webp" alt="Laptop 5" style={{ width: '300px', height: '150px', borderRadius: '8px' }} />
              <p style={{ marginTop: '5px' }}>APPLE</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FirstPage;

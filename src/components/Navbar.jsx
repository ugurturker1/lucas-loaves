import React from 'react';

export default function Navbar({ setCurrentPage, cartCount }) {
  return (
    <nav className="bg-brand-dark shadow-sm py-3">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h1 className="text-white m-0 fs-3 fw-bold mb-3 mb-md-0">Luca's Loaves</h1>
        <ul className="nav fw-bold gap-3 gap-md-4">
          <li className="nav-item text-white" style={{cursor: 'pointer'}} onClick={() => setCurrentPage('home')}>Home</li>
          <li className="nav-item text-white" style={{cursor: 'pointer'}} onClick={() => setCurrentPage('order')}>Order Online</li>
          <li className="nav-item text-white" style={{cursor: 'pointer'}} onClick={() => setCurrentPage('cart')}>Cart ({cartCount})</li>
        </ul>
      </div>
    </nav>
  );
}
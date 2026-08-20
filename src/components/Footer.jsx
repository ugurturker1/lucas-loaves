import React from 'react';

export default function Footer() {
  return (
    <footer 
      className="text-white py-3 mt-auto shadow-sm border-top border-brand text-center"
      style={{ backgroundColor: 'rgba(74, 46, 27, 0.9)' }}
    >
      <div className="container">
        <div className="small" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          &copy; {new Date().getFullYear()} All rights reserved. | Baked fresh in Melbourne
        </div>
      </div>
    </footer>
  );
}
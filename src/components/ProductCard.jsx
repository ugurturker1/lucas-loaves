import React from 'react';

export default function ProductCard({ product, quantity, onQuantityChange }) {
  return (
    <div className="d-flex justify-content-between align-items-center bg-white p-3 mb-3 rounded shadow-sm border-start border-4" style={{borderColor: '#4a2e1b'}}>
      <div>
        <h5 className="text-brand m-0">{product.name}</h5>
        <p className="m-0 text-muted">${product.price.toFixed(2)}</p>
      </div>
      <div>
        <input 
          type="number" 
          className="form-control text-center" 
          style={{width: '70px'}} 
          min="0" 
          value={quantity} 
          onChange={(e) => onQuantityChange(product.id, Number(e.target.value))} 
        />
      </div>
    </div>
  );
}
import React from 'react';

export default function CartItem({ item, onRemove }) {
  return (
    <div className="d-flex justify-content-between align-items-center bg-white p-3 mb-3 rounded shadow-sm border-start border-4 border-brand">
      <span className="fw-bold fs-5">{item.name}</span>
      <div className="d-flex align-items-center gap-3">
        <span className="bg-brand-dark text-white px-2 py-1 rounded">Qty: {item.qty}</span>
        <span className="fw-bold fs-5">${(item.price * item.qty).toFixed(2)}</span>
        <button className="btn btn-remove rounded-circle py-1 px-2" onClick={() => onRemove(item.id)}>X</button>
      </div>
    </div>
  );
}
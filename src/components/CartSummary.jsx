import React from 'react';

export default function CartSummary({ totalAmount, onPlaceOrder }) {
  return (
    <div className="col-12 col-lg-5 order-2 order-lg-1">
      <div className="bg-white p-4 rounded shadow-sm border-top border-4 border-brand text-center mb-4">
        <h2 className="text-brand">Cart Summary</h2>
        <h1 className="display-4 fw-bold m-0">${totalAmount.toFixed(2)}</h1>
      </div>
      
      <div className="bg-white p-5 rounded shadow-sm text-center border" style={{borderStyle: 'dashed !important'}}>
        <h4 className="text-muted mb-3">Ready to Checkout?</h4>
        <p className="text-muted small">Review your items before placing the order.</p>
        <button className="btn btn-main w-100 py-3 mt-3 fs-5" onClick={onPlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}
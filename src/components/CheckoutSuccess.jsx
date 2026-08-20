import React from 'react';
import StoreMap from './StoreMap'; 

export default function CheckoutSuccess({ orderNumber, onFinish }) {
  return (
    <div className="container py-5">
      <div className="row g-4">
        
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
          <div className="bg-brand-dark text-white p-4 rounded text-center shadow mb-4">
            <h2 className="mb-3">Thank You For Your Order!</h2>
            <p className="fs-5 m-0">Order Number: <strong>{orderNumber}</strong></p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm border-start border-4 border-brand">
            <h3 className="text-brand mb-3">Pick Up Information</h3>
            <p>Your order is confirmed and will be ready for collection at our bakery in 1 hour.</p>
            <hr />
            <p className="m-1"><strong>Location:</strong> Luca's Louves | Melbourne</p>
            <p className="m-1"><strong>Hours:</strong> 7am to 4pm, 7 days a week</p>
            <button className="btn btn-main w-100 mt-4 py-2" onClick={onFinish}>Return to Homepage</button>
          </div>
        </div>
        
        
        <StoreMap />
      </div>
    </div>
  );
}
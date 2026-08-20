import React from 'react';

export default function Home({ setCurrentPage }) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center text-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="hero-image d-flex align-items-center justify-content-center mb-4 shadow rounded">
            <h2 className="bg-brand-dark text-white p-3 rounded" style={{opacity: 0.9}}>
              ARTISAN SOURDOUGH
            </h2>
          </div>
          <button className="btn btn-main px-5 py-3 fs-5 shadow" onClick={() => setCurrentPage('order')}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
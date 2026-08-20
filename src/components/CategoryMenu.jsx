import React from 'react';

export default function CategoryMenu({ setView }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-6"><button className="btn category-btn w-100 py-4 fs-5 shadow-sm" onClick={() => setView('bread')}>Bread</button></div>
      <div className="col-6"><button className="btn category-btn w-100 py-4 fs-5 shadow-sm" onClick={() => setView('cakes')}>Cakes</button></div>
      <div className="col-6"><button className="btn category-btn w-100 py-4 fs-5 shadow-sm" onClick={() => setView('sweets')}>Sweets</button></div>
      <div className="col-6"><button className="btn category-btn w-100 py-4 fs-5 shadow-sm" onClick={() => setView('flour')}>Flour</button></div>
    </div>
  );
}
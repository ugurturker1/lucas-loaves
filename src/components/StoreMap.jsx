import React from 'react';

export default function StoreMap() {
  return (
    <div className="col-12 col-lg-6">
      <div className="map-iframe-container shadow h-100 d-flex">
        <iframe 
          src="https://maps.google.com/maps?q=Laneway+Education+Melbourne+Campus&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          style={{ border: 0, flexGrow: 1, minHeight: '400px' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  );
}
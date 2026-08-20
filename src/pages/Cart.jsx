import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import CheckoutSuccess from '../components/CheckoutSuccess';
import CartSummary from '../components/CartSummary'; 

const MetaUpdater = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

export default function Cart({ cart, setCart, setCurrentPage }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const handleRemoveItem = (id) => setCart(cart.filter(item => item.id !== id));

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()) {
      alert("Please fill in all customer details (First Name, Last Name, and Phone Number).");
      return;
    }

    const orderItems = cart.map(item => ({
      productId: item.id,
      quantity: item.qty,
      priceAtPurchase: item.price
    }));

    const orderData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber.trim(),
      totalPrice: totalAmount,
      items: orderItems
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        setOrderNumber(data.order.orderNumber); 
        setIsCheckout(true);
      } else {
        alert("An error occurred while creating the order: " + data.message);
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Could not connect to the server.");
    }
  };

  const handleFinish = () => {
    setCart([]);
    setCurrentPage('home');
  };

  if (isCheckout) {
    return (
      <>
        <MetaUpdater title="Checkout | Luca's Loaves" />
        <CheckoutSuccess orderNumber={orderNumber} onFinish={handleFinish} />
      </>
    );
  }

  return (
    <div className="container py-5">
      <MetaUpdater title="Cart | Luca's Loaves" />
      <div className="row g-4">
        
        <CartSummary totalAmount={totalAmount} onPlaceOrder={handlePlaceOrder} />

        <div className="col-12 col-lg-7 order-1 order-lg-2">
          
          <div className="card shadow-sm border-0 mb-4 bg-light">
            <div className="card-body p-4">
              <h3 className="text-brand border-bottom border-brand pb-2 mb-3">Customer Details</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-brand">First Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-brand">Last Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-brand">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="555-000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-brand border-bottom border-brand pb-2 mb-4">Products You Are Buying</h2>
          {cart.length === 0 ? <p className="text-muted fs-5">No items selected.</p> : null}
          
          <div className="pe-2" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home'; 
import OrderOnline from './pages/OrderOnline';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import './App.css';


const MetaUpdater = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      
      
      {currentPage === 'home' && <MetaUpdater title="Home | Luca's Loaves" />}
      
      <Navbar setCurrentPage={setCurrentPage} cartCount={cartCount} />
      
      <main className="flex-grow-1">
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'order' && <OrderOnline cart={cart} setCart={setCart} />}
        {currentPage === 'cart' && <Cart cart={cart} setCart={setCart} setCurrentPage={setCurrentPage} />}
      </main>

      <Footer />
    </div>
  );
}
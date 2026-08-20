import React, { useState, useCallback, memo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryMenu from '../components/CategoryMenu';

const MetaUpdater = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

const GoodComponent = memo(() => {
  console.log("✅ [OPTIMIZED] GoodComponent RENDERED: Stable reference. React.memo cached the component successfully.");
  return null; 
});

export default function OrderOnline({ cart, setCart }) {
  const [view, setView] = useState('categories');
  const [quantities, setQuantities] = useState({});
  // API'den gelecek veriler için state (başlangıçta boş)
  const [allProducts, setAllProducts] = useState({ bread: [], cakes: [], sweets: [], flour: [] });
  const [loading, setLoading] = useState(true);

  // Sayfa yüklendiğinde API'den verileri çekiyoruz
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        // Gelen düz ürün listesini senin eski statik yapın gibi kategorilere ayırıyoruz
        const groupedProducts = { bread: [], cakes: [], sweets: [], flour: [] };
        
        data.forEach(product => {
          // MongoDB'den gelen _id'yi, frontend'in beklediği id formatına kopyalıyoruz
          const formattedProduct = { ...product, id: product._id };
          
          if (groupedProducts[product.category]) {
            groupedProducts[product.category].push(formattedProduct);
          }
        });
        
        setAllProducts(groupedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ürünler çekilirken hata oluştu:', error);
        setLoading(false);
      });
  }, []);

  const getQty = (id) => quantities[id] || 0;
  const updateQty = (id, val) => setQuantities({ ...quantities, [id]: val });

  const BadComponent = memo(() => {
    console.log("❌ [UNOPTIMIZED] BadComponent RENDERED: Defined inside render block. Compiler bypassed memoization!");
    return null; 
  });

  const handleAddToCart = (currentCategory) => {
    let newCart = [...cart];
    let addedAnything = false;

    allProducts[currentCategory].forEach(p => {
      const qty = getQty(p.id);
      if (qty > 0) {
        addedAnything = true;
        const existing = newCart.find(item => item.id === p.id);
        if (existing) {
          existing.qty += qty;
        } else {
          newCart.push({ ...p, qty: qty });
        }
      }
    });

    if (addedAnything) {
      setCart(newCart);
      alert("Items successfully added to your cart!");
      setQuantities({});
    } else {
      alert("Please select at least one product (change 0 to 1).");
    }
  };

  // Veriler yüklenirken Loading göster
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading Menu...</h2>
      </div>
    );
  }

  if (view === 'categories') {
    return (
      <div className="container py-5">
        <MetaUpdater title="Order Online | Luca's Loaves" />
        
        <GoodComponent />
        <BadComponent />

        <div className="row g-4">
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
            <h2 className="text-brand mb-4 text-center text-lg-start">What are you ordering today?</h2>
            <CategoryMenu setView={setView} />
          </div>
          <div className="col-12 col-lg-6">
            <div className="firin-vitrini shadow">&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }

  const currentProducts = allProducts[view] || [];
  const categoryTitle = view.charAt(0).toUpperCase() + view.slice(1);

  return (
    <div className="container py-5">
      <MetaUpdater title={`${categoryTitle} | Luca's Loaves`} />
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-brand m-0">{categoryTitle} List</h2>
            <button className="btn btn-secondary shadow-sm" onClick={() => { setView('categories'); setQuantities({}); }}>
              ← Back
            </button>
          </div>
          
          <div className="pe-2" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {currentProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                quantity={getQty(p.id)} 
                onQuantityChange={updateQty} 
              />
            ))}
          </div>
          
          <button className="btn btn-main w-100 py-3 mt-3 fs-5 shadow-sm" onClick={() => handleAddToCart(view)}>
            Add {categoryTitle} to Cart
          </button>
        </div>

        <div className="col-12 col-lg-6 d-none d-lg-block">
          <div className="hamur-ustasi shadow">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
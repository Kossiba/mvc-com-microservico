import React, { useEffect, useState } from 'react';
import { Link }                 from 'react-router-dom';
import { getCartItems, removeFromCart } from '../controllers/cartController.js';
import { getProductById }       from '../controllers/productController.js';
import './Cart.css';

export default function Cart() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    (async () => {
      const cart = await getCartItems(userId);
      const detailed = await Promise.all(
        cart.map(async item => {
          const prod = await getProductById(item.productId);
          return { ...item, product: prod };
        })
      );
      setItems(detailed);
      setLoading(false);
    })();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  if (loading) return <p>Carregando carrinho…</p>;
  if (items.length === 0) return <p>Seu carrinho está vazio.</p>;

  return (
    <div className="cart-container">
      <h2>Meu Carrinho</h2>
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="cart-item-image"
          />
          <div className="cart-item-info">
            <h3>{item.product.name}</h3>
            <p>R$ {Number(item.product.price).toFixed(2)}</p>
          </div>
          <button onClick={() => handleRemove(item.id)} className="remove-button">
            Remover
          </button>
        </div>
      ))}
      <Link to="/produtos" className="back-link">← Continuar comprando</Link>
    </div>
  );
}

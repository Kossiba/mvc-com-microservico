// src/views/ProdutoDetalhe.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../controllers/productController.js';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController.js';
import './ProdutoDetalhe.css';

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartItemId, setCartItemId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Busca produto e itens do carrinho simultaneamente
        const productData = await getProductById(id);
        const userId = localStorage.getItem('userId');
        let items = [];
        if (userId) items = await getCartItems(userId);

        setProd(productData);
        // Verifica se já existe item de carrinho para este produto
        const found = items.find(item => item.productId === id);
        setCartItemId(found ? found.id : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddOrRemove = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Faça login para atualizar o carrinho.');
      return;
    }
    try {
      if (cartItemId) {
        await removeFromCart(cartItemId);
      } else {
        await addToCart({ userId, productId: id });
      }
      navigate('/cart');
    } catch (err) {
      console.error('Erro ao atualizar o carrinho:', err);
      alert('Não foi possível atualizar o carrinho.');
    }
  };

  if (loading) return <p>Carregando produto…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="detalhe-page">
      <Link to="/produtos" className="back-link">← Voltar</Link>
      <div className="detalhe-container">
        <img src={prod.imageUrl} alt={prod.name} className="detalhe-imagem" />
        <div className="detalhe-info">
          <h2>{prod.name}</h2>
          <p className="detalhe-preco">R$ {Number(prod.price).toFixed(2)}</p>
          <button onClick={handleAddOrRemove} className="btn-add-cart">
            {cartItemId ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
          </button>
        </div>
      </div>
    </div>
  );
}

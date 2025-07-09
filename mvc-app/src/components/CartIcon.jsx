import React from 'react';
import { Link } from 'react-router-dom';
import './CartIcon.css';

export default function CartIcon() {
  return (
    <Link to="/cart" className="cart-icon">
      🛒
    </Link>
  );
}

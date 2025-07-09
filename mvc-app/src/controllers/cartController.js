// src/controllers/cartController.js
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db }             from '../firebase.js';
import { createCartItem } from '../models/cartItem.js';

const cartCol = collection(db, 'cartItems');

/**
 * Adiciona um produto ao carrinho de um usuário.
 * @param {{ userId: string, productId: string }} data
 * @returns {Promise<string>} ID do documento criado
 */
export async function addToCart({ userId, productId }) {
  const item = createCartItem({ userId, productId });
  const ref  = await addDoc(cartCol, item);
  return ref.id;
}

/**
 * Retorna todos os itens do carrinho de um usuário.
 * @param {string} userId
 * @returns {Promise<Array<{ id: string, userId: string, productId: string, createdAt: string }>>}
 */
export async function getCartItems(userId) {
  const q    = query(cartCol, where('userId', '==', String(userId)));
  const snap = await getDocs(q);
  return snap.docs.map(docSnap => ({
    id:        docSnap.id,
    ...docSnap.data()
  }));
}

/**
 * Remove um item do carrinho pelo ID do documento.
 * @param {string} cartItemId
 * @returns {Promise<void>}
 */
export async function removeFromCart(cartItemId) {
  await deleteDoc(doc(db, 'cartItems', cartItemId));
}

// src/controllers/cartController.js
import axios from 'axios';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase.js';
import { createCartItem } from '../models/cartItem.js';

const cartCol = collection(db, 'cartItems');

/**
 * Adiciona um produto ao carrinho de um usuário e dispara notificação por e-mail.
 * @param {{ userId: string, productId: string }} data
 * @returns {Promise<string>} ID do documento criado
 */
export async function addToCart({ userId, productId }) {
  // Cria o item no Firestore
  const item = createCartItem({ userId, productId });
  const ref = await addDoc(cartCol, item);

  // Busca dados do usuário
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.exists() ? userSnap.data() : {};

  // Busca dados do produto
  const productRef = doc(db, 'products', productId);
  const productSnap = await getDoc(productRef);
  const productData = productSnap.exists() ? productSnap.data() : {};

  // Dispara notificação por e-mail via microserviço
  try {
    await axios.post('http://localhost:4000/notify/email', {
      to:      userData.email,
      subject: 'Produto adicionado ao carrinho',
      text:    `Olá ${userData.login}, você adicionou "${productData.name}" ao carrinho!`
    });
  } catch (err) {
    console.error('Falha ao enviar notificação:', err);
  }

  return ref.id;
}

/**
 * Retorna todos os itens do carrinho de um usuário.
 * @param {string} userId
 * @returns {Promise<Array<{ id: string, userId: string, productId: string }>>}
 */
export async function getCartItems(userId) {
  const q = query(cartCol, where('userId', '==', String(userId)));
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

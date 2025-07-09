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

export async function addToCart({ userId, productId }) {
  const item = createCartItem({ userId, productId });
  const ref  = await addDoc(cartCol, item);

  const userRef  = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.exists() ? userSnap.data() : {};

  const productRef  = doc(db, 'products', productId);
  const productSnap = await getDoc(productRef);
  const productData = productSnap.exists() ? productSnap.data() : {};

  try {
    await axios.post('http://localhost:4000/notify/email', {
      to:      userData.email,
      subject: 'Finalize sua compra antes que acabe o estoque!',
      text:    `Olá ${userData.login}, você adicionou "${productData.name}" ao carrinho. Conclua a compra enquanto ainda há estoque!`,
      html: `
        <h2>Produto adicionado ao carrinho:</h2>
        <p><strong>${productData.name}</strong></p>
        <p>Preço: R$ ${productData.price.toFixed(2)}</p>
        <img src="${productData.imageUrl}" alt="${productData.name}" width="200" />
        <p>Finalize sua compra agora antes que o estoque acabe!</p>
      `
    });
  } catch (err) {
    console.error('Falha ao enviar notificação:', err);
  }

  return ref.id;
}

export async function getCartItems(userId) {
  const q    = query(cartCol, where('userId', '==', String(userId)));
  const snap = await getDocs(q);
  return snap.docs.map(docSnap => ({
    id:        docSnap.id,
    ...docSnap.data()
  }));
}

export async function removeFromCart(cartItemId) {
  await deleteDoc(doc(db, 'cartItems', cartItemId));
}

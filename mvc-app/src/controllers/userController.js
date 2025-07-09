// src/controllers/userController.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db }                               from '../firebase.js';


export async function authenticateUser({ login, senha }) {
  if (!login || !senha) {
    throw new Error('Os campos "login" e "senha" são obrigatórios.');
  }

  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('login', '==', String(login)),
    where('senha',  '==', String(senha))
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    return null;
  }

  const docSnap = snap.docs[0];
  const data    = docSnap.data();

  return {
    id:    docSnap.id,
    login: data.login,
    email: data.email || ''   
  };
}
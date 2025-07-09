// src/controllers/userController.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db }                               from '../firebase.js';

/**
 * Tenta autenticar um usuário pelo login e senha.
 * @param {{ login: any, senha: any }} params
 * @returns {Promise<{ id: string, login: string } | null>}
 * @throws {Error} se login ou senha estiverem ausentes
 */
export async function authenticateUser({ login, senha }) {
  // validação básica dos campos
  if (!login || !senha) {
    throw new Error('Os campos "login" e "senha" são obrigatórios.');
  }

  // monta a query no Firestore
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('login', '==', String(login)),
    where('senha',  '==', String(senha))
  );

  // executa a consulta
  const snap = await getDocs(q);

  // se não encontrou, retorna null
  if (snap.empty) {
    return null;
  }

  // pega o primeiro documento que bateu
  const doc = snap.docs[0];
  return {
    id:    doc.id,
    login: doc.data().login
  };
}

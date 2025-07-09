// src/controllers/productController.js
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc
  } from 'firebase/firestore';
  import { db } from '../firebase.js';
  
  const productsCol = collection(db, 'products');
  
  /**
   * Insere um novo produto na coleção "products".
   * @param {{ name: string, price: number, imageUrl: string }} data
   * @returns {Promise<string>} ID do documento criado
   */
  export async function createProduct(data) {
    const ref = await addDoc(productsCol, data);
    return ref.id;
  }
  
  /**
   * Retorna todos os produtos da coleção.
   * @returns {Promise<Array<{ id: string, name: string, price: number, imageUrl: string }>>}
   */
  export async function listProducts() {
    const snap = await getDocs(productsCol);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
  
  /**
   * Busca um produto pelo seu ID.
   * @param {string} id
   * @returns {Promise<{ id: string, name: string, price: number, imageUrl: string }>}
   * @throws {Error} se não encontrar
   */
  export async function getProductById(id) {
    const ref = doc(db, 'products', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw new Error(`Produto com ID "${id}" não encontrado.`);
    }
    return { id: snap.id, ...snap.data() };
  }
  
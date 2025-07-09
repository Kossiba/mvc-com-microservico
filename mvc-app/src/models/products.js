// src/models/product.js

/**
 * Factory para criar um objeto Product
 * @param {{ name?: any, price?: any, imageUrl?: any }} data
 * @returns {{ name: string, price: number, imageUrl: string, createdAt: string }}
 */
export function createProduct({ name = '', price = 0, imageUrl = '' } = {}) {
    return {
      name:     String(name),
      price:    Number(price),
      imageUrl: String(imageUrl),
    };
  }
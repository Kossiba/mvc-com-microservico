//src/models/cartItem.js

/**
 * Cria um item de carrinho simples.
 * @param {{ userId: any, productId: any }} data
 * @returns {{ userId: string, productId: string, createdAt: string }}
 */
export function createCartItem({ userId, productId } = {}) {
  return {
    userId:    String(userId),
    productId: String(productId),
  };
}
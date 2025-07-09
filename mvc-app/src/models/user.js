// src/models/user.js

/**
 * Cria um objeto “user” com os campos login, senha e email (strings).
 * @param {{ login?: any, senha?: any, email?: any }} data
 * @returns {{ login: string, senha: string, email: string }}
 */
export function createUser({ login = '', senha = '', email = '' } = {}) {
  return {
    login: String(login),
    senha:  String(senha),
    email:  String(email)
  };
}

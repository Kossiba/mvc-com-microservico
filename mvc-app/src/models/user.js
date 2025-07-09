
// src/models/user.js

/**
 * Cria um objeto “user” com os campos login e senha (strings).
 * @param {{ login?: any, senha?: any }} data
 * @returns {{ login: string, senha: string }}
 */
export function createUser({ login = '', senha = '' } = {}) {
  return {
    login: String(login),
    senha:  String(senha)
  };
}

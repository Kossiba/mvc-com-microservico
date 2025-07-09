// src/views/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { authenticateUser } from '../controllers/userController.js';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const user = await authenticateUser({ login, senha });
      if (user) {
        // armazena o ID do usuário no localStorage
        localStorage.setItem('userId', user.id);
        navigate('/produtos');
      } else {
        setError('Login ou senha incorretos.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="login">Usuário</label>
        <input
          id="login"
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

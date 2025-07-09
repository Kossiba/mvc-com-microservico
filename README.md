# Aplicação Web MVC - Loja Online

Este projeto é uma aplicação web de loja virtual utilizando arquitetura MVC com React no front-end e Firebase Firestore como banco de dados. 

---

## 📦 Requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

---

## 🚀 Instalação e Execução Local

### 1. Clone o repositório
```bash
git clone https://github.com/Kossiba/ArquiteturaMVC.git
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configuração do Firebase
Este projeto já está conectado a um projeto Firebase **com regras públicas de demonstração**. 
Você pode executar a aplicação diretamente **sem criar conta** ou configurar nada adicional.

> **Nota:** Este Firestore permite leitura e escrita pública apenas para fins educacionais.

### 4. Inicie a aplicação
```bash
npm start
# ou
yarn start
```
A aplicação será executada em `http://localhost:3000`

---

## 🧱 Estrutura do Projeto

```
├── public/
├── src/
│   ├── components/
│   │   └── CartIcon.jsx
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── models/
│   │   ├── user.js
│   │   ├── product.js
│   │   └── cartItem.js
│   ├── views/
│   │   ├── Login.jsx
│   │   ├── Produtos.jsx
│   │   ├── ProdutoDetalhe.jsx
│   │   └── Cart.jsx
│   ├── firebase.js
│   ├── App.js
│   └── index.js
```

---

## ✅ Funcionalidades

- Login e autenticação de usuário
- Listagem de produtos
- Detalhe do produto
- Adicionar ou remover produto do carrinho
- Visualização do carrinho com opção de remoção

---

## 👨‍💻 Desenvolvedores

- Gabriel Kosiba de Melo

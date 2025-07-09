// src/firebase.js
import { initializeApp }       from "firebase/app";
import { getFirestore }        from "firebase/firestore";

const firebaseConfig = {
  apiKey:        "AIzaSyCbB53MAHhmVDPKT7nZz8cPRC4tiZpOHJU",
  authDomain:    "arquiteturamvc-5d908.firebaseapp.com",
  projectId:     "arquiteturamvc-5d908",
  storageBucket: "arquiteturamvc-5d908.appspot.com",  
  messagingSenderId: "1020420324584",
  appId:         "1:1020420324584:web:6e3b7a3ced667db359dd5d"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Importa o Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAgwUTG5_manKE2_QNid9__0PXkzwVNhJ4",
  authDomain: "cgos-8a422.firebaseapp.com",
  projectId: "cgos-8a422",
  storageBucket: "cgos-8a422.firebasestorage.app",
  messagingSenderId: "341821369721",
  appId: "1:341821369721:web:7c4b47483530e3f29a13a8"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(app);
export const db = getFirestore(app);

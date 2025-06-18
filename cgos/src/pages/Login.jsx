import "./App.css";
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const registrar = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Usuário registrado");
    } catch (err) {
      alert(err.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado");
    } catch (err) {
      alert(err.message);
    }
  };

  const sair = async () => {
    await signOut(auth);
    alert("Deslogado");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login / Registro</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      /><br />
      <button onClick={login}>Login</button>
      <button onClick={registrar} style={{ marginLeft: 10 }}>Registrar</button><br />
      <button onClick={sair} style={{ marginTop: 10 }}>Sair</button>
    </div>
  );
}

import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Logado com sucesso");
    } catch (err) {
      console.error(err);
      alert("Erro no login");
    }
  };

  const registrar = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Usuário criado");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar usuário");
    }
  };

  return (
    <div>
      <h1>Login / Registro</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
      <br />
      <button onClick={login}>Entrar</button>
      <button onClick={registrar}>Registrar</button>
    </div>
  );
}

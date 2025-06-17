import { useEffect, useState } from "react";
import { criarProjeto, listarProjetos, apagarProjeto } from "../services/ProjetoService";
import { useNavigate } from "react-router-dom";

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const lista = await listarProjetos();
    setProjetos(lista);
  };

  const criar = async () => {
    const id = await criarProjeto(nome, descricao);
    setNome("");
    setDescricao("");
    carregar();
    navigate(`/canvas/${id}`);
  };

  const excluir = async (id) => {
    await apagarProjeto(id);
    carregar();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Meus Projetos</h1>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button onClick={criar}>Criar Projeto</button>

      <ul>
        {projetos.map((p) => (
          <li key={p.id}>
            <b>{p.nome}</b> - {p.descricao}
            <button onClick={() => navigate(`/canvas/${p.id}`)}>
              Abrir
            </button>
            <button onClick={() => excluir(p.id)} style={{ marginLeft: 10 }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

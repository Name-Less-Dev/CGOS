import { useEffect, useState } from "react";
import { listarComponentes } from "../services/ComponentService";
import { importarComponente, listarImportacoesDoUsuario } from "../services/ImportService";
import { registrarCriacao, listarComponentesCriados } from "../services/CreateService";

export default function ImportarCriar() {
  const [componentes, setComponentes] = useState([]);
  const [importados, setImportados] = useState([]);
  const [criados, setCriados] = useState([]);

  useEffect(() => {
    async function carregar() {
      setComponentes(await listarComponentes());
      setImportados(await listarImportacoesDoUsuario());
      setCriados(await listarComponentesCriados());
    }
    carregar();
  }, []);

  return (
    <div>
      <h2>Componentes disponíveis</h2>
      <ul>
        {componentes.map(c => (
          <li key={c.id}>
            {c.type} - {c.description}
            <button onClick={() => importarComponente(c.id)}>Importar</button>
            <button onClick={() => registrarCriacao(c.id)}>Registrar Criação</button>
          </li>
        ))}
      </ul>

      <h2>Importados por mim</h2>
      <ul>
        {importados.map(i => (
          <li key={i.id}>{i.componentId} (importado)</li>
        ))}
      </ul>

      <h2>Criados por mim</h2>
      <ul>
        {criados.map(i => (
          <li key={i.id}>{i.componentId} (criado)</li>
        ))}
      </ul>
    </div>
  );
}

import "./Canvas.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import {
  salvarComponenteNoProjeto,
  carregarComponentesDoProjeto,
  limparProjeto,
} from "../services/CanvasService";

import { gerarHTML, gerarReact } from "../services/ExportService";

import { auth } from "../firebase";

function DraggableComponent({ id, x, y, type }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const style = {
    transform: `translate(${x}px, ${y}px)`,
    border: "1px solid #333",
    padding: "8px",
    background: "white",
    position: "absolute",
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {type}
    </div>
  );
}

function DroppableCanvas({ children }) {
  const { setNodeRef } = useDroppable({ id: "canvas" });

  const style = {
    width: "800px",
    height: "600px",
    border: "2px dashed #888",
    position: "relative",
    margin: "auto",
    background: "#f9f9f9",
  };

  return <div ref={setNodeRef} style={style}>{children}</div>;
}

export default function CanvasPage() {
  const { id: projectId } = useParams();
  const [componentes, setComponentes] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      carregarComponentesDoProjeto(projectId).then(setComponentes);
    }
  }, [projectId]);

  const adicionarComponente = async () => {
    const novo = {
      id: `comp-${Date.now()}`,
      type: "Button",
      x: 50,
      y: 50,
    };
    setComponentes((prev) => [...prev, novo]);
    await salvarComponenteNoProjeto(projectId, novo);
  };

  const handleDragEnd = async (event) => {
    const { active, delta } = event;

    setComponentes((prev) => {
      const atualizados = prev.map((c) =>
        c.id === active.id
          ? { ...c, x: c.x + delta.x, y: c.y + delta.y }
          : c
      );

      const atualizado = atualizados.find((c) => c.id === active.id);
      salvarComponenteNoProjeto(projectId, atualizado);

      return atualizados;
    });
  };

  const limpar = async () => {
    await limparProjeto(projectId);
    setComponentes([]);
  };

  const exportarHTML = () => {
    const codigo = gerarHTML(componentes);
    console.log(codigo);
    alert("Código HTML gerado. Veja no console.");
  };

  const exportarReact = () => {
    const codigo = gerarReact(componentes);
    console.log(codigo);
    alert("Código React gerado. Veja no console.");
  };

  if (!auth.currentUser) {
    return <h2 style={{ textAlign: "center" }}>Por favor, faça login para usar o Canvas.</h2>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Canvas Projeto: {projectId}</h1>
      <button onClick={adicionarComponente}>Adicionar Componente</button>
      <button onClick={limpar} style={{ marginLeft: 10 }}>
        Limpar Projeto
      </button>
      <button onClick={exportarHTML} style={{ marginLeft: 10 }}>
        Exportar HTML
      </button>
      <button onClick={exportarReact} style={{ marginLeft: 10 }}>
        Exportar React
      </button>

      <DndContext onDragEnd={handleDragEnd}>
        <DroppableCanvas>
          {componentes.map((comp) => (
            <DraggableComponent
              key={comp.id}
              id={comp.id}
              x={comp.x}
              y={comp.y}
              type={comp.type}
            />
          ))}
        </DroppableCanvas>
      </DndContext>
    </div>
  );
}

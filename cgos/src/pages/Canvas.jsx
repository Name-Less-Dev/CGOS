import { useEffect, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import {
  salvarComponenteNoCanvas,
  carregarComponentesDoCanvas,
  limparCanvas,
} from "../services/CanvasService";

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
  const [componentes, setComponentes] = useState([]);

  // Carregar componentes no início
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      carregarComponentesDoCanvas().then(setComponentes);
    }
  }, []);

  const adicionarComponente = async () => {
    const novo = {
      id: `comp-${Date.now()}`,
      type: "Button",
      x: 50,
      y: 50,
    };
    setComponentes((prev) => [...prev, novo]);
    await salvarComponenteNoCanvas(novo);
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
      salvarComponenteNoCanvas(atualizado);

      return atualizados;
    });
  };

  const limpar = async () => {
    try {
      await limparCanvas();
      setComponentes([]);
      alert("Canvas limpo com sucesso!");
    } catch (error) {
      console.error("Erro ao limpar:", error);
      alert("Erro ao limpar o canvas");
    }
  };

  if (!auth.currentUser) {
    return <h2 style={{ textAlign: "center" }}>Por favor, faça login para usar o Canvas.</h2>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Canvas Visual CGOS</h1>
      <button onClick={adicionarComponente}>Adicionar Componente</button>
      <button onClick={limpar} style={{ marginLeft: 10 }}>
        Limpar Canvas
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

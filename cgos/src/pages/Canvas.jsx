import { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

function DraggableComponent({ id, x, y, type, onDragEnd }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate(${x}px, ${y}px)`,
    border: "1px solid #333",
    padding: "8px",
    background: "white",
    position: "absolute",
    cursor: "move",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
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

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default function CanvasPage() {
  const [componentes, setComponentes] = useState([]);

  const adicionarComponente = () => {
    const novo = {
      id: `comp-${Date.now()}`,
      type: "Button",
      x: 50,
      y: 50,
    };
    setComponentes((prev) => [...prev, novo]);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;

    setComponentes((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              x: c.x + delta.x,
              y: c.y + delta.y,
            }
          : c
      )
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Canvas Visual CGOS</h1>
      <button onClick={adicionarComponente}>Adicionar Componente</button>

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

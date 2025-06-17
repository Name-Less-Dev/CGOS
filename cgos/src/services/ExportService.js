export function gerarHTML(componentes) {
  return componentes
    .map((c) => {
      switch (c.type) {
        case "Button":
          return `<button style="position:absolute; left:${c.x}px; top:${c.y}px;">Botão</button>`;
        case "Input":
          return `<input placeholder="Digite" style="position:absolute; left:${c.x}px; top:${c.y}px;" />`;
        case "Label":
          return `<label style="position:absolute; left:${c.x}px; top:${c.y}px;">Texto</label>`;
        default:
          return `<!-- ${c.type} não mapeado -->`;
      }
    })
    .join("\n");
}

export function gerarReact(componentes) {
  return componentes
    .map((c) => {
      switch (c.type) {
        case "Button":
          return `<button style={{position: 'absolute', left: ${c.x}, top: ${c.y}}}>Botão</button>`;
        case "Input":
          return `<input placeholder="Digite" style={{position: 'absolute', left: ${c.x}, top: ${c.y}}} />`;
        case "Label":
          return `<label style={{position: 'absolute', left: ${c.x}, top: ${c.y}}}>Texto</label>`;
        default:
          return `{/* ${c.type} não mapeado */}`;
      }
    })
    .join("\n");
}

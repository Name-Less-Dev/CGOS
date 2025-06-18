import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CanvasPage from "./pages/Canvas";
import Login from "./pages/Login";
import Projetos from "./pages/Projetos";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ textAlign: "center", marginBottom: 20 }}>
        <Link to="/">Projetos</Link> | <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Projetos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/canvas/:id" element={<CanvasPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

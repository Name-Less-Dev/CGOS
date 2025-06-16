import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CanvasPage from "./pages/Canvas";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ textAlign: "center", marginBottom: 20 }}>
        <Link to="/">Canvas</Link> | <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CanvasPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

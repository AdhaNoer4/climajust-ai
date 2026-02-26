import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/peta-risiko" element={<h1>Peta Risiko</h1>} />
      <Route path="/laporan" element={<h1>Laporan</h1>} />
    </Routes>
  );
}

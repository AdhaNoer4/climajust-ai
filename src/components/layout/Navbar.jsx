import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar({ onSelectCity }) {
  const [input, setInput] = useState("");
  const [searchError, setSearchError] = useState("");

  async function handleSearch() {
  const value = input.trim();
  if (!value) {
    setSearchError("Masukkan nama lokasi");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/locations/search?q=${value}`);
    const data = await res.json();

    if (data.length === 0) {
      setSearchError(`Lokasi "${value}" tidak ditemukan`);
      return;
    }

    // Ambil hasil pertama
    onSelectCity(data[0].name);
    setSearchError("");
    setInput("");
  } catch (err) {
    setSearchError("Gagal mencari lokasi");
  }
}
const [suggestions, setSuggestions] = useState([]);

async function handleInputChange(e) {
  const value = e.target.value;
  setInput(value);
  setSearchError("");

  if (value.length < 2) {
    setSuggestions([]);
    return;
  }

  const res = await fetch(`http://localhost:5000/api/locations/search?q=${value}`);
  const data = await res.json();
  setSuggestions(data);
}
  

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-white/80 backdrop-blur-md rounded-full shadow flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/climajust-ai-logo.png" alt="ClimaJust AI Logo" className="w-8 h-8 object-contain" />
            <span className="font-semibold text-sky-700">ClimaJust AI</span>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex gap-20 text-sm">
            <NavLink to="/" className={({ isActive }) => `relative pb-1 ${isActive ? "font-medium text-sky-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-sky-600" : "text-gray-700 hover:text-sky-600"}`}>
              Beranda
            </NavLink>

            <NavLink
              to="/peta-risiko"
              className={({ isActive }) => `relative pb-1 ${isActive ? "font-medium text-sky-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-sky-600" : "text-gray-700 hover:text-sky-600"}`}
            >
              Peta Risiko
            </NavLink>

            <NavLink
              to="/laporan"
              className={({ isActive }) => `relative pb-1 ${isActive ? "font-medium text-sky-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-sky-600" : "text-gray-700 hover:text-sky-600"}`}
            >
              Laporan
            </NavLink>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 relative w-72">
              <input
                value={input}
            onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Cari lokasi..."
                className={`w-full pl-4 pr-10 py-2 rounded-xl border border-slate-300 
                   focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm ${searchError ? "border-red-500" : ""}`}
              />
              {input && (
                <button type="button"
                  onClick={() => {
  setInput("");
  setSuggestions([]);
}}
                  className="absolute right-8 top-1/2 -translate-y-1/2 
                   text-slate-500 hover:text-sky-600 transition"
                >
                  ✕
                </button>
              )}
              {suggestions.length > 0 && (
  <div className="absolute top-10 left-0 w-full bg-white rounded-xl shadow-lg z-50 overflow-hidden">
    {suggestions.map(loc => (
      <button
        key={loc.adm4_code}
        onClick={() => {
          onSelectCity(loc.name);
          setInput("");
          setSuggestions([]);
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-sky-50"
      >
        {loc.name}
      </button>
    ))}
  </div>
)}
              <button type="button"
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 
                   text-slate-500 hover:text-sky-600 transition"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {searchError && <div className="absolute -bottom-6 left-0 text-xs text-red-500">{searchError}</div>}
            </div>
            <button className="px-4 py-2 rounded-full bg-sky-600 text-white text-sm hover:bg-sky-700">Login</button>
          </div>
        </div>
      </div>
    </header>
  );
}

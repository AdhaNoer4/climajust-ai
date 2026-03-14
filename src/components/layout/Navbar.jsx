import { NavLink } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../../auth/LoginModal";
import RegisterModal from "../../auth/RegisterModal";
import { Search, Menu, X } from "lucide-react";

export default function Navbar({ onSelectCity, user, onLoginSuccess, onLogout }) {
  const [input, setInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  async function handleSearch() {
    const value = input.trim();
    if (!value) {
      setSearchError("Masukkan nama lokasi");
      return;
    }

    try {
      const res = await fetch(`${API}/locations/search?q=${value}`);
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

    const res = await fetch(`${API}/locations/search?q=${value}`);
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
            {/* Hamburger Mobile */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-3 relative w-72">
              <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Cari lokasi..."
                className={`w-full pl-4 pr-10 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm ${searchError ? "border-red-500" : ""}`}
              />
              {input && (
                <button
                  type="button"
                  onClick={() => {
                    setInput("");
                    setSuggestions([]);
                  }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-600 transition"
                >
                  ✕
                </button>
              )}
              {suggestions.length > 0 && (
                <div className="absolute top-10 left-0 w-full bg-white rounded-xl shadow-lg z-50 overflow-hidden">
                  {suggestions.map((loc) => (
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
              <button type="button" onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-600 transition">
                <Search size={18} strokeWidth={1.5} />
              </button>
              {searchError && <div className="absolute -bottom-6 left-0 text-xs text-red-500">{searchError}</div>}
            </div>

            {/* ✅ Tampilkan user atau tombol login */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-sky-700 font-medium">👤 {user.nama}</span>
                <button onClick={onLogout} className="px-4 py-2 rounded-full border border-sky-600 text-sky-600 text-sm hover:bg-sky-50">
                  Keluar
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="px-4 py-2 rounded-full bg-sky-600 text-white text-sm hover:bg-sky-700">
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white rounded-2xl shadow-lg p-4 space-y-4 animate-fade-in">
          {/* Menu */}
          <nav className="flex flex-col gap-3 text-sm">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-sky-600">
              Beranda
            </NavLink>

            <NavLink to="/peta-risiko" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-sky-600">
              Peta Risiko
            </NavLink>

            <NavLink to="/laporan" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-sky-600">
              Laporan
            </NavLink>
          </nav>

          {/* Search Mobile */}
          <div className="relative">
            <input
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Cari lokasi..."
              className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-400 text-sm"
            />

            <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              <Search size={18} />
            </button>
          </div>

          {/* Login Mobile */}
          {user ? (
            <button onClick={onLogout} className="w-full py-2 rounded-xl border border-sky-600 text-sky-600 text-sm">
              Keluar
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)} className="w-full py-2 rounded-xl bg-sky-600 text-white text-sm">
              Login
            </button>
          )}
        </div>
      )}

      {/* ✅ Teruskan onLoginSuccess ke LoginModal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        openRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onLoginSuccess={onLoginSuccess}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        openLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </header>
  );
}

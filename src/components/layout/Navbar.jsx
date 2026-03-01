import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar({ onSelectCity }) {
  const [input, setInput] = useState("");

  function handleSearch() {
    const value = input.toLowerCase();

    if (value.includes("jebres")) {
      onSelectCity("jebres");
    }

    if (value.includes("laweyan")) {
      onSelectCity("laweyan");
    }
    setInput("");
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
            <div className="flex items-center gap-3 relative w-72" >
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Cari lokasi..." className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-300 
                   focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm" />

              <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 
                   text-slate-500 hover:text-sky-600 transition">
                <Search size={18} strokeWidth={1.5} />
              </button>
            </div>
            <button className="px-4 py-2 rounded-full bg-sky-600 text-white text-sm hover:bg-sky-700">Login</button>
          </div>
        </div>
      </div>
    </header>
  );
}

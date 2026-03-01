import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar({ onSelectCity }) {
  const [input, setInput] = useState("");
  const [searchError, setSearchError] = useState("");

  function handleSearch() {
    const value = input.toLowerCase().trim();
    
    if (!value) {
      setSearchError("Masukkan nama lokasi");
      return;
    }

    // Format nama kota sesuai dengan mapping
    // Contoh: "jebres" -> "Jebres, Surakarta"
    let formattedCity = "";
    
    if (value.includes("jebres")) {
      formattedCity = "Jebres, Surakarta";
    } else if (value.includes("laweyan")) {
      formattedCity = "Laweyan, Surakarta";
    } else if (value.includes("kemayoran") || value.includes("jakarta")) {
      formattedCity = "Kemayoran, Jakarta Pusat";
    } else {
      setSearchError(`Lokasi "${value}" tidak ditemukan`);
      return;
    }

    // Panggil fungsi dari parent (Home)
    onSelectCity(formattedCity);
    setSearchError("");
    setInput(""); // Kosongkan input setelah search
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
            <div className="flex items-center gap-3 relative">
              <div className="relative">
                <input 
                  value={input} 
                  onChange={(e) => {
                    setInput(e.target.value);
                    setSearchError("");
                  }} 
                  onKeyPress={handleKeyPress}
                  placeholder="Cari lokasi..." 
                  className={`border px-3 py-2 rounded-lg text-sm pr-8 ${searchError ? 'border-red-500' : ''}`}
                />
                {input && (
                  <button 
                    onClick={() => setInput("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button 
                onClick={handleSearch} 
                className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition"
              >
                Cari
              </button>
              {searchError && (
                <div className="absolute -bottom-6 left-0 text-xs text-red-500">
                  {searchError}
                </div>
              )}
            </div>
            <button className="px-4 py-2 rounded-full bg-sky-600 text-white text-sm hover:bg-sky-700">Login</button>
          </div>
        </div>
      </div>
    </header>
  );
}
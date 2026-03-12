import { useState } from "react"; // ✅ tambahkan ini
import LaporanForm from "../components/laporan/LaporanForm";
import LaporanTable from "../components/laporan/LaporanTable";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BgAwan from "../components/BgAwan";

export default function Laporan() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100">
      <Navbar
        onSelectCity={() => {}}
        user={user}
        onLoginSuccess={(userData) => {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        }}
        onLogout={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}
      />
      <BgAwan />
      <div className="max-w-5xl mx-auto bg-white/90 p-5 rounded-2xl px-4 space-y-10">
        <LaporanForm />
        <LaporanTable />
      </div>
      <Footer />
    </div>
  );
}
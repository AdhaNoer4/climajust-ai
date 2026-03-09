import LaporanForm from "../components/laporan/LaporanForm";
import LaporanTable from "../components/laporan/LaporanTable";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { BgAwan } from "../components/BgAwan";

export default function Laporan() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100">
      <Navbar />
      <BgAwan />

      {/* Container */}
      <div className="max-w-5xl mx-auto bg-white/90 p-5 rounded-2xl px-4 space-y-10">
      
        <LaporanForm />

        <LaporanTable />
      </div>
        <Footer />
    </div>
  );
}

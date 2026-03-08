import LaporanForm from "../components/laporan/LaporanForm";
import LaporanTable from "../components/laporan/LaporanTable";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Laporan() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-100">
      <Navbar />    
      {/* Title */}
      <div className="text-center pt-24 pb-10">
        <h1 className="text-4xl font-semibold text-gray-800">Laporan Warga</h1>
      </div>

      {/* Container */}
      <div className="max-w-5xl mx-auto bg-white/70 p-5 rounded-2xl px-4 space-y-10">
        <LaporanForm />

        <LaporanTable />
      </div>
        <Footer />
    </div>
  );
}

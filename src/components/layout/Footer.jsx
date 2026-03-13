import { Cloud, Map, Scale, CheckCircle, Fish, Hammer, Heart, Shield, BarChart3, Brain } from "lucide-react";
import twitterIcon from "../../assets/sosmed/x-twitter-brands-solid-full.svg";
import whatsAppIcon from "../../assets/sosmed/whatsapp-brands-solid-full.svg";
import instagramIcon from "../../assets/sosmed/instagram-brands-solid-full.svg";
import tiktokIcon from "../../assets/sosmed/tiktok-brands-solid-full.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    { name: "Beranda", path: "/" },
    { name: "Peta Risiko", path: "/peta-risiko" },
    { name: "Laporan Warga", path: "/laporan" },
   
  ];
  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-br from-sky-100 via-blue-100 to-sky-200 pt-20 pb-12 px-6">
      {/* Floating Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-16 bg-white/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-20 bg-white/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-12 bg-white/30 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* NAVIGASI */}
          <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Navigasi</h3>

            <ul className="space-y-4 text-slate-700 text-sm">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-sky-600 transition duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-6 mt-8 text-sky-600">
              <Cloud size={22} />
              <Map size={22} />
              <Scale size={22} />
            </div>
          </div>

          {/* FOKUS & SUMBER */}
          <div className="space-y-8">
            <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Fokus Kami</h3>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-500" /> Petani Kecil
                </li>
                <li className="flex items-center gap-3">
                  <Fish size={18} className="text-sky-500" /> Nelayan Tradisional
                </li>
                <li className="flex items-center gap-3">
                  <Hammer size={18} className="text-amber-500" /> Buruh Harian
                </li>
                <li className="flex items-center gap-3">
                  <Heart size={18} className="text-pink-500" /> Wilayah Rentan Iklim
                </li>
              </ul>
            </div>

            <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Sumber Data</h3>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <Cloud size={18} /> Data cuaca & iklim
                </li>
                <li className="flex items-center gap-3">
                  <BarChart3 size={18} /> Laporan masyarakat
                </li>
              </ul>
            </div>
          </div>

          {/* TRANSPARANSI */}
          <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Transparansi AI</h3>

            <p className="text-sm text-slate-700 mb-6 leading-relaxed">ClimaJust AI menggunakan AI untuk analisis risiko iklim dan kerentanan sosial.</p>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <Shield size={18} /> Tidak menyimpan data pribadi sensitif
              </li>
              <li className="flex gap-3">
                <BarChart3 size={18} /> Rekomendasi berbasis data & konteks lokal
              </li>
              <li className="flex gap-3">
                <Brain size={18} /> AI sebagai alat bantu, bukan pengganti keputusan manusia
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-6 mt-8 text-sky-600 text-lg">
              <span className="hover:scale-110 transition cursor-pointer">
                <img src={twitterIcon} alt="Twitter" className="w-6 h-6" />
              </span>
              <span className="hover:scale-110 transition cursor-pointer">
                <img src={whatsAppIcon} alt="WhatsApp" className="w-6 h-6" />
              </span>
              <span className="hover:scale-110 transition cursor-pointer">
                <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
              </span>
              <span className="hover:scale-110 transition cursor-pointer">
                <img src={tiktokIcon} alt="TikTok" className="w-6 h-6" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 text-center text-slate-700">
          <p className="text-lg">
            © 2026 <span className="font-semibold text-sky-700">ClimaJust AI</span>
          </p>
          <p className="text-sm mt-2">Dibuat untuk mendukung keadilan iklim dan ketahanan sosial</p>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";

export default function RegisterModal({ isOpen, onClose, openLogin }) {
  const [form, setForm] = useState({
    nama: "",
    pekerjaan: "",
    email: "",
    password: "",
    lokasi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegister() {
    if (!form.nama || !form.email || !form.password || !form.pekerjaan) {
      setError("Semua field wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mendaftar");

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        openLogin();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl w-[600px] z-10 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700">
          ✕
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800">Daftar</h1>
        <p className="text-center text-gray-500 mb-6">Buat akun barumu</p>
        <div className="flex justify-between gap-6">
          <div className="">
            {/* Nama */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Nama Lengkap</label>
              <input type="text" name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan nama lengkap" className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            {/* Pekerjaan */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Pekerjaan</label>
              <select name="pekerjaan" value={form.pekerjaan} onChange={handleChange} className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Pilih Pekerjaan</option>
                <option value="petani">Petani</option>
                <option value="nelayan">Nelayan</option>
                <option value="pengemudi">Pengemudi</option>
                <option value="pekerja_konstruksi">Pekerja Konstruksi</option>
                <option value="pedagang_kaki_lima">Pedagang Kaki Lima</option>
                <option value="ojek_online">Ojek Online</option>
                <option value="fotografer_luar_ruang">Fotografer Luar Ruang</option>
              </select>
            </div>

            {/* Lokasi */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Lokasi</label>
              <input
                type="text"
                name="lokasi"
                value={form.lokasi}
                onChange={handleChange}
                placeholder="Masukkan lokasi (opsional)"
                className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="ml-6">
            {/* Email */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Masukkan email" className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Buat password"
                className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Success */}
        {success && <p className="text-green-500 text-sm mb-3 text-center">Pendaftaran berhasil! Silakan login.</p>}

        {/* Button */}
        <button onClick={handleRegister} disabled={loading} className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition disabled:opacity-50">
          {loading ? "Mendaftar..." : "Daftar"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-5">
          Sudah punya akun?{" "}
          <span
            onClick={() => {
              onClose();
              openLogin();
            }}
            className="text-blue-500 cursor-pointer"
          >
            Masuk
          </span>
        </p>
      </div>
    </div>
  );
}

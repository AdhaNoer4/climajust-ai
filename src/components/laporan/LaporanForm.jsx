import { useState, useEffect } from "react";
import { Upload, CheckCircle } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function LaporanForm( {onSubmitSuccess} ) {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    judul: "",
    address: "",
    adm4Code: "",
    deskripsi: "",
    riskLevel: "",
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    
    fetch(`${apiUrl}/locations`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(() => setError("Gagal memuat data wilayah"));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleWilayah(e) {
    const adm4Code = e.target.value;
    const selected = locations.find(l => l.adm4_code === adm4Code);
    setForm(prev => ({ ...prev, address: selected?.name || "", adm4Code }));
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran foto maksimal 5MB");
      return;
    }
    setForm(prev => ({ ...prev, photo: file }));
    setPreview(URL.createObjectURL(file));
    setError("");
  }

  async function handleSubmit() {
    if (!form.judul || !form.adm4Code || !form.deskripsi || !form.riskLevel) {
      setError("Semua field wajib diisi");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("judul", form.judul);
      formData.append("address", form.address);
      formData.append("adm4Code", form.adm4Code);
      formData.append("deskripsi", form.deskripsi);
      formData.append("riskLevel", form.riskLevel);
      if (form.photo) formData.append("photo", form.photo);

    const res = await fetch(`${API}/laporan`, {
    method: "POST",
    body: formData, // Pastikan tidak ada headers "Content-Type" manual jika menggunakan formData
  });

      if (!res.ok) throw new Error("Gagal mengirim laporan");

      setSuccess(true);
      onSubmitSuccess?.();
      setForm({ judul: "", address: "", adm4Code: "", deskripsi: "", riskLevel: "", photo: null });
      setPreview(null);
    } catch (err) {
      setError("Gagal mengirim laporan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ if success dan return ada di DALAM fungsi komponen
  if (success) {
    return (
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-md flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <CheckCircle size={64} className="text-green-500" />
        <h2 className="text-2xl font-semibold text-gray-800">Laporan Terkirim!</h2>
        <p className="text-gray-500 text-sm">Terima kasih, laporan kamu sedang diproses.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Kirim Laporan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-md">
      <div className="space-y-6">
        <div className="text-center pt-5 pb-10">
          <h1 className="text-4xl font-semibold text-gray-800">Laporan Warga</h1>
        </div>

        {/* Judul */}
        <div>
          <label className="block mb-2 font-medium">Judul Laporan</label>
          <input
            type="text"
            name="judul"
            value={form.judul}
            onChange={handleChange}
            placeholder="Contoh: Banjir di RT 05"
            className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Wilayah */}
          <div>
            <label className="block mb-2 font-medium">Wilayah</label>
            <select
              name="adm4Code"
              value={form.adm4Code}
              onChange={handleWilayah}
              className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Pilih Wilayah</option>
              {locations.map(loc => (
                <option key={loc.adm4_code} value={loc.adm4_code}>{loc.name}</option>
              ))}
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block mb-2 font-medium">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows="3"
              placeholder="Jelaskan kondisi yang terjadi..."
              className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Risk Level */}
        <div>
          <label className="block mb-2 font-medium">Tingkat Risiko</label>
          <div className="flex gap-4">
            {[
              { value: "low", label: "Rendah", color: "green" },
              { value: "medium", label: "Sedang", color: "orange" },
              { value: "high", label: "Tinggi", color: "red" },
            ].map(({ value, label, color }) => (
              <label
                key={value}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                  form.riskLevel === value
                    ? `border-${color}-500 bg-${color}-50`
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="riskLevel"
                  value={value}
                  checked={form.riskLevel === value}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className={`text-${color}-500 font-medium text-sm`}>● {label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Upload Foto */}
        <div>
          <label className="block mb-2 font-medium">Upload Foto</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition-colors">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-40 rounded-lg object-cover" />
            ) : (
              <>
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Klik untuk upload foto</p>
                <p className="text-xs text-gray-400">JPG, PNG, Maks. 5MB</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
          </label>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim Laporan"}
        </button>
      </div>
    </div>
  );
} // ✅ kurung tutup komponen di sini
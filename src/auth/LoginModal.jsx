import { useState } from "react";

export default function LoginModal({ isOpen, onClose, openRegister, onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleLogin() {
    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal login");

      // Simpan data user ke localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      onLoginSuccess(data.user); // kirim data user ke parent
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl w-[400px] z-10 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700">✕</button>

        <h1 className="text-3xl font-bold text-center text-gray-800">Masuk</h1>
        <p className="text-center text-gray-500 mb-6">Selamat datang kembali!</p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Masukkan email"
            className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Masukkan password"
            className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <p className="text-right text-sm text-blue-500 mb-4 cursor-pointer">Lupa password?</p>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Masuk..." : "Masuk"}
        </button>

        <div className="block text-center text-sm text-gray-500 mt-5">
          Belum punya akun?{" "}
          <span onClick={() => { onClose(); openRegister(); }} className="text-blue-500 cursor-pointer">
            Daftar
          </span>
        </div>
 {/* Google */}
        {/* <button className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
          Masuk dengan Google
        </button> */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-gray-400 text-sm">atau</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
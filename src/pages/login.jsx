import { NavLink } from "react-router-dom";
import BgAwan from "../components/BgAwan";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100">
       <BgAwan />
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Masuk
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Selamat datang kembali!
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <p className="text-right text-sm text-blue-500 mb-4 cursor-pointer">
          Lupa password?
        </p>

        {/* Button */}
        <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition">
          Masuk
        </button>

        <NavLink
              to="/register"
              className="text-center text-sm text-gray-500 mt-5"
            >Belum punya akun? <span className="text-blue-500 cursor-pointer">Daftar</span>
            </NavLink>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-gray-400 text-sm">atau</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Google */}
        <button className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Masuk dengan Google
        </button>

      </div>
    </div>
  );
}
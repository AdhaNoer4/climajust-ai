# 🌦️ ClimaJust.ai
### *AI-Powered Weather Insights & Actionable Recommendations*

[![Status](https://img.shields.io/badge/Status-Development-orange)](#) 
[![License](https://img.shields.io/badge/License-Educational-blue)](#)
[![Tech](https://img.shields.io/badge/Powered%20By-Artificial%20Intelligence-green)](#)

---

## 📖 Deskripsi Proyek
**ClimaJust.ai** adalah platform berbasis web yang dirancang untuk menyediakan prediksi cuaca cerdas serta rekomendasi tindakan nyata bagi masyarakat. Berbeda dengan aplikasi cuaca biasa, sistem kami berfokus pada bagaimana cuaca memengaruhi aktivitas sektor pekerjaan spesifik seperti **pekerja konstruksi, petani, pengemudi**, dan tenaga lapangan lainnya.

Dengan integrasi **Artificial Intelligence**, ClimaJust.ai menganalisis data cuaca untuk memberikan panduan keselamatan dan efisiensi kerja yang kontekstual.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| 🔮 **Prediksi Cuaca** | Informasi cuaca akurat pada wilayah tertentu secara real-time. |
| 🧠 **Rekomendasi Berbasis AI** | Analisis tindakan otomatis sesuai dengan jenis pekerjaan atau aktivitas pengguna. |
| 📢 **Laporan Masyarakat** | Fitur bagi pengguna untuk melaporkan kondisi cuaca langsung dari lokasi mereka. |
| ✅ **Validasi AI** | Setiap laporan warga divalidasi oleh sistem AI untuk menjamin akurasi data. |
| 📊 **Visualisasi Info** | Penyajian data cuaca dalam bentuk visual yang intuitif dan mudah dipahami. |

---

## 📊 Sumber Data (Data Sources)
Kami menggunakan data dari institusi resmi untuk menjamin kredibilitas informasi:
* **BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)**: Sumber utama data prakiraan cuaca dan kondisi atmosfer.
* **BPS (Badan Pusat Statistik)**: Data referensi kewilayahan untuk akurasi lokasi.

---

## 🛠️ Tech Stack
* **Frontend**: React.js, Vite, Tailwind CSS, Lucide React.
* **Backend**: Node.js, Express, Multer, JWT, Bcrypt.

---

## 🚀 Instalasi Lokal

### 1. Clone & Setup
    ```bash
    git clone [https://github.com/AdhaNoer4/climajust-ai.git](https://github.com/AdhaNoer4/climajust-ai.git)
    cd climajust-ai

### 2. Jalankan Backend ⚙️
    ```bash
    cd climajust-backend
    npm install
    npm run dev
    
Berjalan di: http://localhost:5000

### 3. Buat file .env di dalam folder backend dengan isi berikut (sesuaikan nilai sesuai kebutuhan):
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=          # password MySQL kamu
    DB_NAME=climajust_db
    DB_PORT=3306
    JWT_SECRET=supersecretkeypanjangminimal32karakter
    GEMINI_API_KEY=your-google-gemini-api-key
    BPS_API_KEY=your-bps-api-key-if-any
    PORT=5000

### 4. Buat Database
    ```bash
    Buat database kosong bernama climajust_db
    import database climajust_db.sql ke dalamnya

### 5. Jalankan Frontend 🎨
    ```bash
    cd climajust-ai
    npm install
    npm run dev

Berjalan di: http://localhost:5173

Buka browser di alamat tersebut untuk melihat tampilan.

👥 Tim Pengembang

Proyek ini dikembangkan oleh mahasiswa Universitas Surakarta untuk tujuan kompetisi:

    Fahrudin Ahmad Habibie

    Adha Noer Hidayahtulloh

    David Dwi Saputra

📄 Lisensi

Seluruh kode sumber dapat digunakan untuk keperluan pembelajaran dengan tetap mencantumkan kredit kepada pengembang asli.

Built with ❤️ by Team ClimaJust.ai

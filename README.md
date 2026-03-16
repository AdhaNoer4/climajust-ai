🌦️ ClimaJust.ai
AI-Powered Weather Insights & Actionable Recommendations
📖 Deskripsi Proyek

ClimaJust.ai bukan sekadar aplikasi prakiraan cuaca biasa. Platform ini dirancang khusus untuk membantu masyarakat—terutama pekerja lapangan seperti petani, kuli bangunan, dan pengemudi—dalam mengambil keputusan tepat berdasarkan kondisi alam.

Dengan integrasi Artificial Intelligence, ClimaJust.ai menganalisis data cuaca mentah menjadi instruksi tindakan nyata yang kontekstual, memastikan produktivitas tetap terjaga dan keselamatan selalu utama.
✨ Fitur Utama
Fitur	Deskripsi
🔮 AI Weather Prediction	Prediksi cuaca akurat untuk wilayah spesifik pilihan Anda.
🧠 Actionable Insights	Rekomendasi tindakan otomatis dari AI berdasarkan profesi pengguna.
📢 Community Report	Pengguna dapat melaporkan kondisi cuaca real-time di lokasi mereka.
✅ AI Validation	Setiap laporan publik divalidasi oleh AI untuk menjaga akurasi informasi.
📊 Smart Visualization	Visualisasi data yang intuitif dan mudah dipahami oleh siapa saja.
🛠️ Tech Stack
Bagian	Teknologi
Frontend	React.js, Vite, Lucide React, Tailwind CSS
Backend	Node.js, Express, Multer, JWT, Bcrypt
Database	(Sesuai konfigurasi backend)
AI Engine	Weather Data Analysis & Validation System

📊 Sumber Data (Data Sources)

Proyek ini mengintegrasikan data dari penyedia layanan data resmi untuk memastikan akurasi informasi:

    BMKG (Badan Meteorologi, Klimatologi, dan Geofisika): Digunakan sebagai sumber utama data prakiraan cuaca, suhu, kelembapan, dan kondisi atmosfer secara real-time.

    BPS (Badan Pusat Statistik): Digunakan untuk pengolahan data kontekstual wilayah dan demografi guna mendukung akurasi rekomendasi berbasis lokasi.

🚀 Panduan Instalasi

Ikuti langkah-langkah berikut untuk menjalankan ClimaJust.ai di lingkungan lokal Anda:
1. Persiapan Awal
Bash

# Clone repository
git clone https://github.com/AdhaNoer4/climajust-ai.git

# Masuk ke folder
cd climajust-ai

2. Konfigurasi Backend ⚙️
Bash

cd backend
npm install
npm install multer bcrypt jsonwebtoken
npm run dev

    🌐 Backend akan berjalan di: http://localhost:5000

3. Konfigurasi Frontend 🎨
Bash

cd ../frontend
npm install
npm install lucide-react
npm run dev

    🌐 Frontend akan berjalan di: http://localhost:5173

💡 Cara Penggunaan
🔓 Tanpa Login

    Akses ClimaJust.ai.

    Pilih lokasi target.

    Lihat prediksi cuaca dan rekomendasi umum dari AI.

🔐 Dengan Login (Fitur Personalisasi)

    Registrasi: Masukkan Nama, Email, dan Pekerjaan Spesifik Anda.

    Dashboard: Sistem akan memberikan rekomendasi yang dipersonalisasi sesuai jenis pekerjaan Anda terhadap cuaca saat ini.

    Kontribusi: Kirim laporan cuaca terkini untuk membantu validasi data di wilayah Anda.

👥 Tim Pengembang

Proyek ini dikembangkan oleh mahasiswa berdedikasi dari Universitas Surakarta untuk tujuan kompetisi dan edukasi:

    Fahrudin Ahmad Habibie

    Adha Noer Hidayahtulloh

    David Dwi Saputra

📄 Lisensi

Dikembangkan untuk keperluan Edukasi & Kompetisi. Mohon cantumkan kredit kepada pengembang asli jika ingin menggunakan kode sumber ini.

Built with ❤️ by Team ClimaJust.ai
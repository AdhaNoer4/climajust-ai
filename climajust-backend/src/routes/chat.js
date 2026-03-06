const express = require("express");
const router = express.Router();

// Fungsi untuk delay (sleep)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fungsi untuk menghapus markdown/asterisk
function cleanMarkdown(text) {
  if (!text) return text;
  
  // Hapus ** (bold)
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Hapus * (italic)
  text = text.replace(/\*(.*?)\*/g, '$1');
  
  // Hapus __ (underline)
  text = text.replace(/__(.*?)__/g, '$1');
  
  // Hapus ` (code)
  text = text.replace(/`(.*?)`/g, '$1');
  
  // Hapus # (heading)
  text = text.replace(/#{1,6}\s?(.*?)(\n|$)/g, '$1$2');
  
  // Hapus - di awal untuk list (opsional)
  text = text.replace(/^\s*[-*+]\s+/gm, '');
  
  return text.trim();
}

// Fungsi untuk panggil Gemini dengan retry logic
async function callGeminiWithRetry(prompt, apiKey, maxRetries = 3) {
  // Daftar model yang bisa dicoba (urutan dari yang paling baru)
  const models = [
    "gemini-3-flash-preview",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-pro"
  ];
  
  let lastError = null;
  
  // Coba setiap model
  for (const model of models) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Mencoba model ${model} (percobaan ${attempt}/${maxRetries})...`);
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ 
                parts: [{ text: prompt }] 
              }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024,
              }
            })
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          
          // Kalau error 503 (high demand), tunggu sebentar lalu coba lagi
          if (response.status === 503) {
            console.log(`⚠️ Model ${model} kelebihan permintaan, tunggu ${attempt * 2} detik...`);
            await delay(attempt * 2000); // Tunggu 2,4,6 detik
            continue; // Coba lagi dengan model yang sama
          }
          
          // Kalau error 404 (model tidak ditemukan), lanjut ke model berikutnya
          if (response.status === 404) {
            console.log(`❌ Model ${model} tidak ditemukan, coba model lain...`);
            break; // Keluar dari loop retry, lanjut ke model berikutnya
          }
          
          throw new Error(`HTTP ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log(`✅ Berhasil dengan model ${model}`);
        return data;
        
      } catch (err) {
        console.log(`❌ Error dengan model ${model} (percobaan ${attempt}):`, err.message);
        lastError = err;
        
        // Kalau error 404, langsung coba model berikutnya
        if (err.message?.includes("404")) {
          break;
        }
        
        // Tunggu sebelum retry
        if (attempt < maxRetries) {
          await delay(attempt * 1000);
        }
      }
    }
  }
  
  throw lastError || new Error("Semua model gagal");
}

router.post("/", async (req, res) => {
  try {
    const { message, history = [], cityName, weatherData } = req.body;

    // Validasi input
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Buat prompt yang lebih terstruktur dengan instruksi untuk TIDAK pakai markdown
    let promptContent = `Kamu adalah Climate AI Assistant untuk aplikasi pemantauan iklim Indonesia.

INFORMASI WILAYAH:
- Wilayah yang sedang dilihat user: ${cityName || "tidak diketahui"}

DATA CUACA SAAT INI:
${weatherData ? JSON.stringify(weatherData, null, 2) : "TIDAK ADA DATA CUACA - User belum memilih wilayah"}

`;

    // Tambahkan riwayat percakapan jika ada
    if (history.length > 0) {
      promptContent += `RIWAYAT PERCAKAPAN SEBELUMNYA:
${history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n')}

`;
    }

    promptContent += `PERTANYAAN USER: ${message}

INSTRUKSI PENTING:
1. Jika tidak ada data cuaca (weatherData null/tidak ada), beri tahu user untuk memilih wilayah terlebih dahulu
2. Jika ada data cuaca, gunakan data tersebut untuk menjawab pertanyaan
3. Fokus menjawab pertanyaan tentang: cuaca, iklim, potensi banjir, dan aktivitas luar ruang
4. Jawab dengan singkat, jelas, dan ramah dalam Bahasa Indonesia
5. Jika ditanya di luar topik, tolak dengan sopan
6. **JANGAN GUNAKAN MARKDOWN ATAU BINTANG** - Jangan gunakan ** untuk menebalkan teks
7. Cukup tulis teks biasa saja tanpa formatting apapun
8. Jangan gunakan * atau ** atau __ atau # atau - untuk list

JAWABAN DALAM BAHASA INDONESIA (TANPA MARKDOWN/TANPA BINTANG):`;

    console.log(`[${new Date().toLocaleTimeString()}] 📤 Sending request to Gemini...`);

    // Panggil Gemini dengan retry logic
    const data = await callGeminiWithRetry(promptContent, process.env.GEMINI_API_KEY);
    
    // Extract response text dari Gemini
    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                "Maaf, tidak bisa mendapatkan respons dari AI.";
    
    // Bersihkan markdown kalau masih ada bintang
    reply = cleanMarkdown(reply);

    // Update history
    const updatedHistory = [
      ...history, 
      { role: "user", content: message }, 
      { role: "assistant", content: reply }
    ];

    res.json({
      reply,
      history: updatedHistory
    });

  } catch (err) {
    console.error("❌ Gemini API error:", err);
    
    let errorMessage = "Gagal menghubungi AI. Silakan coba lagi.";
    let replyMessage = "Maaf, layanan AI sedang sibuk. Silakan coba lagi nanti ya! ⏳";
    
    if (err.message?.includes("API key")) {
      errorMessage = "API Key tidak valid. Periksa konfigurasi.";
      replyMessage = "Maaf, terjadi masalah dengan koneksi AI. Tim kami sedang memperbaikinya. 🙏";
    } else if (err.message?.includes("quota")) {
      errorMessage = "Kuota API habis. Coba lagi nanti.";
      replyMessage = "Maaf, kuota percakapan hari ini habis. Silakan coba lagi besok! 📅";
    } else if (err.message?.includes("503")) {
      errorMessage = "Layanan AI sedang sibuk. Coba lagi nanti.";
      replyMessage = "Maaf, AI sedang sibuk melayani banyak permintaan. Coba lagi dalam beberapa saat ya! ⏳";
    } else if (err.message?.includes("404")) {
      errorMessage = "Model AI tidak ditemukan. Pastikan model name benar.";
      replyMessage = "Maaf, terjadi kesalahan teknis. Tim kami sedang memperbaikinya. 🔧";
    }
    
    res.status(500).json({ 
      error: errorMessage,
      reply: replyMessage 
    });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, history = [], cityName, weatherData } = req.body;

    // Validasi input
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Buat prompt yang lebih terstruktur
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

JAWABAN DALAM BAHASA INDONESIA:`;

    console.log("Sending request to Gemini 3 Flash...");

    // Gunakan fetch langsung ke API Gemini dengan model gemini-3-flash-preview
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: promptContent,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error response:", errorData);
      throw new Error(`Gemini API returned ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    
    // Extract response text from Gemini
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                  "Maaf, tidak bisa mendapatkan respons dari AI.";

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
    console.error("Gemini API error:", err);
    
    let errorMessage = "Gagal menghubungi AI. Silakan coba lagi.";
    
    if (err.message?.includes("API key")) {
      errorMessage = "API Key tidak valid. Periksa konfigurasi.";
    } else if (err.message?.includes("quota")) {
      errorMessage = "Kuota API habis. Coba lagi nanti.";
    } else if (err.message?.includes("404")) {
      errorMessage = "Model AI tidak ditemukan. Pastikan model name benar.";
    }
    
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
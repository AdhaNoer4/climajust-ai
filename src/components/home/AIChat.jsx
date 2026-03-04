import { useState, useEffect } from "react";

export default function AIChat({ city }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!city) {
      setMessages([
        {
          role: "assistant",
          content: "Pilih wilayah terlebih dahulu untuk memulai konsultasi.",
        },
      ]);
      return;
    }

    setMessages([
      {
        role: "assistant",
        content: `Halo! Saya AI Climate Assistant untuk ${city.name}. Ada yang ingin Anda tanyakan terkait kondisi hari ini?`,
      },
    ]);
  }, [city]); // 🔥 trigger setiap city berubah

  function generateResponse(question) {
    if (!city) return "Silakan pilih wilayah terlebih dahulu.";

    if (question.toLowerCase().includes("banjir")) {
      return `Berdasarkan kondisi ${city.weather} di ${city.name}, risiko banjir meningkat terutama di wilayah padat dan bantaran sungai. Disarankan warga meningkatkan kewaspadaan.`;
    }

    if (question.toLowerCase().includes("kerja")) {
      return `Dengan suhu ${city.temp} dan kondisi ${city.weather}, aktivitas luar ruang di ${city.name} sebaiknya dibatasi setelah siang hari.`;
    }

    return `Saat ini ${city.name} berada dalam status risiko ${city.risk}. Saya sarankan memantau pembaruan cuaca secara berkala.`;
  }

  function handleSend() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const aiMessage = {
      role: "assistant",
      content: generateResponse(input),
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-[400px]">
      <div className="flex flex-2 gap-3 max-h-max mb-5">
        <div className="rounded-full w-10 h-10 border border-slate-200 flex items-center justify-center shadow-2xl">
          <img src="/climajust-ai-logo.png" alt="Logo Climate AI Assistant" className="w-8 h-8 inline " />
        </div>
        <h3 className="font-semibold text-slate-800 mb-3">Climate AI Assistant</h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg max-w-[85%] ${msg.role === "assistant" ? "bg-white text-slate-800  drop-shadow-sm" : "bg-slate-100 ml-auto text-slate-700"}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanyakan sesuatu..." className="flex-1 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
        <button onClick={handleSend} className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700">
          Kirim
        </button>
      </div>
    </div>
  );
}

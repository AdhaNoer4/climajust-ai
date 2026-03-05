import { useState, useEffect, useRef } from "react";

export default function AIChat({ weatherData, cityName }) { // ← ganti props
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!weatherData || !cityName) {
      setMessages([{
        role: "assistant",
        content: "Pilih wilayah terlebih dahulu untuk memulai konsultasi.",
      }]);
      setHistory([]);
      return;
    }
    setMessages([{
      role: "assistant",
      content: `Halo! Saya AI Climate Assistant untuk ${cityName}. Ada yang ingin Anda tanyakan terkait kondisi hari ini?`,
    }]);
    setHistory([]);
  }, [weatherData, cityName]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading || !weatherData) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history,
          cityName,
          weatherData, // ← kirim semua data cuaca ke backend
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setHistory(data.history);

    } catch (err) {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Maaf, gagal menghubungi AI. Coba lagi.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-[400px]">
      <div className="flex flex-2 gap-3 max-h-max mb-5">
        <div className="rounded-full w-10 h-10 border border-slate-200 flex items-center justify-center shadow-2xl">
          <img src="/climajust-ai-logo.png" alt="Logo Climate AI Assistant" className="w-8 h-8 inline" />
        </div>
        <h3 className="font-semibold text-slate-800 mb-3">Climate AI Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg max-w-[85%] ${msg.role === "assistant" ? "bg-white text-slate-800 drop-shadow-sm" : "bg-slate-100 ml-auto text-slate-700"}`}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded-lg max-w-[85%] bg-white text-slate-400 drop-shadow-sm animate-pulse">
            Sedang mengetik...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={weatherData ? "Tanyakan sesuatu..." : "Pilih wilayah dulu..."}
          disabled={!weatherData || loading}
          className="flex-1 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!weatherData || loading}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 disabled:opacity-50"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
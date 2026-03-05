import { useState, useEffect, useRef } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function AIChat({ weatherData, cityName }) {
  // ← ganti props
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef(null);
  const emojiRef = useRef(null);

  useEffect(() => {
    if (!weatherData || !cityName) {
      setMessages([
        {
          role: "assistant",
          content: "Pilih wilayah terlebih dahulu untuk memulai konsultasi.",
        },
      ]);
      setHistory([]);
      return;
    }
    setMessages([
      {
        role: "assistant",
        content: `Halo! Saya AI Climate Assistant untuk ${cityName}. Ada yang ingin Anda tanyakan terkait kondisi hari ini?`,
      },
    ]);
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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, gagal menghubungi AI. Coba lagi.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  function handleEmojiClick(emojiData) {
    setInput((prev) => prev + emojiData.emoji);
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-[400px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-full w-10 h-10 border border-slate-200 flex items-center justify-center shadow">
          <img src="/climajust-ai-logo.png" alt="Logo Climate AI Assistant" className="w-7 h-7" />
        </div>
        <h3 className="font-semibold text-slate-800">Climate AI Assistant</h3>
      </div>

      <div className=" flex-1 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, index) => (
          <div key={index} className={` p-2 rounded-lg max-w-[85%] ${msg.role === "assistant" ? "bg-white text-slate-800 shadow-sm inset-shadow-2xs" : "bg-blue-400 ml-auto text-slate-100"}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="p-2 rounded-lg max-w-[85%] bg-white text-slate-400 drop-shadow-sm animate-pulse">Sedang mengetik...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="relative flex justify-center mt-3">
        {showEmoji && (
          <div ref={emojiRef} className="absolute bottom-14 left-0  z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <div className="flex items-center border border-slate-300 rounded-full shadow-xl px-2 py-1 gap-2 w-xl">
          {/* Emoji Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowEmoji(!showEmoji);
            }}
            className="text-sky-600 p-2 rounded-full shadow-xl inset-shadow-xl hover:bg-slate-100"
          >
            <Smile size={18} />
          </button>

          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={weatherData ? "Tanyakan sesuatu..." : "Pilih wilayah dulu..."}
            disabled={!weatherData || loading}
            className="flex-1 bg-transparent outline-none text-sm"
          />

          {/* Send Button */}
          <button onClick={handleSend} disabled={!weatherData || loading} className="bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700 disabled:opacity-50">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

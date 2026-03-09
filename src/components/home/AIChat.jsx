import { useState, useEffect, useRef } from "react";
import { Send, Smile, Mic, Volume2, VolumeX } from "lucide-react";
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
  const textareaRef = useRef(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const firstLoadRef = useRef(true);

  const suggestions = [`Apakah hari ini akan hujan di ${cityName}?`, `Berapa suhu maksimum hari ini di ${cityName}?`, `Apakah ada risiko cuaca ekstrem hari ini?`];

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

  //   useEffect(() => {
  //   if (firstLoadRef.current) {
  //     firstLoadRef.current = false;
  //     return;
  //   }

  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading || !weatherData) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleEmojiClick(emojiData) {
    setInput((prev) => prev + emojiData.emoji);
  }

  function autoResize() {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  function handleSuggestionClick(text) {
    setInput(text);

    setTimeout(() => {
      handleSend();
    }, 100);
  }

  async function handleSendVoice(text) {
    if (!text || loading || !weatherData) return;

    const userMessage = { role: "user", content: text };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
          cityName,
          weatherData,
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
          content: "Maaf, gagal menghubungi AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser tidak mendukung voice input");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "id-ID";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();

      setTimeout(() => {
        handleSendVoice(transcript);
      }, 200);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  function stopVoiceInput() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  }

  function speakText(text) {
    if (!voiceEnabled) return;

    if (!window.speechSynthesis) return;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "id-ID";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  function speakMessage(text, index) {
    if (!window.speechSynthesis) return;

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "id-ID";

    speech.onend = () => {
      setSpeakingIndex(null);
    };

    setSpeakingIndex(index);

    window.speechSynthesis.speak(speech);
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
          <div key={index} className={`p-2 rounded-lg max-w-[85%] flex items-start gap-2 ${msg.role === "assistant" ? "bg-white text-slate-800 shadow-sm" : "bg-blue-400 ml-auto text-slate-100"}`}>
            <span className="flex-1">{msg.content}</span>

            {msg.role === "assistant" && (
              <button onClick={() => speakMessage(msg.content, index)} className="text-sky-600 hover:text-sky-800 transition">
                {speakingIndex === index ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            )}
          </div>
        ))}
        {loading && <div className="p-2 rounded-lg max-w-[85%] bg-white text-slate-400 drop-shadow-sm animate-pulse">Sedang mengetik...</div>}
        <div ref={bottomRef} />

        {messages.length === 1 && weatherData && (
          <div className="mb-3">
            <p className="text-xs text-slate-500 mb-2">Tanya AI:</p>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((text, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(text)}
                  className="
            text-xs
            bg-sky-50
            border
            border-sky-200
            text-sky-700
            px-3
            py-1.5
            rounded-full
            hover:bg-sky-100
            transition
          "
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}
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
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoResize();
            }}
            onKeyDown={handleKeyDown}
            placeholder={weatherData ? "Tanyakan sesuatu..." : "Pilih wilayah dulu..."}
            disabled={!weatherData || loading}
            className="
                  flex-1
                  resize-none
                  bg-transparent
                  outline-none
                  text-sm
                  max-h-32
                  leading-relaxed
                "
          />
          {/* Voice Input Button */}
          <button onClick={listening ? stopVoiceInput : startVoiceInput} className={`p-2 rounded-full transition ${listening ? "bg-red-500 text-white animate-pulse" : "text-sky-600 hover:bg-slate-100"}`}>
            <Mic size={18} />
          </button>

          {/* Send Button */}
          <button onClick={handleSend} disabled={!weatherData || loading} className="bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700 disabled:opacity-50">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

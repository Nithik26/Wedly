// src/pages/AIAssistant.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "💍 Hi there! I'm Wedly — your personal AI wedding planner. How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { sender: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setPrompt("");

    try {
      // 🔹 Send the prompt to your backend Gemini API
      const res = await axios.post("http://localhost:5000/api/ai", {
        prompt,
      });

      const aiMessage = {
        sender: "ai",
        text: res.data.text || "✨ No response from AI",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error talking to AI:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Sorry, I couldn’t connect to Wedly AI. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-gray-800 pt-20 px-4">
      <h2 className="text-3xl font-bold text-[#678894] mb-2">Wedly AI Assistant</h2>
      <p className="text-gray-600 mb-6">Ask me anything about planning your perfect wedding 💐</p>

      {/* Chat Window */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 h-[70vh] overflow-y-auto border border-gray-200">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[75%] text-sm ${
                msg.sender === "user"
                  ? "bg-[#678894] text-white"
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-sm text-gray-500 italic">💭 Wedly is thinking...</div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-3xl mt-4 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your wedding question..."
          className="flex-1 px-4 py-3 outline-none text-gray-700"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#678894] text-white font-semibold px-6 py-3 hover:bg-[#55717d] transition-all"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

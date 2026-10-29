import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const API_URL = "https://career-nova-ai-backend.onrender.com";
const initialMessage = {
  role: "assistant",
  content:
    "Hi! 👋 I'm your Career Nova AI Companion. I can help you explore careers, learn programming, improve your resume, prepare for interviews, and create learning roadmaps. What would you like help with?",
};

export default function Chatbot() {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(event) {
    event?.preventDefault();

    const text = input.trim();

    if (!text || loading) return;

    const previousMessages = messages.filter(
      (message) => message !== initialMessage
    );

    const updatedMessages = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: previousMessages.slice(-10),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || "The AI assistant is temporarily unavailable."
        );
      }

      if (!data.reply) {
        throw new Error("The AI returned an empty response.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Chatbot request failed:", err);
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Please check that FastAPI is running."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    if (loading) return;

    setMessages([initialMessage]);
    setInput("");
    setError("");
  }

  return (
    <section className="cn-chatbot">
      <header className="cn-chat-header">
        <div className="cn-bot-avatar">✦</div>

        <div className="cn-chat-heading">
          <h2>Career Nova AI</h2>
          <p>
            <span className="cn-online-dot" />
            AI Career Companion
          </p>
        </div>

        <button
          type="button"
          className="cn-new-chat"
          onClick={startNewChat}
          disabled={loading}
        >
          New chat
        </button>
      </header>

      <div
        className="cn-chat-messages"
        role="log"
        aria-label="Chat conversation"
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`cn-message-row ${
              message.role === "user" ? "cn-user-row" : "cn-assistant-row"
            }`}
          >
            {message.role === "assistant" && (
              <div className="cn-message-avatar">✦</div>
            )}

            <div
              className={`cn-message ${
                message.role === "user"
                  ? "cn-user-message"
                  : "cn-assistant-message"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="cn-message-row cn-assistant-row">
            <div className="cn-message-avatar">✦</div>
            <div className="cn-message cn-assistant-message cn-thinking">
              <span />
              <span />
              <span />
              <small>Thinking...</small>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="cn-chat-error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => {
              setError("");
              setInput((current) => current);
            }}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      <form className="cn-chat-form" onSubmit={sendMessage}>
        <label className="cn-sr-only" htmlFor="cn-chat-input">
          Enter your message
        </label>

        <textarea
          id="cn-chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask about careers, skills, interviews..."
          maxLength={4000}
          rows={1}
          disabled={loading}
        />

        <button
          type="submit"
          className="cn-send-button"
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send ↑"}
        </button>
      </form>

      <p className="cn-chat-disclaimer">
        AI-generated advice may not always be accurate. Verify important
        career decisions with reliable sources.
      </p>
    </section>
  );
}


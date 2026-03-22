import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./ChatPanel.css";

interface Message {
  role: string;
  content: string;
}

export default function ChatPanel() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", content: query };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/query/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      });

      const data = await res.json();

      const botMessage = {
        role: "bot",
        content: data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">

      <div className="chat-header">
        <h4>💬 RAG Assistant</h4>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.role === "bot" ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message bot typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>

    </div>
  );
}
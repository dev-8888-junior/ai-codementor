import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import MessageBubble from "./MessageBubble";
import Loader from "./Loader";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;
    setMessage("");

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: currentMessage },
    ]);

    setLoading(true);

    try {
      const res = await API.post("/chat", {
        message: currentMessage,
      });

      console.log("BACKEND RESPONSE:", res.data);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data.reply },
      ]);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
          />
        ))}

        {loading && <Loader />}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask coding question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
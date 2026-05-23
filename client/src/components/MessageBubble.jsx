import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageBubble = ({ sender, text }) => {
  return (
    <div
      className={`message ${sender}`}
      style={{
        padding: "12px",
        margin: "10px",
        borderRadius: "12px",
        maxWidth: "75%",
        lineHeight: "1.5",
        fontSize: "14px",

        // 🔥 FIXED COLORS
        background:
          sender === "user" ? "#DCF8C6" : "#1f1f1f",

        color: sender === "user" ? "#000" : "#f1f1f1",

        alignSelf:
          sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      <ReactMarkdown
        components={{
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                style={{
                  background: "#333",
                  color: "#fff",
                  padding: "2px 4px",
                  borderRadius: "4px",
                }}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MessageBubble;
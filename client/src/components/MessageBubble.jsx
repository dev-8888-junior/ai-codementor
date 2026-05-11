import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageBubble = ({
  sender,
  text,
}) => {
  return (
    <div
      className={
        sender === "user"
          ? "message user"
          : "message ai"
      }
    >
      <ReactMarkdown
        components={{
          code({
            inline,
            className,
            children,
            ...props
          }) {
            const match =
              /language-(\w+)/.exec(
                className || ""
              );

            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(
                  /\n$/,
                  ""
                )}
              </SyntaxHighlighter>
            ) : (
              <code
                className={className}
                {...props}
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
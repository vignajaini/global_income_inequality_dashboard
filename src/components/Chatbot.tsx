import { useState, useRef, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const popupRef = useRef<HTMLDivElement>(null);

  // Close chatbot when user clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    // Fake bot reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "Thanks! I will help you with that." }
      ]);
    }, 400);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all z-50"
      >
        <MessageCircle size={26} />
      </button>

      {/* Popup Chat Window */}
      {open && (
        <div
          ref={popupRef}
          className="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-4 border border-gray-200 dark:border-gray-700 z-50 animate-fade-in"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h2 className="font-bold">Chatbot Assistant</h2>
            <button onClick={() => setOpen(false)}>
              <X size={20} className="text-gray-600 hover:text-red-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto space-y-2 pr-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.from === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg p-2 text-sm dark:bg-gray-800 dark:border-gray-600"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-primary text-white px-4 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

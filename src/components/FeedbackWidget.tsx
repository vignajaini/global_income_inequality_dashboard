import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    alert("Thank you for your feedback! ❤️");
    setFeedback("");
    setOpen(false);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl transition-all z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Pop-up Feedback Box */}
      {open && (
        <div className="fixed bottom-24 left-6 w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-2xl p-4 z-50">
          <h2 className="text-lg font-semibold mb-2">Feedback</h2>

          <textarea
            className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600 focus:outline-none"
            rows={4}
            placeholder="Your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Send size={16} /> Submit
          </button>
        </div>
      )}
    </>
  );
}

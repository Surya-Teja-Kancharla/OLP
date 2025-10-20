import { useState } from "react";

export default function ForumComposer({ onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
    >
      <textarea
        placeholder="Ask a question or share something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="3"
        className="w-full resize-none border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post
        </button>
      </div>
    </form>
  );
}

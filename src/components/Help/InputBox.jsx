import React, { useState } from "react";

const InputBox = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 flex gap-2">
      <input
        className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        Send
      </button>
    </form>
  );
};

export default InputBox;

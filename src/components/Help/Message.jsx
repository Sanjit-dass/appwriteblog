import React from "react";

const Message = ({ from, text }) => {
  const isAI = from === "ai";
  return (
    <div className={`p-3 rounded-lg max-w-xs ${isAI ? "bg-blue-700 text-white self-start" : "bg-green-600 text-white self-end"}`}>
      {text}
    </div>
  );
};

export default Message;

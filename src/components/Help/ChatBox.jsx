import React, { useState } from 'react';
import axios from 'axios';
import conf from '../../conf/conf';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi there! 👋 I’m VaultBot. How can I assist you with PostVault today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are VaultBot, a helpful assistant for a blogging app called PostVault. Respond clearly and concisely.' },
            ...messages.map((m) => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),
            { role: 'user', content: input },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${conf.openAIApiKey}`,
          },
        }
      );

      const botReply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry 😔, I’m having trouble responding right now. Please try again later.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 border border-gray-300 rounded-xl shadow-lg bg-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
          alt="VaultBot"
          className="w-10 h-10"
        />
        <h2 className="text-xl font-bold">💬 VaultBot Help Assistant</h2>
      </div>
      <div className="h-96 overflow-y-auto px-3 py-4 bg-gray-50 rounded-md mb-4 scroll-smooth">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-sm text-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-sm text-gray-500 animate-pulse mt-2">VaultBot is typing...</div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask me anything about PostVault..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const sendMessageToLlama = async (userMessage) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://127.0.0.1:8000', {
        query: userMessage,
        context: 'product_inquiry',
      });
      return response.data.response;
    } catch (error) {
      console.error('Chatbot error:', error);
      return 'Sorry, I couldn\'t process your message right now.';
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage = { sender: 'user', text: message };
      setChatHistory((prev) => [...prev, userMessage]);
      setMessage('');

      const botReply = await sendMessageToLlama(message);
      const botMessage = { sender: 'bot', text: botReply };
      setChatHistory((prev) => [...prev, botMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-black text-white">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-white text-black'
                  : 'bg-white text-black'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-400 animate-pulse">...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 flex items-center space-x-2 bg-black">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
          disabled={isLoading}
        >
          <Send size={20} color="#ffffff" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
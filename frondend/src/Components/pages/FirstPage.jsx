import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader } from 'lucide-react';
import LaptopSection from './LaptopSection';
import '../../App.css';

const FirstPage = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [context, setContext] = useState('product_inquiry');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleHpClick = () => {
    navigate('/HpPage');
  };

  const handleDellClick = () => {
    navigate('/DellPage');
  };

  const sendMessageToBackend = async (userMessage, context) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage,
          context: context,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Chatbot error:', error);
      return 'Sorry, I couldn\'t process your message right now. Please try again later.';
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (message.trim() && !isLoading) {
      const userMessage = { sender: 'user', text: message.trim() };
      setChatHistory((prev) => [...prev, userMessage]);
      setMessage('');

      const botReply = await sendMessageToBackend(message, context);
      const botMessage = { sender: 'bot', text: botReply };
      setChatHistory((prev) => [...prev, botMessage]);
      
      inputRef.current?.focus();
    }
  };

  return (
    <div className="split-screen">
      {/* Left Screen: Chatbot Section */}
      <div className="left-screen">
        {showWelcome && (
          <div className="welcome-message">
            <h2>Heyy! 👋</h2>
            <p>I'm your AI assistant here to help you with shopping.</p>
          </div>
        )}
        
        {/* Chat Messages */}
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto p-4 space-y-4 mb-4">
            {chatHistory.map((msg, index) => (
              <div>
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600/80 backdrop-blur-sm text-white'
                      : 'bg-gray-700/80 backdrop-blur-sm text-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <Loader className="animate-spin" size={16} />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Form */}
          <div className="chatbot-container">
            <form onSubmit={handleSendMessage}>
              <div className="flex items-center gap-2">
                <select
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="rounded-lg bg-gray-800/80 backdrop-blur-sm text-white border-gray-700 p-2 w-32"
                >
                  <option value="product_inquiry">Product Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing</option>
                </select>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 rounded-lg bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400"
                  disabled={isLoading}
                />
                
                <button
                  type="submit"
                  className="p-2 rounded-full bg-gray-700/80 hover:bg-gray-600/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !message.trim()}
                >
                  {isLoading ? (
                    <Loader size={20} className="animate-spin text-white" />
                  ) : (
                    <Send size={20} className="text-white" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Screen: Laptops Section */}
      <div className="right-screen">
        <LaptopSection
          handleHpClick={handleHpClick}
          handleDellClick={handleDellClick}
        />
      </div>
    </div>
  );
};

export default FirstPage;
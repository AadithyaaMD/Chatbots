import React, { Suspense, useEffect, useState } from 'react';
import ChatbotPopup from './ChatbotPopup';

const ChatbotSection = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  // Hide the welcome message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="left-screen chatbot-background">
      {showWelcome && (
        <div className="welcome-message">
          <h2>Heyy! 👋</h2>
          <p>I'm your AI assistant here to help you with shopping.</p>
        </div>
      )}
      <Suspense fallback={<div>Loading Chatbot...</div>}>
        <ChatbotPopup />
      </Suspense>
    </div>
  );
};

export default ChatbotSection;
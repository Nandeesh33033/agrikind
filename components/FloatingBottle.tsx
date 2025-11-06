import React, { useState } from 'react';
import Chatbot from './Chatbot';
import ChatbotIcon from './icons/ChatbotIcon';

const FloatingBottle: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-secondary-green p-3 rounded-full shadow-lg hover:bg-primary-green transition-all duration-300 transform hover:scale-110 animate-bounce"
        aria-label="Open AgriBot Assistant"
      >
        <ChatbotIcon />
        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>
      </button>
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default FloatingBottle;

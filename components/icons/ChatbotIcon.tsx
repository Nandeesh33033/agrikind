import React from 'react';

const ChatbotIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8 text-white" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M8 21h8a1.5 1.5 0 0 0 1.5 -1.5v-7.5h-11v7.5a1.5 1.5 0 0 0 1.5 1.5z" />
    <path d="M8 4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2z" />
    <path d="M10 9h4" />
    <path d="M10 14v.01" />
    <path d="M14 14v.01" />
    <path d="M10 17v.01" />
    <path d="M14 17v.01" />
  </svg>
);

export default ChatbotIcon;

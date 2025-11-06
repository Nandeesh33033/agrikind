import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import SpeakerIcon from './icons/SpeakerIcon';
import StopIcon from './icons/StopIcon';
import SendIcon from './icons/SendIcon';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm AgriBot. How can I help you with your farming questions today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);

  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize the Gemini chat model
  useEffect(() => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            systemInstruction: 'You are AgriBot, a friendly and knowledgeable assistant for farmers. Your goal is to provide helpful, concise, and encouraging advice on sustainable agriculture. Keep your answers brief and easy to understand.'
        });
    } catch(e) {
        console.error("Failed to initialize Gemini:", e);
        setMessages(prev => [...prev, {role: 'model', text: "Sorry, I'm having trouble connecting right now."}])
    }
  }, []);

  // Function to speak text
  const speak = (text: string) => {
    if (!isTtsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  
  // Auto-speak the initial message
  useEffect(() => {
    speak(messages[0].text);
  }, []);


  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        throw new Error("Chat not initialized");
      }
      const response = await chatRef.current.sendMessage({ message: userInput });
      const botResponseText = response.text;
      const botMessage: Message = { role: 'model', text: botResponseText };
      
      setMessages(prev => [...prev, botMessage]);
      speak(botResponseText);

    } catch (error) {
      console.error('Gemini API error:', error);
      const errorMessage: Message = { role: 'model', text: 'Oops! Something went wrong. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTtsToggle = () => {
      if (isTtsEnabled) {
          window.speechSynthesis.cancel();
      }
      setIsTtsEnabled(prev => !prev);
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out">
      {/* Header */}
      <header className="bg-primary-green text-white p-4 flex justify-between items-center rounded-t-lg">
        <h3 className="font-bold text-lg">AgriBot Assistant</h3>
        <div className="flex items-center gap-4">
            <button onClick={handleTtsToggle} aria-label={isTtsEnabled ? "Mute responses" : "Unmute responses"}>
                {isTtsEnabled ? <SpeakerIcon /> : <StopIcon />}
            </button>
            <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-cream">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`py-2 px-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-secondary-green text-white rounded-br-none' : 'bg-gray-200 text-dark-text rounded-bl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start mb-3">
                <div className="py-2 px-4 rounded-2xl bg-gray-200 text-dark-text rounded-bl-none">
                    <span className="animate-pulse">...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-1 focus:ring-primary-green focus:outline-none"
            disabled={isLoading}
          />
          <button onClick={handleSendMessage} className="bg-primary-green text-white p-2 rounded-r-md hover:bg-secondary-green transition-colors disabled:bg-gray-400" disabled={isLoading}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

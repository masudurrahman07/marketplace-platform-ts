'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! 👋 I'm your AI shopping assistant. How can I help you find the perfect product today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/ai/chat',
        { message: messageText },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000 
        }
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.reply || "I'm sorry, I received an empty response. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Chatbot Error:', error);
      
      let errorText = "I'm having trouble connecting to my brain. ";
      
      if (error.code === 'ECONNABORTED') {
        errorText += "The request timed out.";
      } else if (!error.response) {
        errorText += "Make sure the backend server is running on port 5000.";
      } else {
        errorText += `(Error ${error.response.status}: ${error.response.data?.message || 'Server Error'})`;
      }

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: errorText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e as any);
    }
  };

  return (
    <>
    
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 flex items-center justify-center">
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

     
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-32px)] h-137.5 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col z-50 overflow-hidden">
         
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Assistant</h3>
              <p className="text-xs text-blue-100">Ready to help</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-500 p-1 rounded">
              <FiX size={20} />
            </button>
          </div>

        
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-600">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

       
          <form onSubmit={sendMessage} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-sm"/>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full disabled:bg-gray-300 transition-colors">
              <FiSend size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
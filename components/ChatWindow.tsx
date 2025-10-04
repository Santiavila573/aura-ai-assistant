import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import { SendIcon } from './Icons';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  toggleTask: (taskId: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isLoading, toggleTask }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      scrollToBottom();
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onToggleTask={toggleTask} />
        ))}
        {isLoading && <MessageBubble.Loading />}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-black/30 backdrop-blur-md border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregúntame lo que sea..."
            className="flex-1 w-full px-4 py-3 text-white bg-white/5 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-colors"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
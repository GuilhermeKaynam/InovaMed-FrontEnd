import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from '../../types/chat';
import { useAuth } from '../../contexts/AuthContext';
import { formatDateTime } from '../../utils/date';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

export default function ChatWindow({ messages, onSendMessage }: ChatWindowProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === user?.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="text-xs mb-1">
                {message.senderRole === 'admin' ? 'Clínica' : 'Você'}
              </div>
              <p className="break-words">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.senderId === user?.id ? 'text-teal-100' : 'text-gray-500'
              }`}>
                {formatDateTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
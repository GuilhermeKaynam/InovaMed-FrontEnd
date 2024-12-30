import React from 'react';
import { formatDateTime } from '../../utils/date';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  isCurrentUser: boolean;
}

export default function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  return (
    <div className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isCurrentUser ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-sm mb-1">
          {message.senderRole === 'admin' ? 'Clínica' : 'Você'}
        </p>
        <p className="break-words">{message.content}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-teal-100' : 'text-gray-500'}`}>
          {formatDateTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
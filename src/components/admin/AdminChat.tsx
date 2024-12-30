import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { Conversation } from '../../types/chat';
import ChatWindow from '../chat/ChatWindow';
import { formatDateTime } from '../../utils/date';

export default function AdminChat() {
  const {
    conversations,
    currentMessages,
    loading,
    error,
    loadMessages,
    sendMessage
  } = useChat();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  if (loading) {
    return <div className="text-center p-4">Carregando conversas...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  const handleConversationSelect = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    await loadMessages(conversation.id);
  };

  const handleSendMessage = async (content: string) => {
    if (selectedConversation) {
      await sendMessage(selectedConversation.id, content);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 p-4 border-b">
        <MessageSquare className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
      </div>

      <div className="grid md:grid-cols-3 h-[600px]">
        <div className="border-r">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-700">Conversas</h3>
          </div>
          <div className="divide-y overflow-y-auto h-[calc(600px-57px)]">
            {conversations.length === 0 ? (
              <p className="p-4 text-gray-600">Nenhuma conversa.</p>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {conversation.patientName}
                      </p>
                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                      )}
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  {conversation.lastMessageDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDateTime(conversation.lastMessageDate)}
                    </p>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedConversation ? (
            <ChatWindow
              messages={currentMessages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare className="w-12 h-12 mb-4" />
              <p>Selecione uma conversa para começar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
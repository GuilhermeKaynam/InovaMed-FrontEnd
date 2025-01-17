import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Bell } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { formatDateTime } from '../../utils/date';
import { useAuth } from '../../contexts/AuthContext';
import ChatMessage from '../chat/ChatMessage';
import ChatInput from '../chat/ChatInput';
import { useNotification } from '../../hooks/useNotification';

export default function MessageInbox() {
  const { user } = useAuth();
  const { conversations, currentMessages, loading, error, loadMessages, sendMessage } = useChat();
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const { showNotification } = useNotification();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  useEffect(() => {
    const lastMessage = currentMessages[currentMessages.length - 1];
    if (lastMessage && lastMessage.senderRole === 'patient') {
      showNotification(`Nova mensagem de ${selectedConversation?.patientName}`, lastMessage.content);
      setHasNewMessage(true);
    }
  }, [currentMessages]);

  const handleSelectConversation = async (conversation: any) => {
    setSelectedConversation(conversation);
    await loadMessages(conversation.id);
    setHasNewMessage(false);
  };

  if (loading) {
    return <div className="text-center p-4">Carregando mensagens...</div>;
  }

  if (error) {
    return <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-8rem)] flex flex-col max-w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-teal-600" />
          <h2 className="text-xl font-semibold text-gray-800">Chat com Pacientes</h2>
        </div>
        {hasNewMessage && (
          <div className="flex items-center gap-2 text-teal-600">
            <Bell className="w-5 h-5 animate-bounce" />
            <span className="text-sm">Nova mensagem</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Lista de conversas */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-700">Conversas</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-b ${
                  selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{conversation.patientName}</p>
                    {conversation.lastMessage && (
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
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
            ))}
          </div>
        </div>

        {/* Área de chat */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isCurrentUser={message.senderRole === 'admin'}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="border-t p-4 bg-white">
                <ChatInput
                  onSendMessage={async (content) => {
                    if (selectedConversation && user) {
                      await sendMessage(selectedConversation.id, content);
                      scrollToBottom();
                    }
                  }}
                  placeholder="Digite sua mensagem..."
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <MessageSquare className="w-12 h-12 mb-4" />
              <p>Selecione uma conversa para começar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
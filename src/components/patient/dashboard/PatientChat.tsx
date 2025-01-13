import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useChat } from '../../../hooks/useChat';
import { useAuth } from '../../../contexts/AuthContext';
import ChatWindow from '../../chat/ChatWindow';

export default function PatientChat() {
  const { user } = useAuth();
  const {
    conversations,
    currentMessages,
    loading,
    error,
    loadMessages,
    sendMessage,
    startConversation
  } = useChat();

  useEffect(() => {
    const initializeChat = async () => {
      if (user) {
        // Start or get existing conversation
        const conversation = await startConversation({
          patientId: user.id,
          patientName: user.name,
          patientEmail: user.email
        });
        
        if (conversation) {
          loadMessages(conversation.id);
        }
      }
    };

    initializeChat();
  }, [user]);

  if (loading) {
    return <div className="text-center p-4">Carregando chat...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  const currentConversation = conversations[0];

  const handleSendMessage = async (content: string) => {
    if (currentConversation) {
      await sendMessage(currentConversation.id, content);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 p-4 border-b">
        <MessageSquare className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
      </div>

      <div className="h-[600px]">
        <ChatWindow
          messages={currentMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
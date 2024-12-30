import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useChat } from '../../../hooks/useChat';
import { useAuth } from '../../../contexts/AuthContext';
import ChatMessage from '../../chat/ChatMessage';
import ChatInput from '../../chat/ChatInput';

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
        const conversation = await startConversation({
          patientId: user.id || Date.now().toString(),
          patientName: user.name || user.email,
          patientEmail: user.email
        });
        
        if (conversation) {
          await loadMessages(conversation.id);
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
    if (currentConversation && user) {
      await sendMessage(currentConversation.id, content);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 p-4 border-b">
        <MessageSquare className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">Chat com a Clínica</h2>
      </div>

      <div className="h-[600px] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {currentMessages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.senderRole === 'patient'}
            />
          ))}
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
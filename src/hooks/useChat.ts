import { useState, useEffect } from 'react';
import { ChatMessage, Conversation } from '../types/chat';
import { chatApi } from '../services/chatApi';
import { useAuth } from '../contexts/AuthContext';

export function useChat() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await chatApi.getConversations(user?.id || '', user?.role || '');
      setConversations(data);
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Erro ao carregar conversas');
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      setLoading(true);
      const messages = await chatApi.getMessages(conversationId);
      setCurrentMessages(messages);
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Erro ao carregar mensagens');
      setLoading(false);
    }
  };

  const sendMessage = async (conversationId: string, content: string) => {
    if (!user) return null;

    try {
      const message = await chatApi.sendMessage({
        conversationId,
        senderId: user.id || user.email,
        senderRole: user.role || 'patient',
        content
      });
      
      setCurrentMessages(prev => [...prev, message]);
      await loadConversations();
      return message;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Erro ao enviar mensagem');
      return null;
    }
  };

  const startConversation = async (patientData: Omit<Conversation, 'id' | 'lastMessage' | 'lastMessageDate' | 'unreadCount'>) => {
    try {
      const conversation = await chatApi.startConversation({
        ...patientData,
        patientId: patientData.patientId || user?.id || user?.email || Date.now().toString()
      });
      
      await loadConversations();
      await loadMessages(conversation.id);
      return conversation;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Erro ao iniciar conversa');
      return null;
    }
  };

  return {
    conversations,
    currentMessages,
    loading,
    error,
    loadMessages,
    sendMessage,
    startConversation,
    refreshConversations: loadConversations
  };
}